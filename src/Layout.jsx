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
import project from "./assets/images/project.png";
import project1 from "./assets/images/project1.png";
import "./App.css";

// --- SKILL COMPONENTS ---

const SkillCounter = ({ target, isVisible }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (isVisible) {
      let start = 0;
      const end = parseInt(target);
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isVisible, target]);
  
  return <span>{count}</span>;
};

// --- DATA ---

const frontendSkills = [
  { name: "React", level: 85, icon: sparkle, desc: "UI Library", color: "#59EAFF" },
  { name: "Tailwind", level: 95, icon: message, desc: "CSS Framework", color: "#38b2ac" },
  { name: "Figma", level: 75, icon: cd, desc: "Design Tool", color: "#D959FF" },
];

const backendSkills = [
  { name: "Java", level: 90, icon: heart, desc: "Core Language", color: "#FFDE59" },
  { name: "Spring", level: 80, icon: dinosaur, desc: "Framework", color: "#B1FF59" },
  { name: "SQL", level: 85, icon: globe, desc: "Database", color: "#FF5959" },
];

const projectsData = [
  { title: "E-Commerce Backend", tech: "Java • Spring Boot • MySQL", image: project, link: "#" },
  { title: "Portfolio Website", tech: "React • Tailwind • Framer Motion", image: project1, link: "#" },
  { title: "Banking System", tech: "Java • Hibernate • PostgreSQL", image: project1, link: "#" }
];

const icons = [heart, dinosaur, message, sparkle, globe, folder, cd, envelope];
const positions = [
  { top: 200, left: 100 }, { top: 60, left: 450 }, { top: 120, left: 600 },
  { top: 350, left: 250 }, { top: 500, left: 100 }, { top: 80, left: 1200 },
  { top: 300, left: 1000 }, { top: 550, left: 1200 },
];

