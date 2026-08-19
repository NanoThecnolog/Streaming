import { useEffect, useState } from 'react'
import { ProfileProps } from '@/@types/user'
import { useFlix } from '@/contexts/FlixContext'
import Image from 'next/image'
import axios from 'axios'
import { Check, Plus, Trash2, X, Edit2 } from 'lucide-react'
import { toast } from '@/components/ui/Notifications'
import ProfileCustomization from '@/components/modals/ProfileCustomization'
import ProfileEditor from '@/components/ProfileEditor'
import styles from './styles.module.scss'

interface ProfileManagerProps {
  onSelect: (profile: ProfileProps) => void
  onClose?: () => void
  requireSelection?: boolean
}

export default function ProfileManager({
  onSelect,
  onClose,
  requireSelection = false,
}: ProfileManagerProps) {
  const { profiles, setProfiles, activeProfile, setActiveProfile } = useFlix()
  const [selectedId, setSelectedId] = useState<string | null>(activeProfile?.id ?? null)
  const [customizingProfile, setCustomizingProfile] = useState<ProfileProps | null>(null)
  const [creatingProfile, setCreatingProfile] = useState(false)
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    if (!confirmDeleteId) return
    const timer = window.setTimeout(() => setConfirmDeleteId(null), 3000)
    return () => window.clearTimeout(timer)
  }, [confirmDeleteId])

  const handleSelect = (profile: ProfileProps) => {
    setSelectedId(profile.id)
    setConfirmDeleteId(null)
    onSelect(profile)
    if (onClose && !requireSelection) {
      setTimeout(onClose, 300)
    }
  }

  const handleEdit = (e: React.MouseEvent, profile: ProfileProps) => {
    e.stopPropagation()
    setConfirmDeleteId(null)
    setCustomizingProfile(profile)
  }

  const handleCreate = () => {
    setConfirmDeleteId(null)
    setCreatingProfile(true)
  }

  const handleDeleteClick = (event: React.MouseEvent, profile: ProfileProps) => {
    event.stopPropagation()
    if (deletingId) return
    if (confirmDeleteId !== profile.id) {
      setConfirmDeleteId(profile.id)
      return
    }
    void performDelete(profile)
  }

  const performDelete = async (profile: ProfileProps) => {
    setDeletingId(profile.id)
    try {
      await axios.delete(`/api/user/profiles/${profile.id}`)
      const remaining = profiles.filter((p) => p.id !== profile.id)
      setProfiles(remaining)
      if (selectedId === profile.id) setSelectedId(null)
      if (activeProfile?.id === profile.id && remaining.length > 0) {
        setActiveProfile(remaining[0])
      }
      setConfirmDeleteId(null)
      toast.success(`Perfil "${profile.name}" excluído.`)
    } catch (err: unknown) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.error
        : 'Erro ao excluir o perfil.'
      toast.error(message ?? 'Erro ao excluir o perfil.')
      setConfirmDeleteId(null)
    } finally {
      setDeletingId(null)
    }
  }

  const handleCloseCustomization = () => {
    setCustomizingProfile(null)
  }

  const handleCloseCreation = () => {
    setCreatingProfile(false)
  }

  const canCreateMore = profiles.length < 4

  return (
    <>
      <div className={styles.overlay} onClick={!requireSelection ? onClose : undefined}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          {!requireSelection && onClose && (
            <button
              type="button"
              onClick={onClose}
              className={styles.closeButton}
              aria-label="Fechar"
            >
              <X size={20} />
            </button>
          )}
          <div className={styles.modalHeader}>
            <div>
              <h3>Quem está assistindo?</h3>
              <p>Selecione um perfil para continuar</p>
            </div>
          </div>

          <div className={styles.modalBody}>
            <div className={styles.profilesGrid}>
              {profiles.map((profile) => {
                const isSelected = selectedId === profile.id
                //const isActive = activeProfile?.id === profile.id

                return (
                  <div key={profile.id} className={styles.profileCardWrapper}>
                    <button
                      type="button"
                      className={`${styles.profileCard} ${isSelected ? styles.selected : ''}`}
                      onClick={() => handleSelect(profile)}
                    >
                      <div className={styles.avatarWrapper}>
                        <div className={styles.avatar}>
                          <Image
                            src={profile.avatar ?? '/default-avatar.png'}
                            alt={profile.name}
                            fill
                            sizes="150px"
                            unoptimized
                            priority
                          />
                        </div>
                        {isSelected && (
                          <div className={styles.checkmark}>
                            <Check size={20} strokeWidth={3} />
                          </div>
                        )}
                        {/*isActive && <div className={styles.activeBadge}>Ativo</div>*/}
                      </div>
                      <span className={styles.profileName}>{profile.name}</span>
                      {/*profile.isDefault && <span className={styles.defaultBadge}>Padrão</span>*/}
                    </button>
                    <button
                      type="button"
                      className={styles.editButton}
                      onClick={(e) => handleEdit(e, profile)}
                      aria-label={`Editar ${profile.name}`}
                    >
                      <Edit2 size={16} />
                    </button>
                    {profiles.length > 1 && (
                      <button
                        type="button"
                        className={`${styles.deleteButton} ${
                          confirmDeleteId === profile.id ? styles.deleteButtonConfirm : ''
                        }`}
                        onClick={(event) => handleDeleteClick(event, profile)}
                        disabled={deletingId === profile.id}
                        aria-label={
                          confirmDeleteId === profile.id
                            ? `Confirmar exclusão do perfil ${profile.name}`
                            : `Excluir perfil ${profile.name}`
                        }
                        title={
                          confirmDeleteId === profile.id
                            ? 'Clique novamente para confirmar'
                            : 'Excluir perfil'
                        }
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                )
              })}

              {canCreateMore && (
                <button type="button" className={styles.createCard} onClick={handleCreate}>
                  <div className={styles.createIcon}>
                    <Plus size={32} />
                  </div>
                  <span>Criar perfil</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {customizingProfile && (
        <ProfileCustomization profile={customizingProfile} onClose={handleCloseCustomization} />
      )}

      {creatingProfile && <ProfileEditor profile={null} onClose={handleCloseCreation} />}
    </>
  )
}
