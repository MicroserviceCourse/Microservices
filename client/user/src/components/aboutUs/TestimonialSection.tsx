import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import TestimonialSlide from './TestimonialSlide'

const TESTIMONIALS = [
  {
    quote: 'Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus...',
    author: 'Jennifer Jacobs',
    role: 'Designer',
  },
  {
    quote: 'Curabitur ullamcorper ultricies nisi. Nam eget dui.',
    author: 'Michael Stone',
    role: 'Photographer',
  },
  {
    quote: 'Aenean imperdiet. Etiam ultricies nisi vel augue.',
    author: 'Anna White',
    role: 'Marketing',
  },
]

const TestimonialSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)
  const [index, setIndex] = useState(0)

  /* ===== PARALLAX ===== */
  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      setOffset(-rect.top * 0.3)
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ===== AUTO SLIDE ===== */
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % TESTIMONIALS.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const prev = () =>
    setIndex((i) => (i === 0 ? TESTIMONIALS.length - 1 : i - 1))

  const next = () =>
    setIndex((i) => (i + 1) % TESTIMONIALS.length)

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[520px] overflow-hidden"
    >
      {/* BG */}
      <img
        src="https://bazaar.qodeinteractive.com/wp-content/uploads/2017/06/about-us-parallax-img.jpg"
        className="absolute top-0 left-0 w-full h-[140%] object-cover"
        style={{ transform: `translateY(${offset}px)` }}
      />
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      {/* CONTENT */}
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <div className="w-full space-y-10">
          <div className="text-center space-y-4">
            <h2 className="text-white text-4xl font-light lowercase">
              what they’re saying
            </h2>
            <div className="w-16 h-[2px] bg-white mx-auto" />
          </div>

          {/* SLIDER */}
          <div className="relative w-full overflow-hidden">
            <div
              className="flex w-full transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {TESTIMONIALS.map((item, i) => (
                <div key={i} className="w-full shrink-0">
                  <TestimonialSlide {...item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* NAV */}
      <button
        onClick={prev}
        className="absolute z-20 left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
      >
        <ChevronLeft size={32} />
      </button>

      <button
        onClick={next}
        className="absolute z-20 right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
      >
        <ChevronRight size={32} />
      </button>
    </section>
  )
}

export default TestimonialSection
