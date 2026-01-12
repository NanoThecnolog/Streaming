import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { TMDBProvider } from "@/contexts/TMDBContext";
import { useEffect, useRef } from "react";
import ErrorBoundary from "@/components/Errors/ErrorBoundary";
import { FlixProvider } from "@/contexts/FlixContext";
import Router, { useRouter } from "next/router";
import NProgress from "nprogress"
import "nprogress/nprogress.css";
import { Functions } from "@/classes/Functions";
import axios from "axios";
import { pageview } from "@/utils/gtag";


export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter()

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return

    const trackingRoute = (url: string) => {

      pageview(url)

      axios.post('/api/track', { path: url }).catch(() => { })
    }
    trackingRoute(router.asPath)

    router.events.on('routeChangeComplete', trackingRoute)

    return () => {
      router.events.off('routeChangeComplete', trackingRoute)
    }
  }, [])


  useEffect(() => {
    console.clear()

    if (process.env.NODE_ENV === 'production') {
      console.log(
        '%cATENÇÃO!',
        'font-size: 48px; font-weight: bold; color: #ff3040;'
      )
      console.log(
        '%cEssa área é destinada a desenvolvedores. \n' +
        'Colar código aqui é uma violação dos termos de uso e pode permitir que outras pessoas assumam sua conta. \n' +
        'Não faça isso!',
        'font-size: 16px; color: #ccc;'
      )
    }
  }, [])


  useEffect(() => {
    if (process.env.NEXT_PUBLIC_DEBUG === "development") return
    function rightClickBlock(event: MouseEvent) { event.preventDefault(); }

    function openConsoleBlock(event: KeyboardEvent) {
      const blockedKeys = ['F12']
      if (
        blockedKeys.includes(event.key) ||
        (event.ctrlKey && event.shiftKey && ['I', 'J', 'C'].includes(event.key)) ||
        (event.ctrlKey && event.key === 'u')
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
  }, [])

  useEffect(() => {
    Router.events.on("routeChangeStart", () => NProgress.start())
    Router.events.on("routeChangeComplete", () => NProgress.done())
    Router.events.on("routeChangeError", () => NProgress.done())

  }, [])



  return (
    <ErrorBoundary>
      <FlixProvider>
        <TMDBProvider>
          <Component {...pageProps} />
          <ToastContainer autoClose={3500} />

        </TMDBProvider>
      </FlixProvider>
    </ErrorBoundary>
  )
}
