"use client"

import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { useLanguage } from "@/lib/i18n"
import { useRef } from "react"
import { useSoundEffect } from "@/hooks/use-sound-effect" // Import useSoundEffect

export default function HeroSection() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const playClickSound = useSoundEffect("/audio/button-click.mp3") // Initialize sound effect

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const foregroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  return (
    <section
      ref={ref}
      className="relative h-screen w-full flex items-center justify-center text-center overflow-hidden"
    >
      {/* Background Video/Image Layer (moves slower) */}
      <motion.div className="absolute inset-0 w-full h-full z-0" style={{ y: backgroundY }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          src="/placeholder-video.mp4"
        >
          Your browser does not support the video tag.
        </video>
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url(/placeholder.svg?height=1080&width=1920)" }}
        ></div>
      </motion.div>

      {/* Optional: Add another layer for more depth, e.g., stars or nebula */}
      <motion.div
        className="absolute inset-0 w-full h-full z-0"
        style={{
          y: foregroundY,
          backgroundImage: "url(/placeholder.svg?height=1080&width=1920)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.1,
        }}
      ></motion.div>

      {/* Content Layer (moves slightly slower than normal scroll) */}
      <motion.div className="relative z-10 text-white p-4 md:p-8" style={{ y: contentY }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading text-electric-blue drop-shadow-lg mb-4"
          >
            ChronoVerse
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl lg:text-3xl text-nebula-purple mb-8 max-w-4xl"
          >
            {t("slogan")}
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
            <Link href="/play">
              <Button
                className="bg-electric-blue text-deep-space hover:bg-metallic-gold transition-all duration-300 px-8 py-3 text-lg md:text-xl font-bold rounded-full shadow-lg hover:shadow-electric-blue/50 animate-glow"
                onClick={playClickSound} // Add sound effect
              >
                {t("playNow")}
              </Button>
            </Link>
            <Link href="/about">
              <Button
                variant="outline"
                className="border-2 border-nebula-purple text-nebula-purple hover:bg-nebula-purple hover:text-white transition-all duration-300 px-8 py-3 text-lg md:text-xl font-bold rounded-full shadow-lg hover:shadow-nebula-purple/50 bg-transparent"
                onClick={playClickSound} // Add sound effect
              >
                {t("exploreUniverse")}
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
