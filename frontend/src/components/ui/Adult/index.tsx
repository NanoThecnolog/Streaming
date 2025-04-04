import { classification } from '@/utils/Variaveis'
import styles from './styles.module.scss'

interface Props {
    faixa?: string
}

export default function Adult({ faixa }: Props) {



    const faixaEtaria = classification.find(classificacao => classificacao.etaria === faixa)

    return (
        <>

            {faixaEtaria && (
                <div className={styles.selo} title={faixaEtaria.msg} style={{ backgroundColor: faixaEtaria.cor }}>
                    <span>{faixaEtaria.etaria}</span>
                </div>
            )}
        </>
    )
}