import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

export default function Footer() {
    return (
        <div className="bottom">
            <div className="btn-row">
                <h4>Suporte ao assinante</h4>
                <h4>Política de Privacidade</h4>
                <h4>Entre em Contato</h4>
            </div>
            <div className="btn-row">
                <h4>Termos de uso</h4>
                <h4>Faça parte do nosso time</h4>
                <h4>Avisos Legais</h4>
            </div>
            <div className="btn-row">
                <div className="brand">
                    <h1 className="red">FLiX</h1>
                    <h1 className="white">NET</h1>
                </div>
                <div className="socials">
                    <button title="github" type="button">
                        <FaGithub size={35} color="#fff" />
                    </button>
                    <button title="instagram" type="button">
                        <FaInstagram size={35} color="#fff" />
                    </button>
                    <button title="linkedin" type="button">
                        <FaLinkedin size={35} color="#fff" />
                    </button>
                </div>
            </div>
            <div className="btn-row">

                <p>© 2023 Flixnet, Inc.</p>
            </div>
        </div>
    )
}