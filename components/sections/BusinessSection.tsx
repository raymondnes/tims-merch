import { Button } from '../ui/Button'

export function BusinessSection() {
  return (
    <section className="py-16 bg-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Everything your business needs
          </h2>
          <p className="text-gray-300 mb-8 text-lg leading-relaxed">
            We combine a top-notch e-commerce platform with a comprehensive
            logistics solution. Get your own online store and handle all your
            shipping needs in one place. Scale easily, track efficiently, and
            deliver reliably.
          </p>
          <Button variant="primary" size="lg" className="bg-primary hover:bg-primary-dark">
            Get Started
          </Button>
        </div>
      </div>
    </section>
  )
}
