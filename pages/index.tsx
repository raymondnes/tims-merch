import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { Hero } from '../components/sections/Hero'
import { Features } from '../components/sections/Features'
import { NewArrivals } from '../components/sections/NewArrivals'
import { DeliveryInfo } from '../components/sections/DeliveryInfo'
import { BusinessSection } from '../components/sections/BusinessSection'
import { Product } from '../types/product'
import { getProducts } from '../lib/api/client'

interface HomeProps {
  products: Product[]
}

export default function Home({ products }: HomeProps) {
  return (
    <>
      <Head>
        <title>Tim&apos;s Merch - Quality Merch & Delivery Service</title>
        <meta name="description" content="Shop high-quality merchandise and enjoy reliable delivery services with Tim's Merch" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Hero />
      <Features />
      <NewArrivals products={products} />
      <DeliveryInfo />
      <BusinessSection />
    </>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  try {
    // Fetch featured/new arrival products from the API
    // Use absolute URL for server-side fetching
    const baseUrl = 'http://localhost:3000'
    const url = `${baseUrl}/api/products?limit=8&sortBy=newest`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`)
    }

    const { products } = await response.json()

    return {
      props: {
        products,
      },
    }
  } catch (error) {
    console.error('Failed to fetch products:', error)

    // Return empty products array on error
    return {
      props: {
        products: [],
      },
    }
  }
}
