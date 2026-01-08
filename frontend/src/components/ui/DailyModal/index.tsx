// src/components/DailyWarningModal/index.tsx
import Link from 'next/link';
import styles from './styles.module.scss';

interface Props {
    open: boolean;
    onClose: () => void;
}

export function DailyWarningModal({ open, onClose }: Props) {
    if (!open) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2>Aviso importante!</h2>

                <p>
                    Este projeto nasceu de forma independente, movido pela ideia de criar algo útil,
                    acessível e feito com cuidado para a comunidade.
                </p>
                <p>
                    Com o crescimento da plataforma, os custos de infraestrutura, manutenção e melhorias
                    contínuas também aumentaram. Para que o projeto possa seguir existindo, evoluindo e
                    atendendo a todos com qualidade, foi necessário implementar um
                    <strong className="red"> sistema de assinaturas</strong>.
                </p>

                <p>
                    Os planos de acesso são organizados por período e começam em
                    <strong className="red"> R$ 14,45</strong>, com pagamento via
                    <strong> Pix ou boleto</strong>.
                    Esse valor é utilizado exclusivamente para cobrir os custos operacionais e manter
                    a plataforma ativa.
                </p>

                <p>
                    Ao adquirir um plano, você não está apenas liberando funcionalidades — está ajudando
                    diretamente a manter este projeto vivo e em constante evolução.
                </p>
                <p>
                    Usuários já cadastrados podem ativar um plano pelo
                    <Link href="/me" className="red"> painel da conta</Link>.
                    Novos usuários podem escolher um plano durante o cadastro.
                    <Link href="/planos" className="red"> Ver planos disponíveis</Link>.
                </p>
                <p className={styles.purpose}>
                    A assinatura representa um apoio coletivo para que a plataforma continue existindo,
                    sendo aprimorada e permanecendo acessível para todos que acreditam na ideia.
                </p>

                <div className={styles.buttonContainer}>
                    <button onClick={onClose}>Fechar</button>
                </div>
            </div>
        </div>
    );
}
