#!/bin/bash

echo "iniciando conversão para HLS"

# =====================================
# NORMALIZAR LEGENDA
# =====================================

find . -maxdepth 1 -type f -name "*.mkv" -print0 | \
xargs -0 -P 4 -I{} bash -c '

f="{}"
base="${f%.*}"
filename=$(basename "$base")

mkdir -p "$base"

rm -f "$base/subtitles.txt"

# =====================================
# ÁUDIOS
# =====================================

audio_count=$(ffprobe -v error \
    -select_streams a \
    -show_entries stream=index \
    -of csv=p=0 "$f" | wc -l)

audio_maps=""
var_stream_map="v:0"

for ((i=0; i<audio_count; i++)); do

    lang=$(ffprobe -v error \
        -select_streams a:$i \
        -show_entries stream_tags=language \
        -of default=noprint_wrappers=1:nokey=1 "$f")

    [ -z "$lang" ] && lang="und"

    audio_maps="$audio_maps -map 0:a:$i"

    var_stream_map="$var_stream_map a:$i,agroup:audio,language:$lang,name:$lang"

done

# =====================================
# HLS VÍDEO + ÁUDIO
# =====================================

ffmpeg -y \
    -fflags +genpts -avoid_negative_ts make_zero \
    -i "$f" \
    -map 0:v:0 \
    $audio_maps \
    -c:v libx264 \
    -preset veryfast \
    -crf 23 \
    -profile:v high \
    -level 4.1 \
    -pix_fmt yuv420p \
    -g 144 \
    -keyint_min 144 \
    -sc_threshold 0 \
    -c:a aac \
    -b:a 192k \
    -ar 48000 \
    -ac 2 \
    -af "aresample=async=1:first_pts=0" \
    -f hls \
    -hls_time 6 \
    -hls_list_size 0 \
    -hls_playlist_type vod \
    -hls_flags independent_segments+append_list \
    -hls_segment_type mpegts \
    -start_number 0 \
    -master_pl_name master.m3u8 \
    -var_stream_map "$var_stream_map" \
    -hls_segment_filename "$base/stream_%v_segment_%05d.ts" \
    "$base/stream_%v.m3u8"

if [ $? -ne 0 ]; then
    echo "ERRO: ffmpeg falhou para $f"
    exit 1
fi

# =====================================
# LEGENDA EXTERNA
# =====================================

while IFS= read -r -d "" sub; do

    sub_name=$(basename "$sub")

    sub_name=$(echo "$sub_name" | sed -E "s/\.(srt|ass)$//I")
    sub_name=$(echo "$sub_name" | sed -E "s/^${filename}\.//")

    subtype="full"

    if echo "$sub_name" | grep -Eiq "\.forced$"; then
        subtype="forced"
        clean_lang=$(echo "$sub_name" | sed -E "s/\.forced$//I")
    else
        clean_lang="$sub_name"
    fi

    [ -z "$clean_lang" ] && clean_lang="und"

    tmp_sub=$(mktemp --suffix=.srt)

    if iconv -f UTF-8 -t UTF-8 "$sub" >/dev/null 2>&1; then
        cp "$sub" "$tmp_sub"
    else

        if ! iconv \
            -f WINDOWS-1252 \
            -t UTF-8 \
            "$sub" \
            -o "$tmp_sub"; then

            echo "falha ao converter $sub"

            cp "$sub" "$tmp_sub"

        fi
    fi

    if [ ! -f "$tmp_sub" ]; then
        echo "falha ao processar legenda: $sub"
        continue
    fi

    ffmpeg -y \
        -itsoffset 0.1 \
        -i "$tmp_sub" \
        "$base/subtitle_${clean_lang}_${subtype}.vtt"

    rm -f "$tmp_sub"

    if [ ! -f "$base/subtitle_${clean_lang}_${subtype}.vtt" ]; then
        echo "falha ao converter legenda: $sub"
        continue
    fi

    printf "%s\n" \
        "#EXTM3U" \
        "#EXT-X-VERSION:3" \
        "#EXT-X-TARGETDURATION:999999" \
        "#EXT-X-MEDIA-SEQUENCE:0" \
        "#EXTINF:999999.000000," \
        "subtitle_${clean_lang}_${subtype}.vtt" \
        "#EXT-X-ENDLIST" \
        > "$base/subtitle_${clean_lang}_${subtype}.m3u8"

    forced_flag="NO"

    [ "$subtype" = "forced" ] && forced_flag="YES"

    echo "#EXT-X-MEDIA:TYPE=SUBTITLES,GROUP-ID=\"subs\",NAME=\"${clean_lang}_${subtype}\",LANGUAGE=\"$clean_lang\",AUTOSELECT=YES,DEFAULT=NO,FORCED=${forced_flag},URI=\"subtitle_${clean_lang}_${subtype}.m3u8\"" \
        >> "$base/subtitles.txt"

done < <(
    find . \
        -maxdepth 1 \
        -type f \
        -regextype posix-extended \
        -iregex ".*/${filename}\.[a-z]{2,3}(\.forced)?\.(srt|ass)" \
        -print0
)

# =====================================
# LEGENDA INTERNA MKV
# =====================================

internal_subs_count=$(ffprobe -v error \
    -select_streams s \
    -show_entries stream=index \
    -of csv=p=0 "$f" | wc -l)

