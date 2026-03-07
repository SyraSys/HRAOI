"use client";

import Announcements from "@/components/Announcements";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn, Pressable, Stagger, StaggerItem } from "@/components/Motion";

const SLIDER_IMAGES = [
  "/homepage/WhatsApp Image 2026-02-22 at 9.45.32 PM.jpeg",
  "/homepage/WhatsApp Image 2026-02-22 at 9.45.33 PM.jpeg",
  "/homepage/WhatsApp Image 2026-02-22 at 9.45.34 PM (1).jpeg",
  "/homepage/WhatsApp Image 2026-02-22 at 9.45.34 PM.jpeg",
  "/homepage/WhatsApp Image 2026-02-22 at 9.45.37 PM.jpeg",
  "/homepage/WhatsApp Image 2026-02-22 at 9.45.38 PM (1).jpeg",
  "/homepage/WhatsApp Image 2026-02-22 at 9.45.38 PM.jpeg",
  "/homepage/WhatsApp Image 2026-02-22 at 9.45.39 PM (1).jpeg",
  "/homepage/WhatsApp Image 2026-02-22 at 9.45.39 PM (2).jpeg",
  "/homepage/WhatsApp Image 2026-02-22 at 9.45.39 PM.jpeg",
  "/homepage/WhatsApp Image 2026-02-22 at 9.45.41 PM.jpeg",
  "/homepage/WhatsApp Image 2026-02-22 at 9.45.42 PM (2).jpeg",
  "/homepage/WhatsApp Image 2026-02-22 at 9.45.43 PM.jpeg",
];

