"use client"

import { useCallback } from "react"
import Particles from "react-tsparticles"
import { loadFull } from "tsparticles"
import type { Engine } from "tsparticles"

export default function ShootingStars() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine)
  }, [])

  const particlesLoaded = useCallback(async (container: any) => {
    console.log("Shooting stars container loaded", container)
  }, [])

  return (
    <Particles
      id="shooting-stars-particles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fullScreen: {
          enable: true,
          zIndex: 1, // Ensure it's above the main ParticleBackground but below content
        },
        particles: {
          number: {
            value: 5, // Fewer particles for shooting stars
            density: {
              enable: true,
              value_area: 2000, // Spread them out
            },
          },
          color: {
            value: ["#00F0FF", "#FFD700", "#A020F0"], // Electric blue, metallic gold, nebula purple
          },
          shape: {
            type: "star", // Use star shape for shooting stars
            stroke: {
              width: 0,
              color: "#000000",
            },
          },
          opacity: {
            value: 1,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.1,
              sync: false,
            },
          },
          size: {
            value: 5,
            random: true,
            anim: {
              enable: true,
              speed: 10,
              size_min: 0.1,
              sync: false,
            },
          },
          links: {
            enable: false, // No links for shooting stars
          },
          move: {
            enable: true,
            speed: 10, // Fast movement
            direction: "bottom-left", // Direction of shooting stars
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200,
            },
            trail: {
              enable: true,
              length: 10, // Longer trail
              fill: {
                color: "#ffffff",
              },
            },
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: false, // No hover interaction
            },
            onclick: {
              enable: false, // No click interaction
            },
            resize: true,
          },
        },
        retina_detect: true,
      }}
    />
  )
}
