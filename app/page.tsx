import { Hero } from "@/components/home/Hero";
import { LogoStrip } from "@/components/home/LogoStrip";
import { CourseDiscover } from "@/components/home/CourseDiscover";
import { LearningPaths } from "@/components/home/LearningPaths";

export default function Home() {
  return (
    <main>
      <Hero />
      <LogoStrip />
      <CourseDiscover />
      <LearningPaths />
    </main>
  );
}
