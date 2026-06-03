// pages/_app.js
import '../styles/globals.css';
import { Poppins, Playfair_Display } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-playfair',
});

export default function App({ Component, pageProps }) {
  return (
    <main className={`${poppins.variable} ${playfair.variable}`}>
      <Component {...pageProps} />
    </main>
  );
}
