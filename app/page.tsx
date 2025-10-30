"use client";
import { useState } from "react";
import Table from "./table";

export default function Home() {
  const [username, setUsername] = useState("");
  const a = [1, 2, 3, 4, 5];
  return (
    <div>
      <h1>Welcome to Coursedan</h1>
      <p className="font-bold">Tên Đăng nhập:</p>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Table />
    </div>
  );
}
