import styles from './styles.module.scss'

interface Props {
    faixa?: string
}

export default function Adult({ faixa }: Props) {

    const classification = [
        {
            etaria: "L",
            cor: "var(--green)",
            msg: "Indicado para todos os públicos."
        },
        {
            etaria: "10",
            cor: "var(--blue)",
            msg: "Pode conter linguagem e violência leve."
        },
        {
            etaria: "A12",
            cor: "var(--yellow)",
            msg: "Pode conter linguagem imprópria, violência moderada."
        },
        {
            etaria: "A14",
            cor: "var(--orange)",
            msg: "Pode conter violência, cenas de sexo e drogas."
        },
        {
            etaria: "A16",
            cor: "var(--red)",
            msg: "Pode conter violência explícita, cenas de sexo explícito e consumo explícito de drogas."
        },
        {
            etaria: "18",
            cor: "var(--black)",
            msg: "Pode conter conteúdo extremo, violência explícita, sexo explícito e apologia às drogas."
        }
    ]

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