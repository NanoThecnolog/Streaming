import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { SiThemoviedatabase } from "react-icons/si";
import Link from "next/link";
import styles from './styles.module.scss'
import { useRouter } from "next/navigation";


export default function Footer() {
    const router = useRouter()

    function redirectToPage(page: string) {
        router.push(`/${page}`);
    }

    return (
        <div className={styles.bottom}>
            <div className={styles.links}>
                <div className={styles.btn_row}>
                    <h4 onClick={() => redirectToPage("faq")}>Perguntas Frequêntes</h4>
                    <h4 onClick={() => redirectToPage("suporte")}>Suporte</h4>
                </div>
                <div className={styles.btn_row}>
                    <h4 onClick={() => redirectToPage("privacidade")}>Política de Privacidade</h4>
                    <h4 onClick={() => redirectToPage("termos-de-uso")}>Termos de Uso</h4>
                </div>
                <div className={styles.btn_row}>
                    <h4 onClick={() => redirectToPage("planos")}>Planos de Assinatura</h4>
                    <h4 onClick={() => redirectToPage("catalogo")}>Catálogo Completo</h4>
                </div>
            </div>
            <div className={styles.btn_row}>
                <div className={styles.brand}>
                    <h1 className="red">FLiX</h1>
                    <h1 className="white">NEXT</h1>
                </div>
                <div className={styles.socials}>
                    <Link href="https://www.themoviedb.org/?language=pt-BR" target="_blank" rel="noopener noreferrer">
                        <button title="TMDB" type="button">
                            <SiThemoviedatabase size={35} />
                        </button>
                    </Link>
                    <Link href="https://github.com/NanoThecnolog" target="_blank" rel="noopener noreferrer">
                        <button title="github" type="button">
                            <FaGithub size={35} />
                        </button>
                    </Link>
                    <Link href="https://www.instagram.com/ericsson.costagomes/" target="_blank" rel="noopener noreferrer">
                        <button title="instagram" type="button">
                            <FaInstagram size={35} />
                        </button>
                    </Link>
                    <Link href="https://www.linkedin.com/in/ericssongomes/" target="_blank" rel="noopener noreferrer">
                        <button title="linkedin" type="button">
                            <FaLinkedin size={35} />
                        </button>
                    </Link>
                </div>
            </div>
            <div className={styles.btn_row}>
                <p>©2024 Flixnext, Inc.</p>
            </div>
        </div>
    )
}