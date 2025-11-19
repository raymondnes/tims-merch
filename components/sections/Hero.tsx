import Image from 'next/image'
import { Button } from '../ui/Button'

export function Hero() {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
              Best Quality
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary mb-6">
              Reflect Your Style
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              A professionally designed e-commerce platform offering a carefully selected catalog of
              high-quality clothing and accessories at competitive prices.
            </p>
            <Button size="lg" className="group">
              Order Now
              <svg
                className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
              </svg>
            </Button>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative aspect-square md:aspect-auto md:h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
              <Image
                src="/images/Ornament 16-1.jpg"
                alt="Fashion model showcasing stylish clothing"
                layout="fill"
                objectFit="cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
