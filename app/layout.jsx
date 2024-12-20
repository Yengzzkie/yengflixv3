import "./globals.css";
import Navigation from "./components/Navbar";

export const metadata = {
  title: "Yengflix V3",
  description: "A free movie-streaming app where you can browse and stream your favorite movies and tv shows",
  keywords: "yengflix, movie streaming, free watch, free streaming",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[var(--background)]">
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  )
}