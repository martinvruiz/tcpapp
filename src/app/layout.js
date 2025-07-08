import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Initialize from "@/components/Initialize";
import ToastProvider from "@/components/ToastProvider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-inter",
});

export const metadata = {
  title: "TCP App",
  description: "Log your hours",
  icons: {
    icon: "/airplane_icon.svg",
    apple: "/airplane_icon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <div className="flex md:flex-row flex-col">
          <Initialize />
          <Navbar>
            <ToastProvider />
            {children}
          </Navbar>
        </div>
      </body>
    </html>
  );
}
