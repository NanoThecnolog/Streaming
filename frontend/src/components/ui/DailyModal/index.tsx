// src/components/DailyWarningModal/index.tsx
import Link from 'next/link';
import styles from './styles.module.scss';
import { formatPrice } from '@/utils/UtilitiesFunctions';
import { planValues } from '@/utils/Variaveis';

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
                    A plataforma está passando por uma migração de infraestrutura para oferecer
                    mais desempenho, estabilidade e suportar o crescimento do catálogo.
                </p>

                <p>
                    Durante esse período, alguns <strong>filmes, séries ou episódios</strong> podem ficar
                    temporariamente indisponíveis enquanto são transferidos para os novos
                    servidores.
                </p>

                <p className={styles.purpose}>
                    Agradecemos a compreensão. Em breve, todo o conteúdo estará disponível
                    novamente em uma plataforma ainda melhor.
                </p>

                <div className={styles.buttonContainer}>
                    <button onClick={onClose}>Entendi</button>
                </div>
            </div>
        </div>
    );
}
