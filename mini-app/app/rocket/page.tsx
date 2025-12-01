"use client";

import RocketGame from "@/components/rocket-game";

export default function RocketPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl mb-4">Rocket Escape</h1>
      <RocketGame />
    </main>
  );
}
