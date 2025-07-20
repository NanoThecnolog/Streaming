import Link from 'next/link'
import styles from './styles.module.scss'
import { SiAppletv, SiHbo, SiNetflix, SiParamountplus, SiPrimevideo, SiSky, SiStarz } from 'react-icons/si'
import { TbBrandDisney } from 'react-icons/tb'

export default function Streaming() {
    return (
        <section className={styles.contentPromoContainer}>
            <div className={styles.content}>
                <h2>Tudo em um só lugar</h2>
                <p>Assista aos conteúdos dos streamings mais famosos num só lugar</p>
                <div className={styles.streamBrand}>
                    <div className={`${styles.logo} ${styles.netflix}`}>
                        <SiNetflix />
                        <p>Netflix</p>
                    </div>
                    <div className={`${styles.logo} ${styles.hbo}`}>
                        <SiHbo />
                        <p>HBO MAX</p>
                    </div>
                    <div className={`${styles.logo} ${styles.prime}`}>
                        <SiPrimevideo />
                        <p>Prime Video</p>
                    </div>
                    <div className={`${styles.logo} ${styles.disney}`}>
                        <TbBrandDisney />
                        <p>Disney+</p>
                    </div>
                    <div className={`${styles.logo} ${styles.sky}`}>
                        <SiSky />
                        <p>Sky+</p>
                    </div>
                    <div className={`${styles.logo} ${styles.apple}`}>
                        <SiAppletv />
                        <p>Apple TV+</p>
                    </div>
                    <div className={`${styles.logo} ${styles.paramount}`}>
                        <SiParamountplus />
                        <p>Paramount+</p>
                    </div>
                    <div className={`${styles.logo} ${styles.globo}`}>
                        <p>globo<span>play</span></p>
                    </div>
                    <div className={`${styles.logo} ${styles.starz}`}>
                        <SiStarz />
                    </div>
                </div>
                <div className={styles.buttonActionContainer}>
                    <Link href="/planos/#escolher">
                        <button>
                            Escolher plano
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    )
}