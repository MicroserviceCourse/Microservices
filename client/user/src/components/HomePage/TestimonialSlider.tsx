import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const testimonials = [
  {
    name: "William Jones",
    role: "Designer",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut ullamcorper leo, eget euismod orci. Cum sociis natoque penatibus et magnis dis parturient montes.",
  },
  {
    name: "Sarah Lee",
    role: "Marketing Manager",
    message:
      "Aliquam erat volutpat. Praesent placerat, orci nec feugiat tincidunt, nisi quam vulputate augue, a bibendum velit nulla a nulla.",
  },
  {
    name: "David Kim",
    role: "Product Owner",
    message:
      "Sed at lorem quis velit tincidunt fermentum. Integer id urna id purus malesuada fermentum sed nec erat.",
  },
];

const TestimonialSlider = () => {
  const [index, setIndex] = useState(0);

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const { name, role, message } = testimonials[index];

  return (
    <section className="bg-white py-20 px-4 text-center relative overflow-hidden">
      <h2 className="text-3xl sm:text-4xl font-semibold capitalize">
        what <span className="font-bold">they’re saying</span>
      </h2>

      <div className="w-20 h-[2px] bg-black mx-auto mt-4 mb-8" />

      {/* Animated content container */}
      <div
        key={index}
        className="transition-all duration-500 ease-in-out animate-fade-slide"
      >
        <p className="max-w-3xl mx-auto text-gray-500 text-lg leading-relaxed mb-8">
          {message}
        </p>
        <div className="text-lg font-semibold text-black">{name}</div>
        <div className="text-gray-400 text-sm">{role}</div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 text-2xl text-gray-400 hover:text-black"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 text-2xl text-gray-400 hover:text-black"
      >
        <FaChevronRight />
      </button>
    </section>
  );
};

export default TestimonialSlider;
