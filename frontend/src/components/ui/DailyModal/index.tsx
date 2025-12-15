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
                    Com o crescimento da plataforma, os custos de infraestrutura e manutenção
                    também aumentaram. Para garantir a continuidade, estabilidade e evolução
                    do serviço, será implementado um <strong className='red'>sistema de assinaturas</strong>.
                </p>

                <p>
                    A assinatura mensal será de <strong className='red'>R$ 10,99</strong>, com pagamento via
                    <strong> Pix ou boleto</strong>. O valor tem como objetivo
                    cobrir os custos operacionais e o trabalho de manutenção.
                </p>

                <p>
                    <strong>O sistema entra em funcionamento a partir do dia 17</strong>, mas
                    as assinaturas <strong>já podem ser contratadas.</strong>.
                </p>

                <p>
                    Usuários atuais podem contratar pelo <Link href={'/me'} className='red'>painel da conta</Link>. Novos usuários
                    realizarão a escolha do plano no momento do cadastro. <Link href='/planos' className='red'>Clique aqui</Link> para ver os planos disponíveis.
                </p>
                <p>Obrigado por nos apoiarem!</p>

                <div className={styles.buttonContainer}>
                    <button onClick={onClose}>Fechar</button>
                </div>
            </div>
        </div>
    );
}
