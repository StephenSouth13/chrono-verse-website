"use client"

import { Button } from "@/components/ui/button"

import Image from "next/image"
import { mockGalleryImages } from "@/lib/data"
import ScrollAnimationWrapper from "@/components/common/ScrollAnimationWrapper"
import { useState, useRef } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { motion, useScroll, useTransform } from "framer-motion"
import { useSoundEffect } from "@/hooks/use-sound-effect" // Import useSoundEffect

export default function GallerySection() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState("")
  const { t } = useLanguage()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const playClickSound = useSoundEffect("/audio/button-click.mp3") // Initialize sound effect

  const galleryY = useTransform(scrollYProgress, [0, 1], ["-30%", "30%"])

  const openLightbox = (imageSrc: string) => {
    setCurrentImage(imageSrc)
    setIsOpen(true)
    playClickSound() // Play sound when opening lightbox
  }

  return (
    <motion.section ref={ref} className="py-16 px-4 md:px-8 lg:px-16">
      <ScrollAnimationWrapper>
        <h2 className="text-4xl md:text-5xl font-heading text-burning-orange mb-12">{t("galleryTitle")}</h2>
      </ScrollAnimationWrapper>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockGalleryImages.map((src, index) => (
          <ScrollAnimationWrapper key={index} delay={index * 0.05}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{}}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="relative w-full h-64 rounded-lg overflow-hidden cursor-pointer group hover:shadow-burning-orange/50 transition-shadow duration-300"
              onClick={() => openLightbox(src)}
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255, 69, 0, 0.5)" }}
              whileTap={{ scale: 0.98 }}
              style={{ y: galleryY }}
            >
              <Image
                src={src || "/placeholder.svg"}
                alt={`ChronoVerse Gallery Image ${index + 1}`}
                fill
                style={{ objectFit: "cover" }}
                className="transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                <span className="text-white text-lg font-semibold">{t("viewDetails")}</span>
              </div>
            </motion.div>
          </ScrollAnimationWrapper>
        ))}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-5xl w-full p-0 border-none bg-transparent">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setIsOpen(false)
              playClickSound() // Play sound when closing lightbox
            }}
            className="absolute top-4 right-4 z-50 text-white hover:text-electric-blue"
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </Button>
          <Image
            src={currentImage || "/placeholder.svg"}
            alt="Full screen image"
            width={1920}
            height={1080}
            className="w-full h-auto rounded-lg"
          />
        </DialogContent>
      </Dialog>
    </motion.section>
  )
}
