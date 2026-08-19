import { useEffect, useState } from 'react'
import { GenrePreferenceProps, GenreProps, ProfileProps } from '@/@types/user'
import { useFlix } from '@/contexts/FlixContext'
import axios from 'axios'
import { toast } from '@/components/ui/Notifications'
import { Save, X } from 'lucide-react'
import AvatarEditor from '@/components/AvatarEditor'
import styles from './styles.module.scss'

interface ProfileEditorProps {
  profile?: ProfileProps | null
  onClose: () => void
}

export default function ProfileEditor({ profile, onClose }: ProfileEditorProps) {
  const { profiles, setProfiles, setActiveProfile, activeProfile } = useFlix()
  const [name, setName] = useState(profile?.name ?? '')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const isEditing = Boolean(profile)

  const [allGenres, setAllGenres] = useState<GenreProps[]>([])
  const [preferences, setPreferences] = useState<GenrePreferenceProps[]>([])
  const [loadingGenres, setLoadingGenres] = useState(false)

  useEffect(() => {
    if (isEditing) return

    const fetchGenres = async () => {
      setLoadingGenres(true)
      try {
        const { data } = await axios.get<GenreProps[]>('/api/genres')
        setAllGenres(Array.isArray(data) ? data : [])
      } catch (err) {
        console.error('[ProfileEditor] erro ao carregar gêneros:', err)
        toast.error('Erro ao carregar gêneros.')
      } finally {
        setLoadingGenres(false)
      }
    }
    void fetchGenres()
  }, [isEditing])

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
      if (isEditing && profile) {
        const { data } = await axios.put<ProfileProps>(`/api/user/profiles/${profile.id}`, {
          name: name.trim(),
          avatar: avatarUrl,
        })
        const updated = profiles.map((p) => (p.id === data.id ? data : p))
        setProfiles(updated)
        if (activeProfile?.id === data.id) setActiveProfile(data)
        toast.success('Perfil atualizado.')
      } else {
        const { data } = await axios.post<ProfileProps>('/api/user/profiles', {
          name: name.trim(),
          avatar: avatarUrl,
        })

        const genresToSave = preferences.filter((p) => p.weight > 0)
        if (genresToSave.length > 0) {
          await axios.put(`/api/user/profiles/${data.id}/preferences`, {
            genres: genresToSave.map((p) => ({ genId: p.genId, weight: p.weight })),
          })
        }

        setProfiles([...profiles, data])
        setActiveProfile(data)
        toast.success('Perfil criado.')
      }
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
          <h3>{isEditing ? 'Editar perfil' : 'Novo perfil'}</h3>

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
              value={profile?.avatar}
              onChange={setAvatarUrl}
              disabled={loading}
              stickyPreview
            />
          </section>

          {!isEditing && (
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
          )}
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
            {loading ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </div>
    </div>
  )
}
