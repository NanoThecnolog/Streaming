import { useState } from 'react'
import { ProfileProps } from '@/@types/user'
import { useFlix } from '@/contexts/FlixContext'
import Image from 'next/image'
import { Check, Plus, X } from 'lucide-react'
import { toast } from '@/components/ui/Notifications'
import styles from './styles.module.scss'

interface ProfileSelectorProps {
  onClose?: () => void
  onSelect: (profile: ProfileProps) => void
  showCreateButton?: boolean
  onCreateProfile?: () => void
}

export default function ProfileSelector({
  onClose,
  onSelect,
  showCreateButton = true,
  onCreateProfile,
}: ProfileSelectorProps) {
  const { profiles, activeProfile } = useFlix()
  const [selectedId, setSelectedId] = useState<string | null>(activeProfile?.id ?? null)

  const handleSelect = (profile: ProfileProps) => {
    setSelectedId(profile.id)
    onSelect(profile)
    if (onClose) {
      setTimeout(onClose, 300)
    }
  }

  const handleCreate = () => {
    if (onCreateProfile) {
      onCreateProfile()
    } else {
      toast.info('Função de criação não configurada.')
    }
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div>
            <h3>Quem está assistindo?</h3>
            <p>Selecione um perfil para continuar</p>
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className={styles.closeButton}
              aria-label="Fechar"
            >
              <X size={20} />
            </button>
          )}
        </div>

        <div className={styles.modalBody}>
          <div className={styles.profilesGrid}>
            {profiles.map((profile) => {
              const isSelected = selectedId === profile.id
              const isActive = activeProfile?.id === profile.id

              return (
                <button
                  key={profile.id}
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
                    {isActive && <div className={styles.activeBadge}>Ativo</div>}
                  </div>
                  <span className={styles.profileName}>{profile.name}</span>
                  {profile.isDefault && <span className={styles.defaultBadge}>Padrão</span>}
                </button>
              )
            })}

            {showCreateButton && profiles.length < 4 && (
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
  )
}
