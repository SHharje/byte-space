import { Hero } from "@/components/home/Hero";
import { LogoStrip } from "@/components/home/LogoStrip";
import { CourseDiscover } from "@/components/home/CourseDiscover";
import { LearningPaths } from "@/components/home/LearningPaths";
import { ProfessionalGrowth } from "@/components/home/ProfessionalGrowth";
import { CreatorCTA } from "@/components/home/CreatorCTA";
import { Testimonials } from "@/components/home/Testimonials";
import { Footer } from "@/components/home/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <LogoStrip />
      <CourseDiscover />
      <LearningPaths />
      <ProfessionalGrowth />
      <CreatorCTA />
      <Testimonials />
      <Footer />
    </main>
  );
}
