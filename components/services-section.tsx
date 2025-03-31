import { Code, BarChart3, Zap, Users } from "lucide-react"

export default function ServicesSection() {
  const services = [
    {
      title: "AI Consulting",
      description: "Strategic guidance on implementing AI solutions tailored to your business needs.",
      icon: <Users className="w-6 h-6 text-primary" />,
    },
    {
      title: "Process Automation",
      description: "Streamline workflows and reduce manual tasks with intelligent automation.",
      icon: <Zap className="w-6 h-6 text-primary" />,
    },
    {
      title: "Machine Learning",
      description: "Custom ML models to extract insights and drive data-based decision making.",
      icon: <BarChart3 className="w-6 h-6 text-primary" />,
    },
    {
      title: "AI Development",
      description: "Build custom AI solutions that integrate seamlessly with your existing systems.",
      icon: <Code className="w-6 h-6 text-primary" />,
    },
  ]

  return (
    <section id="services" className="py-20 bg-gray-50 dark:bg-dark-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Our Services</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            We provide comprehensive AI solutions to help businesses optimize operations, reduce costs, and drive growth
            through intelligent automation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white dark:bg-dark rounded-lg p-6 shadow-custom hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px]"
            >
              <div className="mb-4 p-3 bg-primary/10 rounded-lg inline-block">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-text-secondary dark:text-gray-400">{service.description}</p>
              <a href="#" className="mt-4 inline-flex items-center text-primary font-medium hover:underline">
                Learn more
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

