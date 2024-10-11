import Head from "next/head";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import CardContainer from "@/components/CardContainer";
import Footer from "@/components/Footer";
//import WatchLater from "@/components/modals/WatchLater";
import { useEffect, useState } from "react";
import Top from "@/components/Top";

import styles from "@/styles/Home.module.scss";
import Search from "@/components/Searching";
import { getCookieClient } from "@/services/cookieClient";
import { UserProps } from "@/@types/user";
import { GetServerSideProps } from "next";
import { serverStatus } from "@/services/verifyStatusServer";

const inter = Inter({ subsets: ["latin"] });


export default function Home(status: { status: string }) {
  const [cardPerContainer, setCardPerContainer] = useState<number>(5)
  const [width, setWidth] = useState<number>()
  const userData: UserProps = getCookieClient();
  const divisaoPorGenero = [
    "ação",
    "aventura",
    "suspense",
    "comédia",
    "terror",
    "romance",
    "super herói",
    "drama",
    "ficção científica",
    "fantasia",
    "marvel",
    "dc",
    "animação"
  ]

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      setWidth(width)

      // Ajustar os breakpoints
      if (width < 780) {
        setCardPerContainer(1)
      } else if (width < 1100) {
        setCardPerContainer(2)
      } else if (width < 1480) {
        setCardPerContainer(3)
      } else if (width < 1650) {
        setCardPerContainer(4)
      } else {
        setCardPerContainer(5)
      }

    }
    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])
  useEffect(() => {

    const rightClickBlock = (event: MouseEvent) => {
      event.preventDefault();
    };

    // Impede atalhos de ferramentas de desenvolvedor
    const openConsoleBlock = (event: KeyboardEvent) => {

      if (
        event.key === 'F12' ||
        (event.ctrlKey && event.shiftKey && event.key === 'I') ||
        (event.ctrlKey && event.shiftKey && event.key === 'C') ||
        (event.ctrlKey && event.shiftKey && event.key === 'J') ||
        (event.ctrlKey && event.key === 'U')
      ) {
        event.preventDefault();
      }
    };

    document.addEventListener('contextmenu', rightClickBlock);
    document.addEventListener('keydown', openConsoleBlock);

    return () => {
      document.removeEventListener('contextmenu', rightClickBlock);
      document.removeEventListener('keydown', openConsoleBlock);
    };
  }, []);

  return (
    <>
      <Head>
        <title>FlixNext - Início</title>
        <meta name="description" content="Um Streaming nunca antes visto porque é novo." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header userAvatar={userData?.avatar} status={status} />
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.content}>
          <Top width={width} />
          <div className={styles.mid}>
            {divisaoPorGenero.map((sec, index) => (
              <div key={index}>
                <CardContainer
                  section={sec}
                  cardPerContainer={cardPerContainer}
                />
                {index === 1 && cardPerContainer >= 2 && <Search />}
              </div>
            )
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async () => {
  async function fetchServerStatus() {
    const status = await serverStatus();
    return status
  }
  const status = await fetchServerStatus()
  return {
    props: {
      status
    }
  }
}
