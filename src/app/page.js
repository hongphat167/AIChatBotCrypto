"use client"
import Image from "next/image";
import Chatbox from "./components/Chatbot";

export default function Home() {
  return (
      <main className="flex h-screen flex-col items-center justify-center">
          <Chatbox/>
      </main>
  );
}
