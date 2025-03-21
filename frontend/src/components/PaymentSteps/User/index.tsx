import { UserDataProps } from '@/pages/payment'
import styles from './styles.module.scss'

interface UserStepProps {
    data: UserDataProps,
    setDataUser: React.Dispatch<React.SetStateAction<UserDataProps>>
}

export default function User({ data, setDataUser }: UserStepProps) {
    return (
        <>
            <div className={styles.userData}>
                <h4>Dados do Usuário</h4>
                Complete os seus dados
                <label htmlFor="nome">
                    Nome
                    <input
                        type="text"
                        id="nome"
                        value={data.nome || ""}
                        onChange={(e) => setDataUser((prev) => ({ ...prev, nome: e.target.value }))}
                    />
                </label>
                <label htmlFor="cpf">
                    CPF
                    <input
                        type="text"
                        id="cpf"
                        value={data.cpf || ""}
                        onChange={(e) => setDataUser((prev) => ({ ...prev, cpf: e.target.value }))}
                    />
                </label>
                <label htmlFor="phone">
                    Telefone
                    <input
                        type="tel"
                        id="phone"
                        value={data.telefone || ""}
                        onChange={(e) => setDataUser((prev) => ({ ...prev, telefone: e.target.value }))}
                    />
                </label>
            </div>
            <div className={styles.userData}>
                <h4>Endereço</h4>
                <div className={styles.addressGrid}>
                    <label htmlFor="street">
                        Logradouro
                        <input
                            type="text"
                            id="street"
                            value={data.address.street || ""}
                            onChange={(e) => setDataUser((prev) => ({ ...prev, address: { ...prev.address, street: e.target.value } }))}
                        />
                    </label>
                    <label htmlFor="number">
                        Número
                        <input
                            type="text"
                            id="number"
                            value={data.address.number || ""}
                            onChange={(e) => setDataUser((prev) => ({ ...prev, address: { ...prev.address, number: e.target.value } }))}
                        />
                    </label>
                    <label htmlFor="neighborhood">
                        Bairro
                        <input
                            type="text"
                            id="neighborhood"
                            value={data.address.neighborhood || ""}
                            onChange={(e) => setDataUser((prev) => ({ ...prev, address: { ...prev.address, neighborhood: e.target.value } }))}
                        />
                    </label>
                    <label htmlFor="zipcode">
                        CEP
                        <input
                            type="text"
                            id="zipcode"
                            value={data.address.zipcode || ""}
                            onChange={(e) => setDataUser((prev) => ({ ...prev, address: { ...prev.address, zipcode: e.target.value } }))}
                        />
                    </label>
                    <label htmlFor="city">
                        Cidade
                        <input
                            type="text"
                            id="city"
                            value={data.address.city || ""}
                            onChange={(e) => setDataUser((prev) => ({ ...prev, address: { ...prev.address, city: e.target.value } }))}
                        />
                    </label>
                    <label htmlFor="complement">
                        Complemento
                        <input
                            type="text"
                            id="complement"
                            value={data.address.complement || ""}
                            onChange={(e) => setDataUser((prev) => ({ ...prev, address: { ...prev.address, complement: e.target.value } }))}
                        />
                    </label>
                    <label htmlFor="state">
                        Estado
                        <input
                            type="text"
                            id="state"
                            value={data.address.state || ""}
                            onChange={(e) => setDataUser((prev) => ({ ...prev, address: { ...prev.address, state: e.target.value } }))}
                        />
                    </label>
                </div>
            </div>
        </>
    )
}