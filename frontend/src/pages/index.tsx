import Head from "next/head";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import CardContainer from "@/components/CardContainer";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import Top from "@/components/Top";
import styles from "@/styles/Home.module.scss";
import Search from "@/components/Searching";
import { getCookieClient } from "@/services/cookieClient";
import { UserProps } from "@/@types/user";
import { GetServerSideProps } from "next";
import { serverStatus } from "@/services/verifyStatusServer";
import { api } from "@/services/api";
import { clearTimeout } from "timers";
import { setTimeout } from "timers/promises";

const inter = Inter({ subsets: ["latin"] });

export default function Home(status: { status: string }) {
  const [cardPerContainer, setCardPerContainer] = useState<number>(5)
  const [width, setWidth] = useState<number>()
  const userData: UserProps = getCookieClient();
  const expressTime = 15 * 24 * 60 * 60 * 1000;
  const divisaoPorGenero = [
    "ação", "aventura", "suspense", "comédia", "terror",
    "romance", "super herói", "drama", "ficção científica",
    "fantasia", "marvel", "dc", "animação"
  ]
  useEffect(() => {
    getUserData()
  }, [status])
  async function getUserData() {
    const user = getCookieClient();
    if (!user) return;

    try {
      const atualizarUsuario = await api.get('/user', {
        params: {
          id: user.id
        }
      })
      const userJson = JSON.stringify(atualizarUsuario.data)
      document.cookie = `flixnext=${userJson}; path=/; max-age=${expressTime}`
    } catch (err) {
      console.log("Erro ao buscar dados do usuário na API", err)
    }
  }

  useEffect(() => {
    // Breakpoints ajustados
    const breakpoints = [
      { width: 780, cards: 1 },
      { width: 1100, cards: 2 },
      { width: 1500, cards: 3 },
      { width: 1650, cards: 4 },
      { width: Infinity, cards: 5 },
    ]
    //definindo quantidade de cards por container
    function handleResize() {
      const windowWidth = window.innerWidth;
      setWidth(windowWidth)
      const { cards } = breakpoints.find(b => windowWidth < b.width) || { cards: 5 }
      setCardPerContainer(cards)
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  useEffect(() => {
    function rightClickBlock(event: MouseEvent) { event.preventDefault(); }

    // Impede atalhos de ferramentas de desenvolvedor
    function openConsoleBlock(event: KeyboardEvent) {
      const blockedKeys = ['F12', 'I', 'C', 'J', 'U']
      if (
        blockedKeys.includes(event.key) ||
        (event.ctrlKey && event.shiftKey && blockedKeys.includes(event.key)) ||
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
