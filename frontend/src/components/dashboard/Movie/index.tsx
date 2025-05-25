import { useState } from 'react'
import styles from './styles.module.scss'
import Create from './Create'
import Put from './Put'
import Delete from './Delete'

interface MovieDashProps {
    id?: number
}

export default function MovieDash({ id }: MovieDashProps) {
    const [action, setAction] = useState<string>()
    function formToShow() {
        if (action === 'create') return <Create />
        if (action === 'put') return <Put tmdbid={id} />
        if (action === 'delete') return <Delete />
    }
    return (
        <div>
            <nav className={styles.navContainer}>
                <ul>
                    <li><button onClick={() => setAction('create')}>Adicionar</button></li>
                    <li><button onClick={() => setAction('put')}>Editar</button></li>
                    <li><button onClick={() => setAction('delete')}>Deletar</button></li>
                </ul>
            </nav>
            <div className={styles.formContainer}>
                {formToShow()}
            </div>
        </div>
    )
}