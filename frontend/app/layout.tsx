"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { Providers } from '../components/providers';

const inter = Inter({ subsets: ["latin"] });

const wallets = [new PetraWallet()];


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* <body className={inter.className}> */}
      <Providers>
        <body>
        {children}
        </body>
      </Providers>
      {/* </body> */}
    </html>
  );

}