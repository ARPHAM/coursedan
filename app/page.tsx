"use client";
import { useState } from "react";
import Table from "./table";
import Link from "next/link";

export default function Home() {
  return (
    <main className="p-8 bg-gray-100 min-h-screen">
      <Link href="/Login" className="text-blue-500 hover:underline">
        Go to Login
      </Link>
    </main>
  );
}