export default function Home() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?member=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push(`/search`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Auto-advance slider
  useEffect(() => {
    if (SLIDER_IMAGES.length > 0 && !isDragging) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % SLIDER_IMAGES.length);
      }, 4000); // Change slide every 4 seconds

      return () => clearInterval(timer);
    }
  }, [isDragging]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart(e.clientX);
    setDragOffset(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const diff = e.clientX - dragStart;
    setDragOffset(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;

    setIsDragging(false);

    // Threshold for slide change (1/3 of image width)
    const threshold = 380 / 3;

    if (dragOffset > threshold && currentSlide > 0) {
      // Dragged right, go to previous slide
      setCurrentSlide(prev => prev - 1);
    } else if (dragOffset < -threshold && currentSlide < SLIDER_IMAGES.length - 1) {
      // Dragged left, go to next slide
      setCurrentSlide(prev => prev + 1);
    }

    setDragOffset(0);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setDragOffset(0);
    }
  };

  return (
    <div className="bg-white text-gray-800 font-sans">
      {/* Hero Slider Area */}
      <section className="relative h-[200px] sm:h-[240px] lg:h-[260px] bg-gray-900 overflow-hidden">
        {/* Slider Container */}
        <div className="relative w-full h-full flex items-center">
          <div
            className="flex transition-transform duration-300 ease-out cursor-grab active:cursor-grabbing"
            style={{
              transform: `translateX(-${currentSlide * 380 - dragOffset}px)`,
              transitionDuration: isDragging ? '0ms' : '300ms'
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            draggable={false}
          >
            {/* Triple the images for seamless looping */}
            {[...SLIDER_IMAGES, ...SLIDER_IMAGES, ...SLIDER_IMAGES].map((image, index) => (
              <div
                key={index}
                className="w-[280px] sm:w-[320px] lg:w-[380px] h-[200px] sm:h-[240px] lg:h-[260px] flex-shrink-0 select-none"
              >
                <img
                  src={image}
                  alt={`Slide ${index}`}
                  className="w-full h-full object-cover border-r border-gray-800 pointer-events-none"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Dots Navigation */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {SLIDER_IMAGES.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white' : 'bg-white/50'
                } hover:bg-white/80`}
            />
          ))}
        </div>
      </section>

      {/* Search & Announcements Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-b from-white to-gray-50/50">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Member Search */}
          <FadeIn>
            <div className="bg-white/80 backdrop-blur-sm p-6 lg:p-8 rounded-[1.5rem] lg:rounded-[2rem] shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-gray-100 h-full">
              <div className="flex items-center gap-2 lg:gap-3 mb-4 lg:mb-6">
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-4 h-4 lg:w-5 lg:h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg lg:text-xl font-bold text-gray-800">Member Search</h2>
                  <p className="text-xs text-gray-500 font-medium">Enter Member Number</p>
                </div>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter Certificate ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 px-3 lg:px-5 py-2 lg:py-3 rounded-full border border-gray-200 bg-white/90 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all duration-300 text-sm"
                />
                <Pressable>
                  <button
                    onClick={handleSearch}
                    className="bg-primary text-white px-4 lg:px-6 py-2 lg:py-3 rounded-full text-sm font-semibold hover:bg-primary-dark transition-all duration-300 shadow-[0_2px_12px_rgba(36,33,113,0.25)] hover:shadow-[0_4px_16px_rgba(36,33,113,0.35)]"
                  >
                    Search
                  </button>
                </Pressable>
              </div>

              <div className="mt-6 lg:mt-8 flex justify-center">
                <Link href="/membership">
                  <Pressable scale={1.03}>
                    <img
                      src="/images/online-membership.png"
                      alt="Online Membership"
                      className="h-14 lg:h-16 w-auto cursor-pointer transition-all duration-300"
                    />
                  </Pressable>
                </Link>
              </div>

              <div className="mt-6 lg:mt-8 bg-gradient-to-r from-primary/5 to-blue-50 text-primary/80 p-4 lg:p-5 rounded-xl lg:rounded-2xl text-xs leading-relaxed text-center border border-primary/10">
                <span className="font-semibold">Notice:</span> Dear all Members of HRAOI, the renewal process is stated. Please contact your District President for any information or Delhi Office. You can also drop us a mail at <span className="font-medium">www.hraoi.in@gmail.com</span>
              </div>
            </div>
          </FadeIn>

          {/* Announcements */}
          <Announcements />
        </div>
      </section>

      {/* HRAOI at a Glance Section */}
      <section className="py-12 lg:py-20 bg-gradient-to-br from-gray-50 via-white to-primary/5 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-secondary/10 to-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-10 lg:mb-14">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 lg:px-5 py-1.5 lg:py-2 rounded-full text-xs lg:text-sm font-semibold uppercase tracking-wider mb-3 lg:mb-4">
              <svg className="w-3 h-3 lg:w-4 lg:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Our Impact
            </div>
            <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-2 lg:mb-3">HRAOI at a Glance</h2>
            <p className="text-sm lg:text-base text-gray-500 max-w-md mx-auto px-4">Making a difference across India through dedicated service and advocacy</p>
          </div>

          <Stagger>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Active Members', value: '50,000+', color: 'from-primary to-indigo-600', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /> },
                { label: 'States Covered', value: '28+', color: 'from-emerald-500 to-teal-600', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /> },
                { label: 'Districts', value: '500+', color: 'from-amber-500 to-orange-600', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" /> },
                { label: 'Years of Service', value: '15+', color: 'from-secondary to-rose-600', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /> },
              ].map((stat, i) => (
                <StaggerItem key={i}>
                  <Pressable scale={1.03} className="h-full">
                    <div className="relative bg-white/80 backdrop-blur-sm p-6 rounded-[1.5rem] shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-gray-100 hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-all duration-500 group overflow-hidden h-full">
                      {/* Gradient accent on hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                      <div className="relative flex flex-col items-center text-center gap-4">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {stat.icon}
                          </svg>
                        </div>
                        <div>
                          <div className="text-3xl font-bold text-gray-900 leading-tight mb-1">{stat.value}</div>
                          <div className="text-sm font-medium text-gray-500">{stat.label}</div>
                        </div>
                      </div>
                    </div>
                  </Pressable>
                </StaggerItem>
              ))}
            </div>
          </Stagger>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="py-12 lg:py-24 bg-gradient-to-b from-white via-gray-50/30 to-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-10 lg:mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 lg:px-5 py-1.5 lg:py-2 rounded-full text-xs lg:text-sm font-semibold uppercase tracking-wider mb-3 lg:mb-4">
              <svg className="w-3 h-3 lg:w-4 lg:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
              Our Leadership
            </div>
            <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-2 lg:mb-3">Meet Our Team</h2>
            <p className="text-sm lg:text-base text-gray-500 max-w-lg mx-auto px-4">Dedicated leaders driving the mission of human rights and social justice across India</p>
          </div>

          {/* Leadership Cards - Full Width */}
          <div className="space-y-4 lg:space-y-6 max-w-6xl mx-auto">
            {/* National President */}
            <div className="bg-white border border-gray-200 p-4 lg:p-6 xl:p-8">
              <div className="flex flex-col md:flex-row items-center gap-4 lg:gap-6">
                <div className="w-32 h-32 lg:w-48 lg:h-48 flex-shrink-0">
                  <img src="/images/sudhir.jpeg" alt="Mr. Sudhir Kumar" className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <div className="bg-primary text-white px-3 lg:px-4 py-1 inline-block text-xs font-bold uppercase mb-2 lg:mb-3">
                    National President
                  </div>

                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2 lg:mb-3">Mr. Sudhir Kumar</h3>

                  <p className="text-sm lg:text-base text-gray-600 mb-2 lg:mb-3">
                    Senior human rights activist with over 30 years of dedicated experience in human rights protection and social justice. Under his visionary leadership, HRAOI has strengthened its mission to promote justice, equality, dignity, and humanitarian values.
                  </p>
                </div>
              </div>
            </div>

            {/* National Vice President */}
            <div className="bg-white border border-gray-200 p-4 lg:p-6 xl:p-8">
              <div className="flex flex-col md:flex-row items-center gap-4 lg:gap-6">
                <div className="w-32 h-32 lg:w-48 lg:h-48 flex-shrink-0">
                  <img src="/images/surajkumar.jpeg" alt="Mr. Suraj Kumar" className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <div className="bg-emerald-600 text-white px-3 lg:px-4 py-1 inline-block text-xs font-bold uppercase mb-2 lg:mb-3">
                    Vice President
                  </div>

                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2 lg:mb-3">Mr. Suraj Kumar</h3>

                  <p className="text-sm lg:text-base text-gray-600 mb-2 lg:mb-3">
                    Committed human rights leader with years of experience in organizational leadership and grassroots engagement, playing a vital role in strengthening human rights awareness and justice advocacy across the country.
                  </p>
                </div>
              </div>
            </div>

            {/* National Vice General Secretary */}
            <div className="bg-white border border-gray-200 p-4 lg:p-6 xl:p-8">
              <div className="flex flex-col md:flex-row items-center gap-4 lg:gap-6">
                <div className="w-32 h-32 lg:w-48 lg:h-48 flex-shrink-0">
                  <img src="/images/AjarKumar.jpeg" alt="Mr. Ajay Kumar Das" className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <div className="bg-amber-600 text-white px-3 lg:px-4 py-1 inline-block text-xs font-bold uppercase mb-2 lg:mb-3">
                    Vice General Secretary
                  </div>

                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2 lg:mb-3">Mr. Ajay Kumar Das</h3>

                  <p className="text-sm lg:text-base text-gray-600 italic mb-2 lg:mb-3">
                    "Committed to justice, dignity, and human rights for all."
                  </p>
                </div>
              </div>
            </div>

            {/* National General Secretary */}
            <div className="bg-white border border-gray-200 p-4 lg:p-6 xl:p-8">
              <div className="flex flex-col md:flex-row items-center gap-4 lg:gap-6">
                <div className="w-32 h-32 lg:w-48 lg:h-48 flex-shrink-0">
                  <img src="/images/hasrat.jpeg" alt="Mr. Md. Hasrat Shah" className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <div className="bg-secondary text-white px-3 lg:px-4 py-1 inline-block text-xs font-bold uppercase mb-2 lg:mb-3">
                    General Secretary
                  </div>

                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2 lg:mb-3">Mr. Md. Hasrat Shah</h3>

                  <p className="text-sm lg:text-base text-gray-600 italic mb-2 lg:mb-3">
                    "Human rights are not a privilege granted by power; they are a dignity inherent to every human life."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mini Gallery */}
      {/* <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-48 h-32 bg-gray-200 rounded-lg border-2 border-primary/20 flex items-center justify-center text-xs text-gray-400 grayscale hover:grayscale-0 transition-all cursor-pointer">
                Event {i}
              </div>
            ))}
          </div>
        </div>
      </section> */}


      {/* Donate Section */}
      <section className="py-10 lg:py-20 bg-white overflow-visible">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="mx-auto relative">
              {/* Main Card with dark background */}
              <div className="bg-gray-900 rounded-xl lg:rounded-[2rem] shadow-[0_8px_40px_rgba(0,0,0,0.15)] ml-0 md:ml-32 lg:ml-40 relative">
                <div className="flex flex-col md:flex-row items-center">
                  {/* Image - Positioned to overflow on the left, bottom aligned */}
                  <div className="relative md:absolute md:-left-1 lg:-left-2 md:bottom-0 z-10 p-6 md:p-0">
                    <motion.img
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      src="/images/donate.png"
                      alt="Donate"
                      className="w-48 sm:w-56 md:w-72 lg:w-80 h-auto object-contain drop-shadow-2xl"
                    />
                  </div>

                  {/* Content Side */}
                  <div className="flex-1 p-6 lg:p-10 xl:p-12 md:pl-60 lg:pl-80 xl:pl-100 flex flex-col justify-center">
                    {/* Large Impact Headline */}
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight mb-4 lg:mb-6 leading-[0.9]">
                      IMPACT
                    </h2>

                    {/* Description */}
                    <p className="text-white/80 text-sm lg:text-lg leading-relaxed mb-6 lg:mb-8">
                      Your contribution helps us protect human rights, support victims, and create a more just society for everyone.
                    </p>

                    {/* Donate Button - Outlined Style */}
                    <Link href="/donate">
                      <Pressable scale={1.05}>
                        <button className="group px-6 lg:px-8 py-2.5 lg:py-3.5 rounded-full font-bold text-sm lg:text-base border-2 border-lime-400 text-lime-400 bg-transparent hover:bg-lime-400 hover:text-black transition-all duration-300 inline-flex items-center gap-2 lg:gap-3 w-fit">
                          <span>Donate Now</span>
                          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </button>
                      </Pressable>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>


      {/* Mission Section */}
      <section className="relative py-16 lg:py-28 text-white overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="/images/back.jpg"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/80"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="max-w-5xl mx-auto">
              {/* Badge */}
              <div className="flex justify-center mb-6 lg:mb-8">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 lg:px-5 py-1.5 lg:py-2 rounded-full text-xs lg:text-sm font-semibold uppercase tracking-wider">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                  Our Philosophy
                </div>
              </div>

              {/* Main Heading */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center mb-6 lg:mb-8 leading-tight">
                Human Rights Association
                <span className="block text-lime-400">of India</span>
              </h2>

              {/* Quote Mark */}
              <div className="flex justify-center mb-4 lg:mb-6">
                <svg className="w-8 h-8 lg:w-12 lg:h-12 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Philosophy Text */}
              <blockquote className="text-center">
                <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-white/90 mb-6 lg:mb-8">
                  HRAOI is based on the philosophy of <span className="text-lime-400 font-semibold">HUMAN RIGHTS</span>.
                  <span className="block mt-3 lg:mt-4 text-white/70 italic">"Vasudhav Kutumbakum" — The whole world is family</span>
                </p>
                <p className="text-sm md:text-base lg:text-lg text-white/70 leading-relaxed max-w-3xl mx-auto">
                  All human beings are born equal and free. Human rights are properly understood and interpreted all over the world. They are foreign to no culture and native to all nations. It is the universality of Human rights that gives them their strength and endorses them with the power to cross any border, climb any wall, defy any force.
                </p>
              </blockquote>

              {/* Decorative Line */}
              <div className="flex justify-center mt-12">
                <div className="w-24 h-1 bg-lime-400 rounded-full"></div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
