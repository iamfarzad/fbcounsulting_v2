import Image from "next/image"

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "CTO, TechCorp",
      image: "/placeholder.svg?height=64&width=64",
      quote:
        "F.B Consulting helped us implement AI solutions that reduced our operational costs by 35% while improving customer satisfaction scores.",
    },
    {
      name: "Michael Chen",
      position: "CEO, Innovate Inc",
      image: "/placeholder.svg?height=64&width=64",
      quote:
        "The team at F.B Consulting delivered exceptional results. Their AI automation solutions streamlined our workflows and boosted productivity across departments.",
    },
    {
      name: "Emily Rodriguez",
      position: "Operations Director, Global Systems",
      image: "/placeholder.svg?height=64&width=64",
      quote:
        "Working with F.B Consulting transformed our business processes. Their expertise in AI and automation is unmatched in the industry.",
    },
  ]

  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            We've helped businesses across industries leverage AI to achieve their goals. Here's what some of our
            clients have to say about working with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white dark:bg-dark-light rounded-lg p-6 shadow-custom border border-gray-100 dark:border-dark"
            >
              <div className="mb-6">
                <svg className="w-8 h-8 text-primary/30" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-text-secondary dark:text-gray-300 mb-6 italic">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-text-secondary text-sm">{testimonial.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

