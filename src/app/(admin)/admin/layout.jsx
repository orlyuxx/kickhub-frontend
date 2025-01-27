import { Space_Grotesk, Inter } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-space-grotesk",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-inter",
});

export const metadata = {
  title: "KickHub Admin",
  description: "KickHub Admin Dashboard",
};

export const dynamic = "force-static";

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}
      >
        {children} {/* Only render children, no Navbar or Footer */}
      </body>
    </html>
  );
}
