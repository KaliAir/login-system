import { Inter } from "next/font/google";
import "./globals.css";
import "normalize.css";
import NextAuthProvider from "@/nextAuthProvider/nextAuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Inventory",
  description: "Inventory System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <NextAuthProvider>
            {children}
          </NextAuthProvider>
      </body>
    </html>
  );
}
