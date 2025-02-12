import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { TMDBProvider } from "@/contexts/TMDBContext";
import { useEffect } from "react";
import ErrorBoundary from "@/components/Errors/ErrorBoundary";
import { FlixProvider } from "@/contexts/FlixContext";
//import { SpeedInsights } from '@vercel/speed-insights/next';
//import { Analytics } from '@vercel/analytics/next';

export default function App({ Component, pageProps }: AppProps) {

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_DEBUG === "development") return
    function rightClickBlock(event: MouseEvent) { event.preventDefault(); }

    // Impede atalhos de ferramentas de desenvolvedor
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

  return (
    <ErrorBoundary>
      <FlixProvider>
        <TMDBProvider>
          <Component {...pageProps} />
          <ToastContainer autoClose={3000} />
        </TMDBProvider>
      </FlixProvider>
    </ErrorBoundary>
  )
}
