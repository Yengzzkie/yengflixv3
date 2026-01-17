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
  keywords: "yengflix, movie streaming, free watch, free streaming, watch free movies",
  referrer: "origin",
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