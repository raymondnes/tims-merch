import Image from 'next/image'
import { CartItem as CartItemType } from '../../types/product'

interface CartItemProps {
  item: CartItemType
  onUpdateQuantity: (id: string | number, quantity: number) => void
  onRemove: (id: string | number) => void
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <div className="flex gap-4 p-4 bg-white rounded-lg border border-gray-200">
      {/* Product Image */}
      <div className="relative w-24 h-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Product Info */}
      <div className="flex-grow">
        <h3 className="font-medium text-secondary mb-1">{item.name}</h3>
        <p className="text-sm text-gray-500 mb-2">
          {item.selectedSize && `Size: ${item.selectedSize}`}
          {item.selectedSize && item.selectedColor && ' | '}
          {item.selectedColor && `Color: ${item.selectedColor}`}
        </p>
        <p className="text-lg font-bold text-primary">
          ${item.price.toFixed(2)}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex flex-col items-end justify-between">
        <button
          onClick={() => onRemove(item.id)}
          className="text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Remove item"
        >
          <Image src="/icons/delete.svg" alt="Delete" width={20} height={20} />
        </button>

        <div className="flex items-center gap-2 border border-gray-300 rounded-md">
          <button
            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
            className="px-3 py-1 hover:bg-gray-100 transition-colors"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="px-3 py-1 min-w-[2rem] text-center">
            {item.quantity}
          </span>
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="px-3 py-1 hover:bg-gray-100 transition-colors"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}
