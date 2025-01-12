import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import { TMDBProvider } from "@/contexts/TMDBContext";

export default function App({ Component, pageProps }: AppProps) {

  return (
    <TMDBProvider>
      <Component {...pageProps} />
      <SpeedInsights />
      <Analytics />
      <ToastContainer autoClose={3000} />
    </TMDBProvider>
  )
}
