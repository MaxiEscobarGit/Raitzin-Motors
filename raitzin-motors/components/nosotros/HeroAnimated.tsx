'use client'

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { SplitText } from "gsap/SplitText"

gsap.registerPlugin(SplitText)

export function HeroAnimated() {
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      // Eyebrow slide in
      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6 }
      )

      // Split title by words and animate each in
      if (titleRef.current) {
        const split = new SplitText(titleRef.current, { type: "words" })
        tl.fromTo(
          split.words,
          { opacity: 0, y: 40, rotateX: -20 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.7,
            stagger: 0.07,
          },
          "-=0.3"
        )
      }

      // Subtitle fade in
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.2"
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="relative z-10 w-full text-left px-6 sm:pl-10 lg:pl-16 pt-48 pb-28">
      {/* Eyebrow */}
      <div ref={eyebrowRef} className="flex items-center gap-3 mb-4">
        <div className="w-6 h-0.5 bg-[#7EB8D4]" aria-hidden="true" />
        <p className="text-[#7EB8D4] text-[11px] font-semibold tracking-widest uppercase">
          San Carlos de Bariloche · Patagonia
        </p>
      </div>

      <h1
        ref={titleRef}
        className="font-extrabold text-white leading-[1.0] mt-4"
        style={{ fontSize: "clamp(52px, 8vw, 96px)", perspective: "600px" }}
      >
        Más de 35 años{" "}
        <br />
        <span className="text-[#B83232]">en el negocio</span>{" "}
        <br />
        de los fierros.
      </h1>

      <div ref={subtitleRef} className="mt-4">
        <p className="text-white text-[17px] leading-snug">
          Una agencia de Bariloche apasionada por los autos y las motos.
        </p>
        <p className="text-white text-[17px] leading-snug">
          Trabajamos para que cambiar de auto sea simple, claro y sin sorpresas.
        </p>
      </div>
    </div>
  )
}