function Layout() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [target, setTarget] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [focused, setFocused] = useState(false);
  const [scrollLocked, setScrollLocked] = useState(true);
  const [isProjectsSection, setIsProjectsSection] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [skillsVisible, setSkillsVisible] = useState(false);

  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    setTarget({ x, y });
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const reset = () => setTarget({ x: 0, y: 0 });

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
          setTimeout(() => {
            setScrollLocked(false);
            window.scrollTo(0, 0);
          }, 700);
        }
      } else {
        const projectsSection = document.getElementById("projects");
        const skillsSection = document.getElementById("skills");
        
        if (projectsSection) {
          const rect = projectsSection.getBoundingClientRect();
          setIsProjectsSection(rect.top < window.innerHeight / 2);
        }
        
        if (skillsSection) {
          const rect = skillsSection.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.7 && rect.bottom > 0) {
            setSkillsVisible(true);
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollLocked]);

  const themeDark = "#07220e";
  const themeCream = "#FFFDD0";
  const themeGreen = "#7ba171";

  return (
    <div
      className="relative overflow-x-hidden cursor-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={{
        backgroundColor: "#faf8a2ff",
        height: scrollLocked ? "300vh" : "auto",
        minHeight: "100vh",
      }}
    >
      {/* CUSTOM CURSOR */}
      <div 
        className="fixed top-0 left-0 pointer-events-none z-[9999] transition-transform duration-75 ease-out md:block hidden"
        style={{
          width: "40px", height: "40px", borderRadius: "50%",
          transform: `translate(${mousePos.x - 20}px, ${mousePos.y - 20}px)`,
          backgroundColor: isProjectsSection ? themeDark : themeCream,
          mixBlendMode: "difference",
          border: "1px solid rgba(255,255,255,0.5)"
        }}
      />

      {/* FLOATING ICONS */}
      {icons.map((icon, index) => (
        <img key={index} src={icon} alt="icon" className="absolute w-14 h-14 transition-opacity duration-700"
          style={{
            top: positions[index].top, left: positions[index].left,
            opacity: focused ? 0 : 1,
            transform: `translate(${offset.x * (index + 1) * 0.1}px, ${offset.y * (index + 1) * 0.1}px)`,
            pointerEvents: focused ? "none" : "auto",
          }}
        />
      ))}

      {/* CENTER COMPUTER */}
      <img src={computer} alt="computer" className="fixed top-1/2 left-1/2 z-30 transition-all duration-700 ease-out"
        style={{ transform: `translate(-50%, -40%) scale(${scale})`, opacity: focused ? 0 : 1, pointerEvents: focused ? "none" : "auto" }}
        width={600} height={500}
      />

      {/* BACKGROUND OVERLAY */}
      <div className="fixed inset-0 z-20 transition-all duration-1000"
        style={{ backgroundColor: isProjectsSection ? themeCream : themeGreen, opacity: focused ? 1 : 0, pointerEvents: "none" }}
      />

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-40 transition-all duration-700"
        style={{ opacity: focused ? 1 : 0, transform: focused ? "translateY(0)" : "translateY(-100%)", backgroundColor: "#fffb89ff", margin: "20px", borderRadius: "20px", color: "#000", padding: "10px 30px", border: "2px solid black" }}>
        <div className="max-w-7xl mx-auto flex justify-between items-center font-bold">
          <div className="text-xl tracking-tighter">V.DONGRE</div>
          <ul className="flex gap-8 text-sm uppercase tracking-widest">
            <li><a href="#about" className="hover:text-white">About</a></li>
            <li><a href="#projects" className="hover:text-white">Projects</a></li>
            <li><a href="#skills" className="hover:text-white">Skills</a></li>
            <li><a href="#contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* CONTENT */}
      <div id="about" className="transition-all duration-700"
        style={{ opacity: focused ? 1 : 0, paddingTop: "120px", position: scrollLocked ? "fixed" : "relative", zIndex: 30, width: "100%" }}>
        <div className="max-w-6xl mx-auto px-8">
          
          {/* HERO SECTION */}
          <div className="flex flex-col md:flex-row items-center justify-between min-h-[80vh] gap-12">
            <div className="flex-1">
              <h1 className="text-7xl font-bold leading-none mb-6" style={{ color: themeDark }}>Hi, I'm <br />
                <span style={{ color: "#025805", fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400 }}>Vaishnavi Dongre</span>
              </h1>
              <h2 className="text-2xl tracking-widest uppercase mb-6 opacity-80" style={{ color: themeDark }}>Full Stack Developer</h2>
              <p className="max-w-md text-lg leading-relaxed" style={{ color: themeDark }}>Crafting seamless digital experiences with a blend of Java backend efficiency and creative frontend aesthetics.</p>
            </div>
            <div className="relative">
              <img src={profile} alt="profile" className="w-96 h-96 rounded-full object-cover border-4 border-black shadow-[15px_15px_0px_0px_rgba(0,0,0,0.1)]" />
            </div>
          </div>

          {!scrollLocked && (
            <div className="pb-40">
              {/* PROJECTS SECTION */}
              <section id="projects" className="py-20">
                <h3 className={`text-6xl font-bold mb-16 transition-colors duration-700 ${isProjectsSection ? "text-[#07220e]" : "text-white"}`} 
                    style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", textAlign: "center" }}>Selected Works</h3>
                <div className="grid md:grid-cols-3 gap-8">
                  {projectsData.map((proj, i) => (
                    <div key={i} className={`p-4 border-2 border-black rounded-3xl transition-all duration-500 hover:-translate-y-2 ${isProjectsSection ? "bg-white/50" : "bg-black/10 text-white"}`}>
                      <div className="h-48 bg-gray-200 rounded-xl mb-4 overflow-hidden border border-black group relative">
                        <img src={proj.image} alt={proj.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      </div>
                      <h4 className="text-xl font-bold mb-2 uppercase tracking-tighter">{proj.title}</h4>
                      <p className="opacity-80 mb-4 font-medium text-sm">{proj.tech}</p>
                      <button className="text-sm font-bold underline underline-offset-4 hover:opacity-50">VIEW CASE STUDY</button>
                    </div>
                  ))}
                </div>
              </section>

              {/* SKILLS SECTION */}
              <section id="skills" className="min-h-screen flex items-center justify-center py-32 relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/4 right-20 w-96 h-96 rounded-full opacity-20 blur-3xl animate-pulse"
                    style={{ backgroundColor: isProjectsSection ? '#59EAFF' : '#B1FF59', animationDuration: '3s' }} />
                  <div className="absolute bottom-1/4 left-20 w-96 h-96 rounded-full opacity-20 blur-3xl animate-pulse"
                    style={{ backgroundColor: isProjectsSection ? '#D959FF' : '#FFDE59', animationDuration: '3s', animationDelay: '1.5s' }} />
                </div>

                <div className="max-w-4xl w-full relative z-10">
                  {/* Section Header */}
                  <div className="text-center mb-20">
                    <h2 className={`text-6xl md:text-7xl font-bold mb-3 transition-colors duration-700 ${isProjectsSection ? "text-[#07220e]" : "text-white"}`}
                        style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic" }}>
                      Skills
                    </h2>
                    <p className={`text-lg ${isProjectsSection ? "text-black/60" : "text-white/70"}`}>
                      My technical expertise
                    </p>
                  </div>

                  {/* Frontend Skills */}
                  <div className="mb-16">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="h-px flex-1 transition-colors duration-700"
                        style={{ backgroundColor: isProjectsSection ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.3)' }} />
                      <h3 className={`text-2xl font-black uppercase tracking-[0.3em] ${isProjectsSection ? "text-black/50" : "text-white/50"}`}>
                        // Frontend
                      </h3>
                      <div className="h-px flex-1 transition-colors duration-700"
                        style={{ backgroundColor: isProjectsSection ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.3)' }} />
                    </div>

                    <div className="space-y-8 max-w-2xl mx-auto">
                      {frontendSkills.map((skill, index) => (
                        <div key={skill.name} className="group"
                          style={{ 
                            opacity: skillsVisible ? 1 : 0,
                            transform: skillsVisible ? 'translateY(0)' : 'translateY(20px)',
                            transition: `all 0.6s ease-out ${index * 0.1}s`
                          }}>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg border-2 border-black flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                                style={{ 
                                  backgroundColor: isProjectsSection ? `${skill.color}20` : 'rgba(255,255,255,0.1)',
                                  borderColor: isProjectsSection ? skill.color : 'rgba(255,255,255,0.3)'
                                }}>
                                <img src={skill.icon} alt={skill.name} className="w-5 h-5 object-contain"
                                  style={{ filter: isProjectsSection ? 'none' : 'brightness(0) invert(1)' }} />
                              </div>
                              <span className={`text-xl font-bold uppercase tracking-tight transition-colors duration-300 ${isProjectsSection ? "text-black group-hover:text-black/70" : "text-white group-hover:text-white/70"}`}>
                                {skill.name}
                              </span>
                            </div>
                            <span className="text-2xl font-black tabular-nums" style={{ color: skill.color }}>
                              <SkillCounter target={skill.level} isVisible={skillsVisible} />%
                            </span>
                          </div>

                          {/* Progress Bar */}
                          <div className="w-full h-3 rounded-full overflow-hidden border-2 border-black"
                            style={{ backgroundColor: isProjectsSection ? 'rgba(0,0,0,0.05)' : 'rgba(0,0,0,0.3)' }}>
                            <div className="h-full transition-all duration-[1500ms] ease-out"
                              style={{
                                width: skillsVisible ? `${skill.level}%` : '0%',
                                backgroundColor: skill.color,
                                boxShadow: `0 0 20px ${skill.color}60`
                              }} />
                          </div>

                          {/* Description */}
                          <p className={`mt-2 text-sm font-medium ${isProjectsSection ? "text-black/50" : "text-white/50"}`}>
                            {skill.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Backend Skills */}
                  <div>
                    <div className="flex items-center gap-3 mb-8">
                      <div className="h-px flex-1 transition-colors duration-700"
                        style={{ backgroundColor: isProjectsSection ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.3)' }} />
                      <h3 className={`text-2xl font-black uppercase tracking-[0.3em] ${isProjectsSection ? "text-black/50" : "text-white/50"}`}>
                        // Backend
                      </h3>
                      <div className="h-px flex-1 transition-colors duration-700"
                        style={{ backgroundColor: isProjectsSection ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.3)' }} />
                    </div>

                    <div className="space-y-8 max-w-2xl mx-auto">
                      {backendSkills.map((skill, index) => (
                        <div key={skill.name} className="group"
                          style={{ 
                            opacity: skillsVisible ? 1 : 0,
                            transform: skillsVisible ? 'translateY(0)' : 'translateY(20px)',
                            transition: `all 0.6s ease-out ${(index + 3) * 0.1}s`
                          }}>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg border-2 border-black flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                                style={{ 
                                  backgroundColor: isProjectsSection ? `${skill.color}20` : 'rgba(255,255,255,0.1)',
                                  borderColor: isProjectsSection ? skill.color : 'rgba(255,255,255,0.3)'
                                }}>
                                <img src={skill.icon} alt={skill.name} className="w-5 h-5 object-contain"
                                  style={{ filter: isProjectsSection ? 'none' : 'brightness(0) invert(1)' }} />
                              </div>
                              <span className={`text-xl font-bold uppercase tracking-tight transition-colors duration-300 ${isProjectsSection ? "text-black group-hover:text-black/70" : "text-white group-hover:text-white/70"}`}>
                                {skill.name}
                              </span>
                            </div>
                            <span className="text-2xl font-black tabular-nums" style={{ color: skill.color }}>
                              <SkillCounter target={skill.level} isVisible={skillsVisible} />%
                            </span>
                          </div>

                          {/* Progress Bar */}
                          <div className="w-full h-3 rounded-full overflow-hidden border-2 border-black"
                            style={{ backgroundColor: isProjectsSection ? 'rgba(0,0,0,0.05)' : 'rgba(0,0,0,0.3)' }}>
                            <div className="h-full transition-all duration-[1500ms] ease-out"
                              style={{
                                width: skillsVisible ? `${skill.level}%` : '0%',
                                backgroundColor: skill.color,
                                boxShadow: `0 0 20px ${skill.color}60`
                              }} />
                          </div>

                          {/* Description */}
                          <p className={`mt-2 text-sm font-medium ${isProjectsSection ? "text-black/50" : "text-white/50"}`}>
                            {skill.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Text */}
                  <div className="text-center mt-16"
                    style={{ 
                      opacity: skillsVisible ? 1 : 0,
                      transition: 'opacity 0.8s ease-out 1s'
                    }}>
                    <p className={`text-lg ${isProjectsSection ? "text-black/60" : "text-white/70"}`}>
                      Always learning and exploring new technologies
                    </p>
                  </div>
                </div>
              </section>

              {/* CONTACT SECTION */}
              <section id="contact" className="py-32 mt-20">
                <div className="max-w-5xl mx-auto">
                  {/* Header */}
                  <div className="text-center mb-20">
                    <h3 className={`text-6xl md:text-7xl font-bold mb-4 transition-colors duration-700 ${isProjectsSection ? "text-[#07220e]" : "text-white"}`}
                        style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic" }}>
                      Let's Connect
                    </h3>
                    <p className={`text-lg ${isProjectsSection ? "text-black/60" : "text-white/70"}`}>
                      Available for freelance opportunities and full-time roles
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-12">
                    {/* Left Side - Social Links & Info */}
                    <div className="space-y-8">
                      <div>
                        <h4 className={`text-2xl font-bold mb-6 uppercase tracking-tight ${isProjectsSection ? "text-black" : "text-white"}`}>
                          Connect With Me
                        </h4>
                        
                        {/* Social Links */}
                        <div className="space-y-4">
                          {/* LinkedIn */}
                          <a href="https://www.linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer"
                            className="group flex items-center gap-4 p-4 rounded-2xl border-2 border-black transition-all duration-300 hover:-translate-y-1"
                            style={{ 
                              backgroundColor: isProjectsSection ? 'rgba(255,255,255,0.8)' : 'rgba(7, 34, 14, 0.3)',
                              backdropFilter: 'blur(10px)'
                            }}>
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center border-2 border-black"
                              style={{ backgroundColor: '#0077B5' }}>
                              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                              </svg>
                            </div>
                            <div className="flex-1">
                              <p className={`font-bold ${isProjectsSection ? "text-black" : "text-white"}`}>LinkedIn</p>
                              <p className={`text-sm ${isProjectsSection ? "text-black/60" : "text-white/60"}`}>Connect professionally</p>
                            </div>
                            <svg className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isProjectsSection ? "text-black" : "text-white"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </a>

                          {/* GitHub */}
                          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer"
                            className="group flex items-center gap-4 p-4 rounded-2xl border-2 border-black transition-all duration-300 hover:-translate-y-1"
                            style={{ 
                              backgroundColor: isProjectsSection ? 'rgba(255,255,255,0.8)' : 'rgba(7, 34, 14, 0.3)',
                              backdropFilter: 'blur(10px)'
                            }}>
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center border-2 border-black"
                              style={{ backgroundColor: '#181717' }}>
                              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                              </svg>
                            </div>
                            <div className="flex-1">
                              <p className={`font-bold ${isProjectsSection ? "text-black" : "text-white"}`}>GitHub</p>
                              <p className={`text-sm ${isProjectsSection ? "text-black/60" : "text-white/60"}`}>View my projects</p>
                            </div>
                            <svg className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isProjectsSection ? "text-black" : "text-white"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </a>

                          {/* Email */}
                          <div className="flex items-center gap-4 p-4 rounded-2xl border-2 border-black"
                            style={{ 
                              backgroundColor: isProjectsSection ? 'rgba(255,255,255,0.8)' : 'rgba(7, 34, 14, 0.3)',
                              backdropFilter: 'blur(10px)'
                            }}>
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center border-2 border-black"
                              style={{ backgroundColor: '#d1cc65ff' }}>
                              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <p className={`font-bold ${isProjectsSection ? "text-black" : "text-white"}`}>Email</p>
                              <p className={`text-sm ${isProjectsSection ? "text-black/60" : "text-white/60"}`}>Or use the form →</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Side - Contact Form */}
                    <div>
                      <h4 className={`text-2xl font-bold mb-6 uppercase tracking-tight ${isProjectsSection ? "text-black" : "text-white"}`}>
                        Send Me a Message
                      </h4>
                      
                      <form 
                        action="https://formspree.io/f/YOUR_FORM_ID" 
                        method="POST"
                        className="space-y-4">
                        
                        {/* Name Input */}
                        <div>
                          <label className={`block text-sm font-bold mb-2 uppercase tracking-wide ${isProjectsSection ? "text-black/70" : "text-white/70"}`}>
                            Your Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            required
                            placeholder="John Doe"
                            className="w-full px-4 py-3 rounded-xl border-2 border-black font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2"
                            style={{
                              backgroundColor: isProjectsSection ? 'rgba(255,255,255,0.9)' : 'rgba(7, 34, 14, 0.3)',
                              color: isProjectsSection ? '#000' : '#fff',
                              backdropFilter: 'blur(10px)'
                            }}
                          />
                        </div>

                        {/* Email Input */}
                        <div>
                          <label className={`block text-sm font-bold mb-2 uppercase tracking-wide ${isProjectsSection ? "text-black/70" : "text-white/70"}`}>
                            Your Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            placeholder="john@example.com"
                            className="w-full px-4 py-3 rounded-xl border-2 border-black font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2"
                            style={{
                              backgroundColor: isProjectsSection ? 'rgba(255,255,255,0.9)' : 'rgba(7, 34, 14, 0.3)',
                              color: isProjectsSection ? '#000' : '#fff',
                              backdropFilter: 'blur(10px)'
                            }}
                          />
                        </div>

                        {/* Message Textarea */}
                        <div>
                          <label className={`block text-sm font-bold mb-2 uppercase tracking-wide ${isProjectsSection ? "text-black/70" : "text-white/70"}`}>
                            Message
                          </label>
                          <textarea
                            name="message"
                            required
                            rows="5"
                            placeholder="Tell me about your project..."
                            className="w-full px-4 py-3 rounded-xl border-2 border-black font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 resize-none"
                            style={{
                              backgroundColor: isProjectsSection ? 'rgba(255,255,255,0.9)' : 'rgba(7, 34, 14, 0.3)',
                              color: isProjectsSection ? '#000' : '#fff',
                              backdropFilter: 'blur(10px)'
                            }}
                          />
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          className="w-full px-8 py-4 bg-[#d1cc65ff] text-black font-bold rounded-xl border-2 border-black transition-all duration-300 hover:scale-105 hover:shadow-lg uppercase tracking-wide"
                        >
                          Send Message →
                        </button>
                      </form>

                      <p className={`text-xs text-center mt-4 ${isProjectsSection ? "text-black/50" : "text-white/50"}`}>
                        Your information is secure and will never be shared
                      </p>
                    </div>
                  </div>
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