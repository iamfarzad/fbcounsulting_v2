"use client"

import { useAIInterface } from "./ai-interface-provider"
import AIInterface from "./ai-interface"

export default function HeroSection() {
  const { isChatActive, isVoiceActive } = useAIInterface()

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Dot pattern background */}
      <div className="absolute inset-0 dot-pattern opacity-50 -z-10"></div>

      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          {/* Location indicator */}
          <div className="inline-flex items-center mb-6 text-text-secondary">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Hi Oslo Innovator</span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">How can AI automation help your business?</h1>

          {/* Subheading */}
          <p className="text-text-secondary text-lg mb-8">
            Ask me anything about AI automation, workflow optimization, or
            <br />
            how to reduce costs with intelligent systems
          </p>

          {/* Chat interface */}
          <AIInterface />

          {/* CTA Button */}
          <div
            className={`mt-10 transition-opacity duration-300 ${isChatActive || isVoiceActive ? "opacity-0" : "opacity-100"}`}
          >
            <a
              href="#contact"
              className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/90 transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Book Free Consultation
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

