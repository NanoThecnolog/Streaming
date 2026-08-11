import Link from 'next/link'
import { SiDicebear, SiThemoviedatabase } from 'react-icons/si'
import styles from './styles.module.scss'

interface FooterLink {
  label: string
  href: string
}

const footerSections: FooterLink[][] = [
  [
    {
      label: 'Perguntas Frequentes',
      href: '/faq',
    },
    {
      label: 'Suporte',
      href: '/suporte',
    },
  ],
  [
    {
      label: 'Política de Privacidade',
      href: '/privacidade',
    },
    {
      label: 'Termos de Uso',
      href: '/termos-de-uso',
    },
  ],
  [
    {
      label: 'Planos de Assinatura',
      href: '/planos',
    },
    {
      label: 'Catálogo Completo',
      href: '/catalogo',
    },
  ],
]

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.mainContent}>
          <div className={styles.brandSection}>
            <Link href="/" className={styles.brand} aria-label="Ir para a página inicial">
              <span className={styles.brandFlix}>FLiX</span>
              <span className={styles.brandNext}>NEXT</span>
            </Link>

            <p className={styles.description}>Seus filmes e séries favoritos em um só lugar.</p>
          </div>

          <nav className={styles.navigation} aria-label="Navegação do rodapé">
            {footerSections.map((section, sectionIndex) => (
              <ul key={sectionIndex} className={styles.linkGroup}>
                {section.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            ))}
          </nav>
        </div>

        <div className={styles.divider} />

        <div className={styles.bottomContent}>
          <p className={styles.copyright}>
            © {currentYear} Flixnext, Inc. Todos os direitos reservados.
          </p>
          <div className={styles.bottomIcons}>
            <a
              className={styles.iconLink}
              href="https://www.dicebear.com"
              target="_blank"
              rel="noopener noreferrer"

              aria-label="Acessar o site do Dice Bear"
            >
              <SiDicebear size={25} aria-hidden="true" />
            </a>

            <a
              className={styles.iconLink}
              href="https://www.themoviedb.org/?language=pt-BR"
              target="_blank"
              rel="noopener noreferrer"

              aria-label="Acessar o site do The Movie Database"
            >
              <SiThemoviedatabase size={25} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
