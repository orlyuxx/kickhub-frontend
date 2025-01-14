import React from "react";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

import Navbar from "./components/navbar";
import Footer from "./components/footer";

// Import Space Grotesk for the title/large text and Inter for the body text
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"], // Importing different weights
  variable: "--font-space-grotesk",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"], // Importing different weights
  variable: "--font-inter",
});

export const metadata = {
  title: "KickHub - Walk Your Way",
  description: "KickHub offers the best shoes for all styles and budgets",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/black-logo.png" />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
