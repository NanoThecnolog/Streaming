import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import { TMDBProvider } from "@/contexts/TMDBContext";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
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
  }, [])

  return (
    <TMDBProvider>
      <Component {...pageProps} />
      <ToastContainer autoClose={3000} />
    </TMDBProvider>
  )
}
