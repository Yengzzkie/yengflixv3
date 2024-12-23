import "./globals.css";
import Navigation from "./components/Navbar";
import NavigationLogin from "./components/NavbarLogin";
import { getServerSession } from "next-auth";

export const metadata = {
  title: "Yengflix V3",
  description: "A free movie-streaming app where you can browse and stream your favorite movies and TV shows",
  keywords: "yengflix, movie streaming, free watch, free streaming",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className="bg-[var(--background)]">
        {session ? <Navigation /> : <NavigationLogin />}
        <main>{children}</main>
      </body>
    </html>
  );
}
