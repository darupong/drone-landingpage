import { Navbar } from '@/sections/Navbar'
import { Hero } from '@/sections/Hero'
import { Features } from '@/sections/Features'
import { Process } from '@/sections/Process'
import { Showcase } from '@/sections/Showcase'
import { Testimonials } from '@/sections/Testimonials'
import { Pricing } from '@/sections/Pricing'
import { Faq } from '@/sections/Faq'
import { Cta } from '@/sections/Cta'
import { Footer } from '@/sections/Footer'
import { SeoHead } from '@/components/SeoHead'

export default function Home() {
  const portfolioHref = '/portfolio'

  return (
    <>
      <SeoHead path="/" jsonLdType="home" />
      <Navbar />
      <main id="main">
        <Hero portfolioHref={portfolioHref} />
        <Features />
        <Process />
        <Showcase />
        <Testimonials portfolioHref={portfolioHref} />
        <Pricing />
        <Faq />
        <Cta portfolioHref={portfolioHref} />
      </main>
      <Footer />
    </>
  )
}
