import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Footer } from "@/components/home/Footer";
import { CourseHero } from "@/components/course-detail/CourseHero";
import { CourseTabs } from "@/components/course-detail/CourseTabs";
import { CourseSidebar } from "@/components/course-detail/CourseSidebar";
import { getCourseDetailBySlug } from "@/data/courses-detail";

interface CoursePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return [{ slug: "build-digital-asset-a-comprehensive-guide" }];
}

export default async function CourseDetailPage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = getCourseDetailBySlug(slug);

  if (!course) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      {/* ── Course Hero (includes light Navbar and GridBackground) ── */}
      <CourseHero course={course} />

      {/* ── Two-column Layout: Tabs/Content Left (65%), Sticky Sidebar Right (35%) ── */}
      <section className="relative z-20 pb-20 pt-10 lg:pt-12">
        <Container className="max-w-[1440px] px-6 lg:px-[60px]">
          <div className="flex flex-col lg:flex-row lg:items-start gap-10">
            {/* Left Column (~65% width: CourseTabs + tab content) */}
            <div className="w-full lg:w-[65%] min-w-0">
              <CourseTabs course={course} />
            </div>

            {/* Right Column (~35% width: sticky wrapper that stops before footer) */}
            <div className="w-full lg:w-[35%] shrink-0 relative z-30 lg:sticky lg:top-6 mt-10 lg:-mt-[510px]">
              <CourseSidebar course={course} />
            </div>
          </div>
        </Container>
      </section>

      {/* ── Footer ── */}
      <Footer />
    </main>
  );
}
