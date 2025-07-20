import { UserDataProps } from '@/@types/payment'
import styles from './styles.module.scss'
import { getDate } from '@/utils/UtilitiesFunctions'

interface UserStepProps {
    data: UserDataProps,
    setDataUser: React.Dispatch<React.SetStateAction<UserDataProps>>,
    confirmarSenha: React.Dispatch<React.SetStateAction<string>>,
    senha: string,
    valid: boolean
}

export default function User({ data, setDataUser, senha, confirmarSenha }: UserStepProps) {


    return (
        <>
            <div className={styles.userData}>
                <h3>Dados do Usuário</h3>
                <p>Complete os seus dados</p>
                <form className={styles.formContainer}>
                    <div>
                        <label htmlFor="nome">
                            Nome
                            <input
                                type="text"
                                id="nome"
                                value={data.nome || ""}
                                onChange={(e) => setDataUser((prev) => ({ ...prev, nome: e.target.value }))}
                                required
                            />
                        </label>
                        <label htmlFor="cpf">
                            CPF
                            <input
                                type="text"
                                id="cpf"
                                value={data.cpf || ""}
                                onChange={(e) => setDataUser((prev) => ({ ...prev, cpf: e.target.value }))}
                                required
                            />
                        </label>
                        <label htmlFor="phone">
                            Telefone
                            <input
                                type="tel"
                                id="phone"
                                value={data.telefone || ""}
                                onChange={(e) => setDataUser((prev) => ({ ...prev, telefone: e.target.value }))}
                                required
                            />
                        </label>
                    </div>
                    <div>
                        <label htmlFor='birthday'>
                            Data de Nascimento
                            <input
                                type="date"
                                min='1900-01-01'
                                max={getDate()}
                                id='birthday'
                                name='nascimento'
                                required
                                value={data.birthday}
                                onChange={(e) => setDataUser((prev) => ({ ...prev, birthday: e.target.value }))}
                            />
                        </label>
                        <label htmlFor='senha'>
                            Senha
                            <input
                                type="password"
                                id='senha'
                                name='senha'
                                required
                                minLength={6}
                                pattern='^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$'
                                title='A senha deve conter pelo menos 6 caracteres, uma letra, um número e um caractere especial.'
                                value={data.password}
                                onChange={(e) => setDataUser((prev) => ({ ...prev, password: e.target.value }))}
                            />
                        </label>
                        <label htmlFor='confirmarSenha'>
                            Confirmar senha
                            <input
                                type="password"
                                id='confirmarSenha'
                                name='confirmarSenha'
                                required
                                value={senha}
                                onChange={(e) => confirmarSenha(e.target.value)}
                            />
                        </label>
                    </div>
                </form>
            </div>
            <div className={styles.userData}>
                <h4>Endereço</h4>
                <div className={styles.addressGrid}>
                    <label htmlFor="zipcode">
                        CEP
                        <input
                            type="text"
                            id="zipcode"
                            value={data.address.zipcode || ""}
                            onChange={(e) => setDataUser((prev) => ({ ...prev, address: { ...prev.address, zipcode: e.target.value.replace(/\D/g, '') } }))}
                            required
                        />
                    </label>
                    <label htmlFor="street">
                        Logradouro
                        <input
                            type="text"
                            id="street"
                            value={data.address.street || ""}
                            onChange={(e) => setDataUser((prev) => ({ ...prev, address: { ...prev.address, street: e.target.value } }))}
                            required
                        />
                    </label>

                    <label htmlFor="neighborhood">
                        Bairro
                        <input
                            type="text"
                            id="neighborhood"
                            value={data.address.neighborhood || ""}
                            onChange={(e) => setDataUser((prev) => ({ ...prev, address: { ...prev.address, neighborhood: e.target.value } }))}
                            required
                        />
                    </label>
                    <label htmlFor="number">
                        Número
                        <input
                            type="text"
                            id="number"
                            value={data.address.number || ""}
                            onChange={(e) => setDataUser((prev) => ({ ...prev, address: { ...prev.address, number: e.target.value } }))}
                            required
                        />
                    </label>

                    <label htmlFor="city">
                        Cidade
                        <input
                            type="text"
                            id="city"
                            value={data.address.city || ""}
                            onChange={(e) => setDataUser((prev) => ({ ...prev, address: { ...prev.address, city: e.target.value } }))}
                            required
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
                            required
                        />
                    </label>
                </div>
            </div>
        </>
    )
}