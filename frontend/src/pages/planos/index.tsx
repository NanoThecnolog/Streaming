import Footer from "@/components/Footer";
import Header from "@/components/Header";
import styles from './styles.module.scss'
import SEO from "@/components/SEO";
import { useState } from "react";

interface PlanProps {
    id: string,
    name: string,
    price: number,
    type: string,
    planId: number
}

export default function Donate() {
    const [plans, setPlans] = useState<PlanProps[]>([])

    return (
        <>
            <SEO title="Doações | FlixNext" description="Ajude a manter a plataforma! Doe qualquer valor e ganhe o emblema de doador na sua conta!" />
            <Header />
            <section className={styles.sectionContainer}>
                <div className={styles.contentContainer}>
                    <div className={styles.title}>
                        <h1>Escolha o melhor plano para você</h1>
                    </div>
                    <div className={styles.plansContainer}>
                        {
                            plans.map(p => (
                                <div className={styles.plan} key={p.planId}>
                                    <p>{p.name}</p>
                                    <p>{p.price}</p>
                                    <p>{p.type}</p>
                                    <button>Escolha seu plano</button>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}