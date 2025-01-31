import "./globals.css";
import Navigation from "./components/Navbar";
import NavigationLogin from "./components/NavbarLogin";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { auth } from "./auth";
import { Provider } from "./components/Provider";
import Head from "next/head";

export const metadata = {
  title: "Yengflix V3",
  description:
    "A free movie-streaming app where you can browse and stream your favorite movies and TV shows",
  keywords: "yengflix, movie streaming, free watch, free streaming",
  referrer: "origin",
  other: {
    "google-adsense-account": "ca-pub-6259607195377617",
  },
};

export default async function RootLayout({ children }) {
  const session = await auth();
  // console.log(session)

  return (
    <html lang="en">
      <Head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6259607195377617"
          crossorigin="anonymous"
        ></script>
      </Head>
      <link rel="icon" href="/favicon.png" />
      <body className="bg-[var(--background)]">
        <Provider>
          {session ? <Navigation session={session} /> : <NavigationLogin />}
          <main>{children}</main>
        </Provider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
