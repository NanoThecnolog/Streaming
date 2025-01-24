import React from "react";
import styles from './styles.module.scss'
import Link from "next/link";

type Props = { children: React.ReactNode };
type State = { hasError: boolean };

class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("Erro capturado pelo ErrorBoundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className={styles.container}>
                    <h1>Ops! Algo deu errado.</h1>
                    <p>Tente recarregar a página, voltar para página principal, ou entre em contato com o suporte <Link href='/suporte'>clicando aqui</Link>.</p>
                    <div className={styles.homeLink}>
                        <Link href='/'>Página principal</Link>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;