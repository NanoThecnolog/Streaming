// src/components/DailyWarningModal/index.tsx
import Link from 'next/link';
import styles from './styles.module.scss';
import { useFlix } from '@/contexts/FlixContext';
import { formatPrice } from '@/utils/UtilitiesFunctions';
import { planValues } from '@/utils/Variaveis';

interface Props {
    open: boolean;
    onClose: () => void;
}

export function WarningModal({ open, onClose }: Props) {
    if (!open) return null;
    const { subscription } = useFlix()

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <header className={styles.header}>
                    <h2>Acesso restrito</h2>
                </header>

                <div className={styles.content}>
                    <p className={styles.primaryText}>
                        Para continuar utilizando a plataforma, é necessário possuir um plano ativo.
                    </p>

                    {subscription ? (
                        <div className={styles.planInfo}>
                            <p>
                                Os planos iniciam a partir de
                                <strong className={styles.price}>{formatPrice(planValues.mensal)}</strong>
                            </p>
                            <p className={styles.smallText}>
                                Pagamento via <strong>boleto bancário</strong>, com opção de pagamento por Pix.
                                O valor é destinado exclusivamente à manutenção e custos operacionais da plataforma.
                            </p>
                        </div>
                    ) : (
                        <div className={styles.planInfo}>
                            <p className={styles.actionText}>
                                Escolha um plano e libere todas as funcionalidades.
                                <Link href="/planos" className={styles.link}>
                                    Ver planos disponíveis
                                </Link>
                            </p>
                            <p className={styles.smallText}>
                                Pagamento via <strong>boleto bancário</strong>, com opção de pagamento por Pix.
                                O valor é destinado exclusivamente à manutenção e custos operacionais da plataforma.
                            </p>
                            <p>O número de contas ativas é limitado. Corra e garanta a sua!</p>
                        </div>
                    )}

                    <p className={styles.support}>
                        Dúvidas ou problemas? Entre em contato pelo e-mail
                        <strong className='red'> suporte@flixnext.com.br</strong>
                    </p>
                </div>

                <footer className={styles.actions}>
                    {!subscription ? (
                        <Link href="/planos" className={styles.primaryButton}>
                            Escolher plano
                        </Link>
                    ) : <Link href='/me/escolher-plano' className={styles.primaryButton}>
                        Ativar um plano
                    </Link>
                    }
                    <button onClick={onClose} className={styles.secondaryButton}>
                        Fechar
                    </button>
                </footer>
            </div>
        </div>

    );
}
