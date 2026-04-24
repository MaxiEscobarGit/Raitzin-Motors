import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ReviewsSection } from "@/components/reviews-section"
import { SearchSection } from "@/components/search-section"
import { TagsSection } from "@/components/tags-section"
import { ServicesSection } from "@/components/services-section"
import { VehiclesSection } from "@/components/vehicles-section"
import { ContactSection, Footer } from "@/components/contact-section"

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <TagsSection />
      <SearchSection />
      <VehiclesSection />
      <ServicesSection />
      <ReviewsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
