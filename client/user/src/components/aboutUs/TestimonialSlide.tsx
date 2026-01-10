import type { Testimonial } from '../../types/about.type'

const TestimonialSlide = ({ quote, author, role }: Testimonial) => {
  return (
    <div className="text-center text-white max-w-3xl mx-auto space-y-6">
      <p className="text-lg md:text-xl leading-relaxed font-light">{quote}</p>
      <div className="space-y-1">
        <p className="font-medium">{author}</p>
        <p className="text-sm text-white/80">{role}</p>
      </div>
    </div>
  )
}
export default TestimonialSlide
