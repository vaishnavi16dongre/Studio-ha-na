import React, { useEffect, useState } from "react";
import heart from "./assets/images/heart.png";
import dinosaur from "./assets/images/dinosaur.png";
import cd from "./assets/images/cd.png";
import folder from "./assets/images/folder.png";
import sparkle from "./assets/images/sparkle.png";
import globe from "./assets/images/globe.png";
import message from "./assets/images/message.png";
import envelope from "./assets/images/envelope.png";
import computer from "./assets/images/computer.png";

const icons = [
  heart,
  dinosaur,
  message,
  sparkle,
  globe,
  folder,
  cd,
  envelope,
];

const positions = [
  { top: 200, left: 100 },
  { top: 60, left: 450 },
  { top: 120, left: 600 },
  { top: 350, left: 250 },
  { top: 500, left: 100 },
  { top: 80, left: 1200 },
  { top: 300, left: 1000 },
  { top: 550, left: 1200 },
];

function Layout() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });      // actual position
  const [target, setTarget] = useState({ x: 0, y: 0 });      // cursor target
  const [scale, setScale] = useState(1);
  const [focused, setFocused] = useState(false);

  // 🧲 CURSOR TARGET (no direct movement)
  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    setTarget({ x, y });
  };

  const reset = () => {
    setTarget({ x: 0, y: 0 });
  };

  // ✨ SMOOTH LAG ANIMATION (magic)
  useEffect(() => {
    let frame;

    const animate = () => {
      setOffset((prev) => ({
        x: prev.x + (target.x - prev.x) * 0.08,
        y: prev.y + (target.y - prev.y) * 0.08,
      }));

      frame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(frame);
  }, [target]);

  // 🔥 SCROLL → SCALE → FOCUS
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newScale = 1 + scrollY / 250;
      setScale(newScale);

      setFocused(newScale > 5);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="relative h-[300vh] overflow-x-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={{backgroundColor: "#34a6c9ff"}}
    >
      {/* ICONS (with delayed cursor follow) */}
      {icons.map((icon, index) => (
        <img
          key={index}
          src={icon}
          alt="icon"
          className="absolute w-14 h-14 transition-opacity duration-700"
          style={{
            top: positions[index].top,
            left: positions[index].left,
            opacity: focused ? 0 : 1,
            transform: `translate(${offset.x * (index + 1) * 0.1}px, ${
              offset.y * (index + 1) * 0.1
            }px)`,
          }}
        />
      ))}

      {/* COMPUTER IMAGE */}
      <img
        src={computer}
        alt="computer"
        className="fixed top-1/2 left-1/2 z-30 transition-all duration-700 ease-out"
        style={{
          transform: `translate(-50%, -40%) scale(${scale})`,
          opacity: focused ? 0 : 1,
        }}
        width={600}
        height={500}
      />

      {/* COLOR TAKEOVER */}
      <div
        className="fixed inset-0 z-20 transition-all duration-700 "
        style={{
          backgroundColor: "#70a363",
          opacity: focused ? 1 : 0,
        }}
      />
      

      {/* TEXT REVEAL */}
      <div
        className="fixed inset-0 z-30 flex items-center justify-center transition-all duration-700"
        style={{
          opacity: focused ? 1 : 0,
          transform: focused ? "translateY(0)" : "translateY(40px)",
        }}
      >
        <h1 className="text-6xl font-bold text-white tracking-wide">
          HELLO WORLD
        </h1>
      </div>
    </div>
  );
}

export default Layout;