for ((idx=0; idx<internal_subs_count; idx++)); do

    lang=$(ffprobe -v error \
        -select_streams s:$idx \
        -show_entries stream_tags=language \
        -of default=noprint_wrappers=1:nokey=1 "$f")

    [ -z "$lang" ] && lang="und"

    disposition_forced=$(ffprobe -v error \
        -select_streams s:$idx \
        -show_entries stream_disposition=forced \
        -of default=noprint_wrappers=1:nokey=1 "$f")

    title=$(ffprobe -v error \
        -select_streams s:$idx \
        -show_entries stream_tags=title \
        -of default=noprint_wrappers=1:nokey=1 "$f")

    subtype="full"

    if [ "$disposition_forced" = "1" ]; then
        subtype="forced"
    fi

    echo "$title" | grep -Eiq "(forced|forçado|forcada)" && subtype="forced"

    ffmpeg -y \
        -i "$f" \
        -map 0:s:$idx \
        "$base/subtitle_internal_${lang}_${subtype}_${idx}.vtt"

    printf "%s\n" \
        "#EXTM3U" \
        "#EXT-X-VERSION:3" \
        "#EXT-X-TARGETDURATION:999999" \
        "#EXT-X-MEDIA-SEQUENCE:0" \
        "#EXTINF:999999.000000," \
        "subtitle_internal_${lang}_${subtype}_${idx}.vtt" \
        "#EXT-X-ENDLIST" \
        > "$base/subtitle_internal_${lang}_${subtype}_${idx}.m3u8"

    forced_flag="NO"

    [ "$subtype" = "forced" ] && forced_flag="YES"

    echo "#EXT-X-MEDIA:TYPE=SUBTITLES,GROUP-ID=\"subs\",NAME=\"${lang}_${subtype}\",LANGUAGE=\"$lang\",AUTOSELECT=YES,DEFAULT=NO,FORCED=${forced_flag},URI=\"subtitle_internal_${lang}_${subtype}_${idx}.m3u8\"" \
        >> "$base/subtitles.txt"

done

# =====================================
# INJETAR SUBS NO MASTER
# =====================================

if [ -f "$base/master.m3u8" ] && [ -f "$base/subtitles.txt" ]; then

    temp="$base/master_tmp.m3u8"

    {
        echo "#EXTM3U"

        cat "$base/subtitles.txt"

        grep -v "^#EXTM3U" "$base/master.m3u8" | \
        sed "s/#EXT-X-STREAM-INF:\(.*\)$/#EXT-X-STREAM-INF:\1,SUBTITLES=\"subs\"/g"

    } > "$temp"

    mv "$temp" "$base/master.m3u8"
fi

'



===========================================================================================================================================================
---------------------------------------------Envio dos arquivos HLS de séries. Atualizar id da série antes de enviar---------------------------------------
===========================================================================================================================================================
total=$(find . -maxdepth 1 -type d ! -name "." \
  -exec test -f "{}/master.m3u8" \; -print | wc -l)

count=0

find . -maxdepth 1 -type d ! -name "." \
  -exec test -f "{}/master.m3u8" \; -print0 | \
while IFS= read -r -d '' dir; do

  count=$((count + 1))

  echo "[$count/$total] Enviando pasta HLS: $dir"

  upload-hls "$dir" <id> true

  echo "[$count/$total] Concluído: $dir"

done



=======================================================================================================================================================
-------------------------------------------------Conversão de .mkv pra .mp4---------------------------------------------------------------------------
=======================================================================================================================================================
find . -maxdepth 1 -type f -name "*.mkv" -print0 | \
xargs -0 -P 4 -I{} sh -c '
  f="{}"
  ffmpeg -i "$f" \
    -map 0:v -map 0:a? -map 0:s? \
    -c:v copy \
    -c:a aac -b:a 192k \
    -c:s mov_text \
    -movflags +faststart \
    -metadata:s:a:0 language=por \
    -metadata:s:a:1 language=eng \
    "${f%.*}.mp4"
'
------------------------------------------------------------Upload de arquivos .mp4 de séries------------------------------------------------------------
total=$(find . -maxdepth 1 -type f -name "*.mp4" | wc -l)

count=0

find . -maxdepth 1 -type f -name "*.mp4" -print0 | \
while IFS= read -r -d '' f; do
  count=$((count + 1))

  echo "[$count/$total] Enviando: $f"

  upload "$f" <id> true

  echo "[$count/$total] Concluído: $f"
done


=========================================================================================================================================================
============================================ conversão de arquivos de legenda sub/idx pra srt ==============================================================
=========================================================================================================================================================

#!/bin/bash

set -e

LANG_CODE="${1:-pt}"

find . -maxdepth 1 -type f -iname "*.idx" -print0 | \
while IFS= read -r -d '' idx; do
  base="${idx%.*}"
  sub="${base}.sub"

  if [[ ! -f "$sub" ]]; then
    echo "Ignorando: $idx não tem .sub correspondente"
    continue
  fi

  echo "Convertendo: $idx -> ${base}.srt"

  vobsub2srt \
    --lang "$LANG_CODE" \
    "$base"

  if [[ -f "${base}.srt" ]]; then
    echo "Concluído: ${base}.srt"
  else
    echo "Falhou: ${base}.srt não foi gerado"
  fi
done



#!/bin/bash

set -e

PASTAS=(
    "ConstantCidadeDemons|539517"
    "DivertMente|150540"
    "jumanji|8844"
    "jumanjiBVaSelva|353486"
    "jumanjiPF|512200"
    "Minions1|211672"
    "Minions2|438148"
    "ProjetoAlmanaque|227719"
    "ProjetoGemini|453405"
    "ProjetoX|57214"
    "QMatarMeuChef|227159"
)


for pasta in "${PASTAS[@]}"; do
    IFS="|" read -r title id <<< "$pasta"

    echo "enviando: $title ($id)"
    upload-hls "$title" "$id"
done