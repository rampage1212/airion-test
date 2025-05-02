import type { Metadata } from "next";
import localFont from "next/font/local";
// import "./globals.css";
import { ChakraProvider } from '../providers/ChakraProvider';
import Navbar from '../components/Navbar';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: 'Task Management App',
  description: 'Manage your tasks efficiently',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ChakraProvider>
          <Navbar />
          <main style={{ padding: '2rem' }}>
            {children}
          </main>
        </ChakraProvider>
      </body>
    </html>
  );
}
