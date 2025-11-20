export interface Product {
  id: string | number
  name: string
  description: string
  price: number
  image: string
  images?: string[]
  category: string
  sizes?: string[]
  colors?: string[]
  stock: number
  isNew?: boolean
  discount?: number
  rating?: number
  reviews?: number
}

export interface CartItem extends Product {
  quantity: number
  selectedSize?: string
  selectedColor?: string
}
