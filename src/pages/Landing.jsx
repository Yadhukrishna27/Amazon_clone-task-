// ...existing code...
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MiniNav from "../components/Mininav";
import { Link } from "react-router-dom";


export default function Landing() {
  const heroSlides = [
    {
      image: "https://images-eu.ssl-images-amazon.com/images/G/31/LEO/Jupiterminievent/PC_NTA_1500x600._CB796959426_.jpg",
      title: "Festive Deals Still Live!",
      description: "Get up to 25% cashback and festive rewards!",
    },
    {
      image: "https://images-eu.ssl-images-amazon.com/images/G/31/IMG25/Home/2025/GW/TYD/Hero/Home_unrec_3k._CB797202140_.jpg",
      title: "Big Savings on Home Decor!",
      description: "Up to 50% off on home improvement and decor items.",
    },
    {
      image: "https://images-eu.ssl-images-amazon.com/images/G/31/img22/WLA/2025/Testing/UNREC_GW_PC_Hero_3000x1200._CB797034311_.jpg",
      title: "Appliances Mega Sale!",
      description: "Save big on refrigerators, ACs, and more!",
    },
  ];

  
  const cards = [
    {
      title: "Revamp your home in style",
      items: [
        {
          name: "Cushion covers, bedsheets & more",
          img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
        },
        {
          name: "Figurines, vases & more",
          img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
        },
      ],
    },
    {
      title: "Appliances for your home | Up to 55% off",
      items: [
        {
          name: "Air conditioners",
          img: "https://images.unsplash.com/photo-1643705314142-6f072c3d48fa?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJlZnJpZ2VyYXRvcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
        },
        {
          name: "Refrigerators",
          img: "https://images.unsplash.com/photo-1582484898866-ac15ca496f0d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774",
        },
      ],
    },
    {
      title: "Starting ₹149 | Headphones",
      items: [
        {
          name: "Starting ₹249 | boAt",
          img: "https://images.unsplash.com/photo-1628202926206-c63a34b1618f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=387",
        },
        {
          name: "Starting ₹349 | boult",
          img: "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
        },
      ],
    },
    {
      title: "Up to 50% off | Baby care & toys | Amazon Brands",
      items: [
        {
          name: "Up to 50% off | Baby diapers & wipes",
          img: "https://plus.unsplash.com/premium_photo-1661497908961-e9e04ae0a027?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=752",
        },
        {
          name: "Up to 50% off | Ride ons",
          img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
        },
      ],
    },
  ];


  return (
    <>
    <MiniNav/>
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <HeroCarousel slides={heroSlides} />
      </div>
      

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="flex"
            >
              <div className="w-full bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-3">{section.title}</h3>
                  <div className="grid gap-3">
                    {section.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition"
                      >
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-28 h-20 object-cover rounded-md flex-shrink-0"
                          loading="lazy"
                        />
                        <div className="text-sm font-medium text-gray-700">{item.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <section className="max-w-3xl mx-auto my-12 bg-white rounded-lg shadow border px-6 py-8 text-center">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
        See personalized recommendations
      </h2>

      <a
        href="/login"
        onClick={(e) => {
          if (onSignIn) {
            e.preventDefault();
            onSignIn();
          }
        }}
        className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-full shadow transition"
        role="button"
        aria-label="Sign in"
      >
        Sign In
        </a>

      <p className="text-sm text-gray-500 mt-3">
        New customer?{" "}
        <a href="/signup" className="text-blue-600 underline">
          Start here.
        </a>
      </p>
    </section>
    </div>

    </>
  );
}

/* Local Tailwind-based Carousel component (no external lib) */
function HeroCarousel({ slides = [] }) {
  const [index, setIndex] = useState(0);
  const slideCount = slides.length;

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slideCount), 5000);
    return () => clearInterval(id);
  }, [slideCount]);

  const goTo = (i) => setIndex(i % slideCount);
  const prev = () => setIndex((i) => (i - 1 + slideCount) % slideCount);
  const next = () => setIndex((i) => (i + 1) % slideCount);

  return (
    <>
    
    <div className="relative mt-6 select-none">
      {/* slides wrapper */}
      <div className="overflow-hidden rounded-xl shadow-lg">
        <div
          className="flex transition-transform duration-700"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((s, i) => (
            <div
              key={i}
              className="w-full flex-shrink-0 relative h-[52vh] sm:h-[44vh] md:h-[56vh] lg:h-[64vh]"
              aria-hidden={i !== index}
            >
              <img
                src={s.image}
                alt={s.title}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-transparent"></div>

              <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
                <motion.h2
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-lg"
                >
                  {s.title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-sm sm:text-base md:text-lg text-gray-100 mt-3 max-w-2xl"
                >
                  {s.description}
                </motion.p>

                <div className="mt-6">
                  <Link
                    to="/shop"
                    className="inline-flex items-center px-5 py-2 rounded-md bg-yellow-400 text-black font-semibold shadow hover:bg-yellow-500 transition"
                    >
                  Shop Now
                    </Link>
                </div>
              </div>

              {/* subtle bottom fade */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/40 to-transparent pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>

      {/* controls */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 text-gray-800 rounded-full p-2 shadow hover:bg-white"
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 text-gray-800 rounded-full p-2 shadow hover:bg-white"
        aria-label="Next slide"
      >
        ›
      </button>

      {/* indicators */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-3 h-3 rounded-full transition ${
              i === index ? "bg-white" : "bg-white/60"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
    
    
    </>
  );
}
