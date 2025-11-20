import { Product } from '../types';

// Mock product data for Tim's Merch e-commerce store
export const products: Product[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    name: "Tim's Classic Logo T-Shirt",
    description: 'Premium quality cotton t-shirt featuring the iconic Tim\'s Merch logo. Comfortable, breathable, and perfect for everyday wear. Made from 100% organic cotton with a modern fit.',
    price: 29.99,
    category: 'T-Shirts',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White', 'Navy', 'Gray'],
    inStock: true,
    stockQuantity: 150,
    featured: true,
    createdAt: new Date('2024-01-15').toISOString(),
    updatedAt: new Date('2024-01-15').toISOString(),
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    name: 'Premium Hoodie - Winter Collection',
    description: 'Stay warm and stylish with our premium hoodie. Features a soft fleece interior, adjustable drawstring hood, and kangaroo pocket. Perfect for cold weather.',
    price: 59.99,
    category: 'Hoodies',
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Gray', 'Navy', 'Burgundy'],
    inStock: true,
    stockQuantity: 85,
    featured: true,
    createdAt: new Date('2024-01-10').toISOString(),
    updatedAt: new Date('2024-01-10').toISOString(),
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    name: 'Athletic Performance Tank',
    description: 'Lightweight and breathable athletic tank top designed for maximum performance. Moisture-wicking fabric keeps you dry during intense workouts.',
    price: 24.99,
    category: 'Athletic Wear',
    images: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800',
      'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=800',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Red', 'Blue'],
    inStock: true,
    stockQuantity: 120,
    featured: false,
    createdAt: new Date('2024-01-20').toISOString(),
    updatedAt: new Date('2024-01-20').toISOString(),
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440004',
    name: 'Snapback Cap - Limited Edition',
    description: 'Exclusive snapback cap with embroidered Tim\'s logo. Adjustable strap ensures perfect fit. Limited edition run of 500 units.',
    price: 34.99,
    category: 'Accessories',
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800',
      'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=800',
    ],
    sizes: ['One Size'],
    colors: ['Black', 'Navy', 'White', 'Red'],
    inStock: true,
    stockQuantity: 45,
    featured: true,
    createdAt: new Date('2024-01-05').toISOString(),
    updatedAt: new Date('2024-01-05').toISOString(),
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440005',
    name: 'Jogger Pants - Comfort Fit',
    description: 'Ultra-comfortable jogger pants with elastic waistband and cuffed ankles. Perfect blend of style and comfort for casual wear.',
    price: 49.99,
    category: 'Bottoms',
    images: [
      'https://images.unsplash.com/photo-1608748010899-18f300247112?w=800',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Gray', 'Navy', 'Olive'],
    inStock: true,
    stockQuantity: 95,
    featured: false,
    createdAt: new Date('2024-01-12').toISOString(),
    updatedAt: new Date('2024-01-12').toISOString(),
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440006',
    name: 'Long Sleeve Henley',
    description: 'Classic long-sleeve henley with button placket. Versatile piece that works for both casual and semi-formal occasions.',
    price: 39.99,
    category: 'T-Shirts',
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800',
      'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=800',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Gray', 'Black', 'Navy'],
    inStock: true,
    stockQuantity: 70,
    featured: false,
    createdAt: new Date('2024-01-18').toISOString(),
    updatedAt: new Date('2024-01-18').toISOString(),
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440007',
    name: 'Zip-Up Track Jacket',
    description: 'Retro-inspired track jacket with full zip closure and side pockets. Lightweight and perfect for layering.',
    price: 54.99,
    category: 'Jackets',
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800',
      'https://images.unsplash.com/photo-1548126032-079d27c37ebf?w=800',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Navy', 'Green', 'Burgundy'],
    inStock: true,
    stockQuantity: 60,
    featured: true,
    createdAt: new Date('2024-01-08').toISOString(),
    updatedAt: new Date('2024-01-08').toISOString(),
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440008',
    name: 'Cotton Crew Socks - 3 Pack',
    description: 'Premium cotton crew socks in a convenient 3-pack. Reinforced heel and toe for durability. Comfortable cushioning throughout.',
    price: 18.99,
    category: 'Accessories',
    images: [
      'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=800',
    ],
    sizes: ['S (6-8)', 'M (9-11)', 'L (12-14)'],
    colors: ['Black', 'White', 'Gray'],
    inStock: true,
    stockQuantity: 200,
    featured: false,
    createdAt: new Date('2024-01-22').toISOString(),
    updatedAt: new Date('2024-01-22').toISOString(),
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440009',
    name: 'Graphic Print T-Shirt - Artist Series',
    description: 'Limited edition t-shirt featuring artwork from local artists. Unique designs that make a statement. 100% cotton.',
    price: 34.99,
    category: 'T-Shirts',
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800',
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White'],
    inStock: true,
    stockQuantity: 55,
    featured: true,
    createdAt: new Date('2024-01-25').toISOString(),
    updatedAt: new Date('2024-01-25').toISOString(),
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440010',
    name: 'Crossbody Messenger Bag',
    description: 'Durable canvas messenger bag with adjustable strap and multiple compartments. Perfect for daily commute or casual outings.',
    price: 44.99,
    category: 'Accessories',
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800',
    ],
    sizes: ['One Size'],
    colors: ['Black', 'Navy', 'Olive', 'Tan'],
    inStock: false,
    stockQuantity: 0,
    featured: false,
    createdAt: new Date('2024-01-03').toISOString(),
    updatedAt: new Date('2024-02-01').toISOString(),
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440011',
    name: 'Performance Shorts',
    description: 'Lightweight athletic shorts with built-in liner and zippered pocket. Perfect for running, gym, or casual wear.',
    price: 32.99,
    category: 'Bottoms',
    images: [
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800',
      'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Gray', 'Olive'],
    inStock: true,
    stockQuantity: 110,
    featured: false,
    createdAt: new Date('2024-01-14').toISOString(),
    updatedAt: new Date('2024-01-14').toISOString(),
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440012',
    name: 'Beanie - Winter Essential',
    description: 'Warm and cozy beanie made from soft acrylic blend. Stretchable fit with fold-over cuff. Perfect for cold weather.',
    price: 19.99,
    category: 'Accessories',
    images: [
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800',
      'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=800',
    ],
    sizes: ['One Size'],
    colors: ['Black', 'Gray', 'Navy', 'Burgundy', 'Olive'],
    inStock: true,
    stockQuantity: 140,
    featured: false,
    createdAt: new Date('2024-01-07').toISOString(),
    updatedAt: new Date('2024-01-07').toISOString(),
  },
];

// Helper function to get products by category
export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((product) => product.category === category);
};

// Helper function to get featured products
export const getFeaturedProducts = (): Product[] => {
  return products.filter((product) => product.featured);
};

// Helper function to get in-stock products
export const getInStockProducts = (): Product[] => {
  return products.filter((product) => product.inStock);
};

// Get all unique categories
export const getCategories = (): string[] => {
  return Array.from(new Set(products.map((product) => product.category)));
};
