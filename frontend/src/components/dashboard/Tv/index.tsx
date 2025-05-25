import { useState } from 'react'
import styles from './styles.module.scss'
import CreateTV from './Create'
import PutTV from './Put'
import DeleteTV from './Delete'

interface TVDashProps {
    id?: number
}

export default function TVDash({ id }: TVDashProps) {
    const [action, setAction] = useState<string>()
    function formToShow() {
        if (action === 'create') return <CreateTV />
        if (action === 'put') return <PutTV tmdbid={id} />
        if (action === 'delete') return <DeleteTV />
    }
    return (
        <>
            <section>
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
            </section>
        </>
    )
}