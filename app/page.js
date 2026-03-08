"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

// --- RESPONSIVE SUB-COMPONENTS ---

function NavItem({ href, children }) {
  return (
    <motion.a
      href={href}
      className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold hover:opacity-50 transition-all font-sans"
    >
      {children}
    </motion.a>
  );
}

function ServiceCard({ number, title, description, icon, color }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="group p-6 md:p-10 rounded-[30px] md:rounded-[40px] bg-white/40 border border-black/[0.03] hover:bg-white hover:border-black/[0.08] hover:shadow-[0_30px_60px_rgba(0,0,0,0.04)] transition-all duration-700 flex flex-col items-start"
    >
      {/* Icon with Light Background */}
      <div className={`w-12 h-12 md:w-16 md:h-16 ${color} rounded-xl md:rounded-2xl flex items-center justify-center mb-6 md:mb-10 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3`}>
        {/* WE MOVED SIZING TO className */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="text-stone-600 w-5 h-5 md:w-6 md:h-6" 
        >
          {icon}
        </svg>
      </div>

      <span className="text-[9px] md:text-[10px] font-bold opacity-20 uppercase tracking-[0.4em] mb-4 font-sans">{number}</span>
      <h4 className="text-2xl md:text-3xl font-serif italic mb-4 md:mb-6 text-stone-800">{title}</h4>
      <p className="text-xs md:text-sm text-stone-500 leading-relaxed font-light font-sans">{description}</p>
    </motion.div>
  );
}
function TechIcon({ name, src, isSecurity = false }) {
  return (
    <motion.div whileHover={{ y: -5 }} className="group flex flex-col items-center gap-2 md:gap-3 cursor-help">
      <div className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-all duration-500 ${isSecurity ? 'group-hover:drop-shadow-[0_0_10px_rgba(0,0,0,0.1)]' : ''}`}>
        <img src={src} alt={name} className="w-6 h-6 md:w-8 md:h-8 object-contain opacity-60 brightness-90 group-hover:opacity-100 group-hover:brightness-110 transition-all duration-300" />
      </div>
      <span className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] font-bold opacity-0 group-hover:opacity-40 transition-opacity duration-500 font-sans">{name}</span>
    </motion.div>
  );
}

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) setIsVisible(true);
    else setIsVisible(false);
  });

  const slideFromLeft = { initial: { opacity: 0, x: -30 }, animate: { opacity: 1, x: 0 }, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }};
  const slideFromRight = { initial: { opacity: 0, x: 30 }, animate: { opacity: 1, x: 0 }, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }};
  const staggerContainer = { animate: { transition: { staggerChildren: 0.2, delayChildren: 0.2 }}};
  const imageReveal = { initial: { opacity: 0, y: 40, scale: 1.02 }, animate: { opacity: 1, y: 0, scale: 1 }, transition: { duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.5 }};

  return (
    <main className="min-h-screen w-full bg-[#F7F7F5] text-[#1A1A1A] selection:bg-[#1A1A1A] selection:text-[#F7F7F5] font-sans relative pb-20 md:pb-40 overflow-x-hidden">
      
      {/* Texture Overlay */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.05 }} transition={{ duration: 3 }} className="fixed inset-0 z-[100] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] contrast-150 brightness-100" />

      {/* 1. RESPONSIVE LIQUID NAVIGATION */}
      <div className="fixed bottom-6 md:bottom-10 inset-x-0 z-50 flex justify-center pointer-events-none px-4">
        <motion.nav
          initial={{ y: 100, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
          className="pointer-events-auto relative w-full max-w-xs md:max-w-fit"
        >
          <motion.div layout className="absolute inset-0 bg-white/80 backdrop-blur-3xl border border-black/[0.08] rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.08)]" />

          <div className="relative px-1 py-1 flex items-center min-h-[48px] md:min-h-[56px] justify-center">
            <motion.div 
              animate={{ width: isVisible ? "auto" : "32px", opacity: isVisible ? 1 : 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 30 }}
              className="flex items-center overflow-hidden"
            >
              {isVisible && (
                <div className="flex items-center gap-4 md:gap-10 px-4 md:px-8 whitespace-nowrap">
                  <NavItem href="#work">Work</NavItem>
                  <NavItem href="#services">Services</NavItem>
                  <div className="w-[1px] h-3 bg-black/10" />
                  <NavItem href="#contact">Contact</NavItem>
                </div>
              )}
            </motion.div>
            {!isVisible && <div className="absolute inset-0 flex items-center justify-center"><div className="w-1.5 h-1.5 rounded-full bg-black/20" /></div>}
          </div>
        </motion.nav>
      </div>

      {/* 2. MAIN CONTENT */}
      <div className="w-full px-6 md:px-16 lg:px-24 pt-20 md:pt-32 relative z-10">
        
        {/* HERO SECTION */}
        <motion.header variants={staggerContainer} initial="initial" animate="animate" className="mb-24 md:mb-48 flex flex-col md:grid md:grid-cols-12 gap-8 items-start relative">
          <div className="md:col-span-9 z-20 relative pt-4 md:pt-10">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[110px] leading-[1.1] md:leading-[1.0] tracking-tight font-light mb-8 md:mb-14 max-w-4xl">
              <motion.span variants={slideFromLeft} className="block">Full-stack</motion.span>
              <motion.span variants={slideFromRight} className="font-serif italic text-stone-400 block md:pl-16">Development</motion.span>
              <motion.span variants={slideFromLeft} className="relative block">meets Security.</motion.span>
            </h1>
            <motion.p variants={slideFromRight} className="text-base md:text-2xl text-stone-500 max-w-lg font-light leading-relaxed font-sans">
              I&apos;m a developer and cybersecurity student in Rawalpindi, building high-integrity systems that don&apos;t compromise on beauty.
            </motion.p>
          </div>

          <motion.div variants={imageReveal} className="relative md:absolute md:top-0 md:right-[-40px] lg:right-[-100px] z-10 w-full md:w-[50%] lg:w-[45%] h-[300px] md:h-[120%] pointer-events-none mt-10 md:mt-0">
            <div className="relative w-full h-98% md:h-98%">
              <div className="absolute inset-0 bg-gradient-to-t from-stone-200/40 to-transparent rounded-full blur-[60px] md:blur-[120px] opacity-40 scale-75 translate-y-10" />
              <img src="/photo3.png" alt="Afaq Portrait" className="relative z-10 w-full h-full object-contain object-bottom md:object-right-bottom" />
            </div>
          </motion.div>
        </motion.header>

        {/* 3. SELECTED PROJECTS */}
        <motion.section id="work" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 1.2 }} className="w-full mb-24 md:mb-48 relative z-20 scroll-mt-20">
          <div className="flex items-center gap-4 mb-8 opacity-30">
            <span className="w-8 h-[1px] bg-black"></span>
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold font-sans">Selected Works</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Project 1 */}
            <motion.div whileHover={{ y: -5 }} className="group aspect-square sm:aspect-[16/10] bg-white border border-black/5 rounded-[30px] md:rounded-[50px] flex overflow-hidden cursor-pointer">
              <div className="w-full flex flex-col sm:grid sm:grid-cols-12 h-full">
                <div className="sm:col-span-5 p-6 md:p-8 flex flex-col justify-between border-b sm:border-b-0 sm:border-r border-black/5">
                  <div>
                    <span className="text-[9px] font-mono opacity-30 uppercase tracking-widest">01 / Next.js</span>
                    <h3 className="text-2xl md:text-3xl font-serif italic mt-2 group-hover:text-stone-400 transition-colors">BookNest</h3>
                  </div>
                  <div className="hidden sm:flex w-10 h-10 rounded-full border border-black/10 items-center justify-center group-hover:bg-black group-hover:text-white transition-all"><a className="text-sm" href="https://booknest-five-wine.vercel.app/">↗</a></div>
                </div>
                <div className="sm:col-span-7 bg-stone-50 relative overflow-hidden flex-grow">
<img 
  src="/ss1.jpeg" 
  alt="BookNest" 
  className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105" 
/>
                </div>
              </div>
            </motion.div>
            {/* Project 2 */}
            <motion.div whileHover={{ y: -5 }} className="group aspect-square sm:aspect-[16/10] bg-[#1A1A1A] text-[#F7F7F5] border border-white/5 rounded-[30px] md:rounded-[50px] flex overflow-hidden cursor-pointer">
              <div className="w-full flex flex-col sm:grid sm:grid-cols-12 h-full">
                <div className="sm:col-span-5 p-6 md:p-8 flex flex-col justify-between border-b sm:border-b-0 sm:border-r border-white/5">
                  <div>
                    <span className="text-[9px] font-mono opacity-30 uppercase tracking-widest">02 / MERN</span>
                    <h3 className="text-2xl md:text-3xl font-serif italic mt-2 group-hover:text-stone-500 transition-colors">ZenBug</h3>
                  </div>
                  <div className="hidden sm:flex w-10 h-10 rounded-full bg-white text-black items-center justify-center transition-all"><span className="text-sm">↗</span></div>
                </div>
                <div className="sm:col-span-7 bg-stone-900 relative overflow-hidden flex-grow">
                 <img 
  src="/ss3.jpeg" 
  alt="ZenBug" 
  className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105" 
/>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* 4. TECH STACK */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 mb-24 md:mb-48">
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-8 text-stone-400">Development</h3>
            <div className="grid grid-cols-4 sm:flex sm:flex-wrap gap-6 md:gap-12">
              <TechIcon name="Next.js" src="https://cdn.simpleicons.org/nextdotjs/1A1A1A" />
              <TechIcon name="React" src="https://cdn.simpleicons.org/react/61DAFB" />
              <TechIcon name="JavaScript" src="https://cdn.simpleicons.org/javascript/F7DF1E" />
              <TechIcon name="Ruby" src="https://cdn.simpleicons.org/ruby/CC342D" />
              <TechIcon name="Python" src="https://cdn.simpleicons.org/python/3776AB" />
              <TechIcon name="GitHub" src="https://cdn.simpleicons.org/github/181717" />
            </div>
          </div>
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-8 text-stone-400">Security</h3>
            <div className="grid grid-cols-4 sm:flex sm:flex-wrap gap-6 md:gap-12">
              <TechIcon name="Wireshark" src="https://cdn.simpleicons.org/wireshark/1679A7" isSecurity />
              <TechIcon name="Burp" src="https://cdn.simpleicons.org/burpsuite/FF6633" isSecurity />
              <TechIcon name="Linux" src="https://cdn.simpleicons.org/linux/FCC624" isSecurity />
              <TechIcon name="Kali" src="https://cdn.simpleicons.org/kalilinux/557CF2" isSecurity />
            </div>
          </div>
        </div>

        {/* 5. EXPERTISE */}
        <section id="services" className="mb-24 md:mb-48 scroll-mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <ServiceCard number="01" title="Secure Full-Stack" description="MERN & Next.js apps with security-first architecture." icon={<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />} color="bg-stone-100" />
            <ServiceCard number="02" title="Cyber Defense" description="Offensive security simulations and deep-dive assessments." icon={<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />} color="bg-stone-100" />
            <ServiceCard number="03" title="API Engineering" description="Elegant, performant, and encrypted digital backbones." icon={<><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></>} color="bg-stone-100" />
          </div>
        </section>

        {/* 6. FOOTER */}
        <footer id="contact" className="pt-20 md:pt-40 pb-10 border-t border-black/[0.05] scroll-mt-20">
          <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-16">
            <div className="max-w-2xl">
              <h2 className="text-5xl md:text-7xl lg:text-[100px] leading-[1.0] tracking-tight font-light mb-8 font-sans">
                Ready to <br /> <span className="font-serif italic text-stone-400">collaborate?</span>
              </h2>
              <a href="mailto:shahrozeafaq5@gmail.com" className="text-xl md:text-2xl font-light hover:text-stone-400 transition-colors border-b border-black/10 pb-1 break-all">shahrozeafaq5@gmail.com</a>
            </div>

            <div className="flex flex-col md:flex-row lg:flex-col items-start md:items-center lg:items-end gap-8">
              <div className="flex gap-6 md:gap-8 items-center">
                <a href="mailto:shahrozeafaq5@gmail.com"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREMBpDTHoPJa7rDvaB4osIM3mJnVoIHflwyQ&s" alt="Gmail" className="w-6 h-6 grayscale hover:grayscale-0 transition-all" /></a>
                <a href="https://github.com/shahrozeafaq5" target="_blank"><img src="https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_640.png" alt="GitHub" className="w-6 h-6 grayscale hover:grayscale-0 transition-all" /></a>
                <a href="https://www.linkedin.com/in/shahroze-afaq-7581011b1/" target="_blank"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn8fAlGJa8XvUzO1q33KujUSSadcXjQnxJ6A&s" alt="LinkedIn" className="w-6 h-6 grayscale hover:grayscale-0 transition-all" /></a>
              </div>
              <p className="text-[9px] uppercase tracking-widest font-bold opacity-20">Rawalpindi, PK &copy; 2026</p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}