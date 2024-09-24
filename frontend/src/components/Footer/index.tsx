import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import styles from './styles.module.scss'
import Router from "next/router";

export default function Footer() {

    function handleFAQ() {
        Router.push('/faq');
    }
    function handleSignUp() {
        Router.push('/signup')
    }
    function handlePrivacy() {
        Router.push('/privacidade')
    }
    return (
        <div className={styles.bottom}>
            <div className={styles.links}>
                <div className={styles.btn_row}>
                    <h4 onClick={handleFAQ}>Perguntas Frequêntes</h4>
                    <h4 onClick={handleSignUp}>Criar Conta</h4>
                </div>
                <div className={styles.btn_row}>
                    <h4 onClick={handlePrivacy}>Política de Privacidade</h4>
                    <h4>Suporte</h4>
                </div>
                <div className={styles.btn_row}>
                    <h4>Faça uma doação</h4>
                    <h4>Entre em Contato</h4>
                </div>
            </div>
            <div className={styles.btn_row}>
                <div className={styles.brand}>
                    <h1 className="red">FLiX</h1>
                    <h1 className="white">NEXT</h1>
                </div>
                <div className={styles.socials}>

                    <Link href="https://github.com/NanoThecnolog">
                        <button title="github" type="button">
                            <FaGithub size={35} />
                        </button>
                    </Link>
                    <Link href="https://www.instagram.com/ericsson.costagomes/">
                        <button title="instagram" type="button">
                            <FaInstagram size={35} />
                        </button>
                    </Link>
                    <Link href="https://www.linkedin.com/in/ericssongomes/">
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