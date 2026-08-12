import { UserRound } from 'lucide-react'
import styles from './styles.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function HeaderSecundario() {
  const router = useRouter()
  return (
    <nav className={styles.container}>
      <button type="button" className={styles.profileButton} onClick={() => router.push('/login')}>
        Entrar
      </button>
    </nav>
  )
}
