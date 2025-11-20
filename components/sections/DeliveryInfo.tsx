import Image from 'next/image'
import { Button } from '../ui/Button'
import { Card, CardContent } from '../ui/Card'

export function DeliveryInfo() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
              Quick & Safe Delivery of Packages
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              We know how important it is to get your items safely and quickly.
              Our professional delivery service offers fast, secure, and tracked
              delivery of packages directly to your doorstep.
            </p>

            {/* Features List */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-secondary mb-1">Track your package in real-time</h4>
                  <p className="text-sm text-gray-600">Monitor your delivery every step of the way</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-secondary mb-1">Secure handling of all packages</h4>
                  <p className="text-sm text-gray-600">Your items are handled with utmost care</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-secondary mb-1">Express delivery available</h4>
                  <p className="text-sm text-gray-600">Get your packages faster with premium options</p>
                </div>
              </div>
            </div>

            <Button size="lg" className="bg-primary hover:bg-primary-dark">
              Request Delivery
            </Button>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            <Card padding="none" className="overflow-hidden">
              <div className="relative aspect-square">
                <Image
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&q=80"
                  alt="Delivery service - packages ready for shipping"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </Card>
            <Card padding="none" className="overflow-hidden mt-8">
              <div className="relative aspect-square">
                <Image
                  src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=500&q=80"
                  alt="Package handling with care"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
