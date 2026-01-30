import React, { useEffect, useState } from "react";
import heart from "./assets/images/heart.png";
import dinosaur from "./assets/images/dinosaur.png";
import cd from "./assets/images/cd.png";
import folder from "./assets/images/folder.png";
import sparkle from "./assets/images/sparkle.png";
import globe from "./assets/images/globe.png";
import message from "./assets/images/message.png";
import envelope from "./assets/images/envelope.png";
import computer from "./assets/images/Loading....png";
import "@fontsource/press-start-2p";
import profile from "./assets/images/profile.png";

import "./App.css";

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
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [target, setTarget] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [focused, setFocused] = useState(false);
  const [scrollLocked, setScrollLocked] = useState(true);

  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    setTarget({ x, y });
  };

  const reset = () => {
    setTarget({ x: 0, y: 0 });
  };

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

  useEffect(() => {
    const handleScroll = () => {
      if (scrollLocked) {
        const scrollY = window.scrollY;
        const newScale = 1 + scrollY / 250;
        setScale(newScale);

        if (newScale > 5) {
          setFocused(true);
          // Unlock scroll after zoom completes
          setTimeout(() => {
            setScrollLocked(false);
            window.scrollTo(0, 0); // Reset scroll position
          }, 700); // Match the transition duration
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollLocked]);

  return (
    <div
      className="relative overflow-x-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={{
        backgroundColor: "#faf8a2ff",
        height: scrollLocked ? "300vh" : "auto",
        minHeight: "100vh",
      }}
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
            pointerEvents: focused ? "none" : "auto",
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
          pointerEvents: focused ? "none" : "auto",
        }}
        width={600}
        height={500}
      />

      {/* COLOR TAKEOVER */}
   {/* COLOR TAKEOVER */}
<div
  className={`fixed inset-0 z-20 transition-all duration-700 ${focused ? "animate-gradient" : ""}`}
  style={{
    backgroundColor: "#709f64", // Fallback color
    opacity: focused ? 1 : 0,
    pointerEvents: "none",
  }}
/>

      {/* NAVBAR */}
      <nav
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-700"
        style={{
          opacity: focused ? 1 : 0,
          transform: focused ? "translateY(0)" : "translateY(-100%)",
          backgroundColor: "#d1cc65ff",
          marginTop: "20px",
          marginLeft: "20px",
          marginRight: "20px",
          borderRadius: "20px",
          color: "000",
          padding: "10px 10px",
          border: "2px solid black",
        }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="font-bold text-xl">Portfolio</div>
          <ul className="flex gap-8 " style={{color:"#200606ff"}}>
            <li>
              <a
                href="#about"
                className="hover:text-white transition-colors duration-300"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className="hover:text-white transition-colors duration-300"
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="#skills"
                className="hover:text-white transition-colors duration-300"
              >
                Skills
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="hover:text-white transition-colors duration-300"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* ABOUT ME CONTENT */}
      <div id="about"
        className="transition-all duration-700"
        style={{
          opacity: focused ? 1 : 0,
          transform: focused ? "translateY(0)" : "translateY(40px)",
          paddingTop: "120px",
          paddingBottom: "60px",
          position: scrollLocked ? "fixed" : "relative",
          inset: scrollLocked ? "0" : "auto",
          zIndex: 30,
          display: "flex",
          alignItems: scrollLocked ? "center" : "flex-start",
          justifyContent: "center",
          minHeight: scrollLocked ? "100vh" : "auto",
        }}
      >
        <div className="max-w-6xl px-8 w-full">
         

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            
             
            }}
          >
           
<div>
               <span
            className="text-6xl font-bold tracking-wide mb-12"
            style={{ textAlign: "center", color:"#2d4228" }}
          >
         Hi, I'm  <br /> <span style={{color:" #f1f5ef"}}>Vaishnavi Dongre</span>  <br />
         <span style={{textShadow:"2px 1px 1px #3d403dc3"}}> Full Stack Developer</span>
          </span>
               
               </div>
               <img
              src={profile}
              alt="profile"
              style={{

                float:"right",
                marginRight:"-200px",
                width: "491px",
                height: "446px",
                borderRadius:"100%",
                boxShadow: ""
               
                

                
              
             
              }}
            />
          </div>
 
          {/* Additional content sections - only visible after scroll unlocked */}
          {!scrollLocked && (
            <div className="mt-20">
              <section id="projects" className="mb-20">
                <h2 className="text-4xl font-bold text-white mb-8 text-center">
                  Projects
                </h2>
                <div className="text-white text-lg leading-relaxed">
                
                  <p className="text-center">Your projects will go here...</p>
                </div>
              </section>

              <section id="skills" className="mb-20">
                <h2 className="text-4xl font-bold text-white mb-8 text-center">
                  Skills
                </h2>
                <div className="text-white text-lg leading-relaxed">
                  {/* Add your skills content here */}
                  <p className="text-center">Your skills will go here...</p>
                </div>
              </section>

              <section id="contact" className="mb-20">
                <h2 className="text-4xl font-bold text-white mb-8 text-center">
                  Contact
                </h2>
                <div className="text-white text-lg leading-relaxed">
                
                  <p className="text-center">Your contact info will go here...</p>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Layout;
