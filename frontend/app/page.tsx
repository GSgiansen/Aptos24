"use client"
import Image from "next/image";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1>Aptos Ticket Master</h1>
      <WalletSelector />
    </main>
  );
}
