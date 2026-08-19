import { useEffect, useState, useCallback } from 'react'
import { GenreProps, GenrePreferenceProps } from '@/@types/user'
import { useFlix } from '@/contexts/FlixContext'
import axios from 'axios'
import { toast } from '@/components/ui/Notifications'
import { debug } from '@/classes/DebugLogger'
import styles from './styles.module.scss'

const WEIGHT_LABELS: Record<number, string> = {
  0: 'Nenhum',
  1: 'Neutro',
  2: 'Gosto',
  3: 'Favorito',
}

export default function GenrePreferences() {
  const { activeProfile, genrePreferences, setGenrePreferences } = useFlix()
  const [allGenres, setAllGenres] = useState<GenreProps[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const safePreferences = Array.isArray(genrePreferences) ? genrePreferences : []
  const prefMap = new Map(safePreferences.map((p) => [p.genId, p.weight]))

  const fetchGenres = useCallback(async () => {
    try {
      const { data } = await axios.get<GenreProps[]>('/api/genres')
      debug.log('[GenrePreferences] genres recebidos:', {
        type: typeof data,
        isArray: Array.isArray(data),
        length: Array.isArray(data) ? data.length : 'N/A',
        preview: JSON.stringify(data)?.slice(0, 300),
      })
      setAllGenres(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('[GenrePreferences] erro ao carregar gêneros:', err)
      toast.error('Erro ao carregar gêneros.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchGenres()
  }, [fetchGenres])

  const handleToggle = async (genId: number) => {
    if (!activeProfile || saving) return

    const currentWeight = prefMap.get(genId) ?? 0
    const nextWeight = currentWeight >= 3 ? 0 : currentWeight + 1

    const updatedMap = new Map(prefMap)
    if (nextWeight === 0) {
      updatedMap.delete(genId)
    } else {
      updatedMap.set(genId, nextWeight)
    }

    const newPrefs: GenrePreferenceProps[] = Array.from(updatedMap.entries()).map(
      ([id, weight]) => {
        const genre = allGenres.find((g) => g.id === id)!
        return { genId: id, name: genre.name, slug: genre.slug, weight }
      },
    )
    setGenrePreferences(newPrefs)

    setSaving(true)
    try {
      const genres = Array.from(updatedMap.entries()).map(([id, weight]) => ({
        genId: id,
        weight,
      }))
      await axios.put(`/api/user/profiles/${activeProfile.id}/preferences`, { genres })
    } catch {
      toast.error('Erro ao salvar preferências.')
      setGenrePreferences(genrePreferences)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className={styles.loading}>Carregando gêneros...</div>
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <span>Personalização</span>
          <h3>Gêneros Preferidos</h3>
        </div>
        <span className={styles.hint}>Toque para alternar: Neutro → Gosto → Favorito</span>
      </div>

      <div className={styles.genreGrid}>
        {allGenres.map((genre) => {
          const weight = prefMap.get(genre.id) ?? 0
          return (
            <button
              key={genre.id}
              type="button"
              className={`${styles.genreChip} ${weight > 0 ? styles.active : ''} ${
                weight === 3 ? styles.favorite : weight === 2 ? styles.liked : ''
              }`}
              onClick={() => handleToggle(genre.id)}
              disabled={saving}
            >
              <span className={styles.genreName}>{genre.name}</span>
              {weight > 0 && (
                <span className={styles.weightLabel}>{WEIGHT_LABELS[weight]}</span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
