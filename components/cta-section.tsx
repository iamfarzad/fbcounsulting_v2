export default function CTASection() {
  return (
    <section className="py-20 bg-primary-light dark:bg-dark-light">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to transform your business with AI?</h2>
          <p className="text-text-secondary dark:text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Schedule a free consultation with our experts to discover how AI automation can help your business reduce
            costs and improve efficiency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="btn-primary px-8 py-3 text-lg">
              Book Your Free Consultation
            </a>
            <a href="#services" className="btn-secondary px-8 py-3 text-lg">
              Explore Our Services
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

