import Image from 'next/image'
import { FaUserCircle } from 'react-icons/fa'
import { isDiceBearAvatar } from '@/utils/diceBear'
import { ProfileProps } from '@/@types/user'
import { Check, Edit3, Trash2 } from 'lucide-react'
import styles from './styles.module.scss'

interface ProfileCardProps {
  profile: ProfileProps
  isActive: boolean
  onSelect: (profile: ProfileProps) => void
  onEdit: (profile: ProfileProps) => void
  onDelete: (profile: ProfileProps) => void
}

export default function ProfileCard({ profile, isActive, onSelect, onEdit, onDelete }: ProfileCardProps) {
  return (
    <div
      className={`${styles.profileCard} ${isActive ? styles.active : ''}`}
      onClick={() => onSelect(profile)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onSelect(profile)
      }}
    >
      <div className={styles.avatarWrapper}>
        {profile.avatar ? (
          <Image
            src={profile.avatar}
            alt={`Avatar de ${profile.name}`}
            width={80}
            height={80}
            unoptimized={isDiceBearAvatar(profile.avatar)}
          />
        ) : (
          <FaUserCircle size={80} />
        )}

        {isActive && (
          <div className={styles.activeBadge}>
            <Check size={14} />
          </div>
        )}
      </div>

      <span className={styles.profileName}>{profile.name}</span>

      {profile.isDefault && <span className={styles.defaultBadge}>Padrão</span>}

      <div className={styles.actions}>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onEdit(profile)
          }}
          className={styles.actionButton}
          aria-label="Editar perfil"
        >
          <Edit3 size={14} />
        </button>

        {!profile.isDefault && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onDelete(profile)
            }}
            className={`${styles.actionButton} ${styles.deleteAction}`}
            aria-label="Excluir perfil"
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>
    </div>
  )
}
