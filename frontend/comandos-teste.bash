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

# =====================================
# ÁUDIOS
# =====================================

declare -A selected_audio

audio_count=$(ffprobe -v error \
    -select_streams a \
    -show_entries stream=index \
    -of csv=p=0 "$f" | wc -l)

for ((i=0; i<audio_count; i++)); do

    lang=$(ffprobe -v error \
        -select_streams a:$i \
        -show_entries stream_tags=language \
        -of default=noprint_wrappers=1:nokey=1 "$f")

    codec=$(ffprobe -v error \
        -select_streams a:$i \
        -show_entries stream=codec_name \
        -of default=noprint_wrappers=1:nokey=1 "$f")

    [ -z "$lang" ] && lang="und"

    lang=$(echo "$lang" | tr '[:upper:]' '[:lower:]')

    case "$lang" in
        por|pt|pt-br|pt_br)
            lang="pt-BR"
            ;;
        eng|en|en-us|en_us)
            lang="en"
            ;;
        spa|es|es-es|es_es)
            lang="es"
            ;;
        fra|fre|fr)
            lang="fr"
            ;;
        ger|deu|de)
            lang="de"
            ;;
        ita|it)
            lang="it"
            ;;
        jpn|ja)
            lang="ja"
            ;;
    esac

    current="${selected_audio[$lang]}"

    if [ -z "$current" ]; then
        selected_audio[$lang]="$i:$codec"
        continue
    fi

    current_codec="${current#*:}"

    # Prioriza AAC quando houver múltiplas faixas do mesmo idioma
    if [ "$codec" = "aac" ] && [ "$current_codec" != "aac" ]; then
        selected_audio[$lang]="$i:$codec"
    fi

done

audio_maps=""
var_stream_map="v:0"
audio_index=0

for lang in "${!selected_audio[@]}"; do

    stream_info="${selected_audio[$lang]}"
    source_index="${stream_info%%:*}"

    audio_maps="$audio_maps -map 0:a:$source_index"

    var_stream_map="$var_stream_map a:$audio_index,agroup:audio,language:$lang,name:$lang"

    audio_index=$((audio_index + 1))

done

if [ "$audio_index" -eq 0 ]; then
    echo "ERRO: nenhum áudio encontrado em $f"
    exit 1
fi

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