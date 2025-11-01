"use client";
import { useState } from "react";
import Table from "./table";
import Link from "next/link";
import Header from "./components/header";
import NavbarMain from "./components/navbarMain";

export default function Home() {
  return (
    <main className="bg-gray-100 min-h-screen">
      <Header />
      <NavbarMain />
      <Link href="/Login" className="text-blue-500 hover:underline">
        Login
      </Link>
      <Link href="/testcolor" className="ml-4 text-blue-500 hover:underline">
        TestColor
      </Link>
    </main>
  );
}
