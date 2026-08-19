import { useEffect, useState } from 'react'
import { GenrePreferenceProps, GenreProps, ProfileProps } from '@/@types/user'
import { useFlix } from '@/contexts/FlixContext'
import axios from 'axios'
import { toast } from '@/components/ui/Notifications'
import { Save, X } from 'lucide-react'
import AvatarEditor from '@/components/AvatarEditor'
import styles from './styles.module.scss'

interface ProfileCustomizationProps {
  profile: ProfileProps
  onClose: () => void
}

export default function ProfileCustomization({ profile, onClose }: ProfileCustomizationProps) {
  const { profiles, setProfiles, setActiveProfile, activeProfile } = useFlix()
  const [name, setName] = useState(profile.name)
  const [avatarUrl, setAvatarUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const [allGenres, setAllGenres] = useState<GenreProps[]>([])
  const [preferences, setPreferences] = useState<GenrePreferenceProps[]>([])
  const [loadingGenres, setLoadingGenres] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [genresRes, prefsRes] = await Promise.all([
          axios.get<GenreProps[]>('/api/genres'),
          axios.get<GenrePreferenceProps[]>(`/api/user/profiles/${profile.id}/preferences`),
        ])
        setAllGenres(Array.isArray(genresRes.data) ? genresRes.data : [])
        setPreferences(Array.isArray(prefsRes.data) ? prefsRes.data : [])
      } catch (err) {
        console.error('[ProfileCustomization] erro ao buscar dados', err)
        toast.error('Erro ao carregar dados.')
      } finally {
        setLoadingGenres(false)
      }
    }
    void fetchData()
  }, [profile.id])

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error('O nome do perfil é obrigatório.')
      return
    }

    if (name.trim().length < 2) {
      toast.error('O nome deve ter pelo menos 2 caracteres.')
      return
    }

    setLoading(true)
    try {
      const { data: updatedProfile } = await axios.put<ProfileProps>(
        `/api/user/profiles/${profile.id}`,
        {
          name: name.trim(),
          avatar: avatarUrl,
        },
      )

      const genresToUpdate = preferences.filter((p) => p.weight > 0)
      await axios.put(`/api/user/profiles/${profile.id}/preferences`, {
        genres: genresToUpdate.map((p) => ({ genId: p.genId, weight: p.weight })),
      })

      const updated = profiles.map((p) => (p.id === updatedProfile.id ? updatedProfile : p))
      setProfiles(updated)
      if (activeProfile?.id === updatedProfile.id) setActiveProfile(updatedProfile)
      toast.success('Perfil personalizado com sucesso.')
      onClose()
    } catch (err: unknown) {
      const message = axios.isAxiosError(err) ? err.response?.data?.error : 'Erro ao salvar perfil.'
      toast.error(message ?? 'Erro ao salvar perfil.')
    } finally {
      setLoading(false)
    }
  }

  const toggleGenreWeight = (genreId: number) => {
    setPreferences((current) => {
      const existing = current.find((p) => p.genId === genreId)
      if (!existing) {
        const genre = allGenres.find((g) => g.id === genreId)
        if (!genre) return current
        return [...current, { genId: genreId, name: genre.name, slug: genre.slug, weight: 1 }]
      }
      const nextWeight = existing.weight === 3 ? 0 : existing.weight + 1
      if (nextWeight === 0) {
        return current.filter((p) => p.genId !== genreId)
      }
      return current.map((p) => (p.genId === genreId ? { ...p, weight: nextWeight } : p))
    })
  }

  const getGenreWeight = (genreId: number): number => {
    return preferences.find((p) => p.genId === genreId)?.weight ?? 0
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>Personalizar perfil</h3>
          <button
            type="button"
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
        </div>

        <div className={styles.modalBody}>
          <section className={styles.nameSection}>
            <label className={styles.fieldLabel}>
              Nome do perfil
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: João"
                maxLength={30}
                className={styles.input}
                disabled={loading}
                autoFocus
              />
            </label>
          </section>

          <section className={styles.avatarSection}>
            <h4>Avatar</h4>
            <AvatarEditor
              value={profile.avatar}
              onChange={setAvatarUrl}
              disabled={loading}
              stickyPreview
            />
          </section>

          <section className={styles.genresSection}>
            <h4>Gêneros favoritos</h4>
            <p className={styles.genreHint}>
              Clique para alternar: Neutro → Gosta → Favorito → Não Selecionado
            </p>
            {loadingGenres ? (
              <div className={styles.genresLoading}>Carregando gêneros...</div>
            ) : (
              <div className={styles.genresGrid}>
                {allGenres.map((genre) => {
                  const weight = getGenreWeight(genre.id)
                  const weightClass =
                    weight === 0
                      ? ''
                      : weight === 1
                        ? styles.neutral
                        : weight === 2
                          ? styles.like
                          : styles.favorite

                  return (
                    <button
                      key={genre.id}
                      type="button"
                      className={`${styles.genreButton} ${weightClass}`}
                      onClick={() => toggleGenreWeight(genre.id)}
                      disabled={loading}
                    >
                      {genre.name}
                    </button>
                  )
                })}
              </div>
            )}
          </section>
        </div>

        <div className={styles.modalFooter}>
          <button
            type="button"
            onClick={onClose}
            className={styles.cancelButton}
            disabled={loading}
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleSave}
            className={styles.saveButton}
            disabled={loading || !name.trim()}
          >
            <Save size={16} />
            {loading ? 'Salvando...' : 'Salvar personalização'}
          </button>
        </div>
      </div>
    </div>
  )
}
