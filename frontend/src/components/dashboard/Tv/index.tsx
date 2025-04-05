import { useState } from 'react'
import styles from './styles.module.scss'
import CreateTV from './Create'
import PutTV from './Put'
import DeleteTV from './Delete'

export default function TVDash() {
    const [action, setAction] = useState<string>()
    function formToShow() {
        if (action === 'create') return <CreateTV />
        if (action === 'put') return <PutTV />
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