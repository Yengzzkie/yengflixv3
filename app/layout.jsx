import "./globals.css";
import Navigation from "./components/Navbar";
import NavigationLogin from "./components/NavbarLogin";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { auth } from "./auth";
import { Provider } from "./components/Provider";

export const metadata = {
  title: "Yengflix V3",
  description:
    "A free movie-streaming app where you can browse and stream your favorite movies and TV shows",
  keywords: "yengflix, movie streaming, free watch, free streaming",
  referrer: "origin",
  monetag: "dc0684cd53ee11349c73cf9bcf7846ad",
  other: {
    "google-adsense-account": "ca-pub-6259607195377617",
  },
  openGraph: {
    title: "Yengflix V3",
    description:
      "A free movie-streaming app where you can browse and stream your favorite movies and TV shows",
    url: "https://yengflix.com",
    siteName: "Yengflix",
    images: [
      {
        url: "https://image.tmdb.org/t/p/w500/rYC6UyML4CU4zYiZVbDMrwnGyWW.jpg",
        width: 1200,
        height: 630,
        alt: "Yengflix Movie Thumbnail",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yengflix V3",
    description:
      "A free movie-streaming app where you can browse and stream your favorite movies and TV shows",
    images: [
      "https://image.tmdb.org/t/p/w500/rYC6UyML4CU4zYiZVbDMrwnGyWW.jpg",
    ],
  },
};


export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <html lang="en">
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