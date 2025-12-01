"use client";

import { useEffect, useRef, useState } from "react";

export default function RocketGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rocketY, setRocketY] = useState(350);
  const [velocity, setVelocity] = useState(0);
  const [gravity, setGravity] = useState(0.5);
  const [thrust, setThrust] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw black hole
      ctx.fillStyle = "#000";
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height, 120, 0, Math.PI * 2);
      ctx.fill();

      // Update physics
      setVelocity((v) => v + gravity - thrust);
      setRocketY((y) => Math.max(0, Math.min(canvas.height - 50, y + velocity)));

      // Draw rocket
      ctx.fillStyle = "#ff0000";
      ctx.fillRect(canvas.width / 2 - 10, rocketY, 20, 50);

      // Draw flame
      if (thrust > 0) {
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 - 10, rocketY + 50);
        ctx.lineTo(canvas.width / 2, rocketY + 70);
        ctx.lineTo(canvas.width / 2 + 10, rocketY + 50);
        ctx.fill();
      }

      requestAnimationFrame(animate);
    };

    animate();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") setThrust(0.5);
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space") setThrust(0);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gravity, thrust]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={400}
      className="border rounded"
    />
  );
}
