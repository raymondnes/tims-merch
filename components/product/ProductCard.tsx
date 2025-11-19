import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '../ui/Badge'

interface ProductCardProps {
  id: string | number
  name: string
  price: number
  image: string
  category?: string
  isNew?: boolean
  discount?: number
}

export function ProductCard({
  id,
  name,
  price,
  image,
  category,
  isNew = false,
  discount = 0,
}: ProductCardProps) {
  const discountedPrice = discount > 0 ? price * (1 - discount / 100) : price

  return (
    <Link href={`/products/${id}`}>
      <a className="group">
        <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200">
          {/* Product Image */}
          <div className="relative aspect-square bg-gray-100">
            <Image
              src={image}
              alt={name}
              layout="fill"
              objectFit="cover"
              className="group-hover:scale-105 transition-transform duration-300"
            />
            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-2">
              {isNew && <Badge variant="primary">New</Badge>}
              {discount > 0 && <Badge variant="danger">-{discount}%</Badge>}
            </div>
          </div>

          {/* Product Info */}
          <div className="p-4">
            {category && (
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                {category}
              </p>
            )}
            <h3 className="text-sm font-medium text-secondary mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {name}
            </h3>
            <div className="flex items-center gap-2">
              {discount > 0 ? (
                <>
                  <span className="text-lg font-bold text-primary">
                    ${discountedPrice.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    ${price.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-lg font-bold text-secondary">
                  ${price.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}
