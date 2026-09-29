import Image from "next/image";
import { Reveal, RevealGroup } from "@/components/ui";

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  avatarSrc: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sarah M.",
    role: "Enthusiastic Learner",
    quote:
      '"ByteSpace has transformed my approach to learning. The diverse range of courses and the quality of content provided by creators have exceeded my expectations. The platform truly fosters a sense of community and lifelong learning."',
    avatarSrc: "/images/avatars/avatar-1.png",
  },
  {
    name: "James L.",
    role: "Lifelong Learner",
    quote:
      '"I\'ve tried several online learning platforms, and ByteSpace stands out for its vibrant community and the variety of courses available. The easy navigation and engaging content make it a go-to platform for continuous skill development."',
    avatarSrc: "/images/avatars/avatar-2.png",
  },
  {
    name: "Alex B.",
    role: "Inspired Creator",
    quote:
      '"As a creator, ByteSpace has been a game-changer for me. The Course Editor is user-friendly, and the support from the community is incredible. It\'s fulfilling to see my courses making a positive impact on learners globally."',
    avatarSrc: "/images/avatars/avatar-3.png",
  },
];

export function Testimonials() {
  return (
    <section
      className="relative overflow-hidden py-20 sm:py-24"
      style={{
        backgroundColor: "#FAFAFD",
        backgroundImage: [
          "radial-gradient(circle at 82% 10%, rgba(220, 255, 120, 0.55) 0%, rgba(220, 255, 120, 0.22) 32%, rgba(220, 255, 120, 0) 58%)",
          "radial-gradient(circle at 4% 96%, rgba(160, 185, 245, 0.5) 0%, rgba(160, 185, 245, 0.2) 28%, rgba(160, 185, 245, 0) 55%)",
        ].join(", "),
      }}
    >
      <div className="mx-auto w-full max-w-[1200px] px-6 max-sm:px-4">
        {/* ══════════════════════════════════════════════════
            HEADING ROW (Two-column, left-aligned)
            ══════════════════════════════════════════════════ */}
        <Reveal className="flex flex-col gap-6 min-[900px]:flex-row min-[900px]:items-start min-[900px]:justify-between min-[900px]:gap-12">
          {/* Left Column (~45% width): H2 */}
          <div className="w-full min-[900px]:max-w-[430px]">
            <h2
              className="text-[30px] font-bold leading-[1.25] tracking-[-0.01em] text-ink sm:text-[34px] md:text-[36px]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Discover What Our
              <br className="hidden sm:inline" /> Community Is Saying
            </h2>
          </div>

          {/* Right Column (~55% width): Paragraph */}
          <div className="w-full min-[900px]:max-w-[570px] min-[900px]:pt-1.5">
            <p
              className="text-[15px] leading-[1.6] text-muted sm:text-[16px]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              At ByteSpace, our vibrant community of learners and creators is at
              the heart of what we do. Hear directly from those who have
              experienced the transformative journey of learning and creating on
              our platform. Explore testimonials that reflect the diverse
              perspectives of enthusiastic learners and accomplished creators.
            </p>
          </div>
        </Reveal>

        {/* ══════════════════════════════════════════════════
            TESTIMONIAL CARDS ROW (1 col mobile, 3 cols desktop)
            ══════════════════════════════════════════════════ */}
        <RevealGroup className="mt-12 grid grid-cols-1 items-stretch gap-6 min-[900px]:mt-14 min-[900px]:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <article
              key={item.name}
              className="flex flex-col rounded-[16px] bg-white p-7 shadow-[0_12px_32px_rgba(20,20,60,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(20,20,60,0.1)] sm:p-8"
            >
              {/* Avatar Photo */}
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
                <Image
                  src={item.avatarSrc}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Name */}
              <h3
                className="mt-4 text-[17px] font-bold text-ink"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {item.name}
              </h3>

              {/* Role */}
              <p
                className="mt-0.5 text-[14px] font-medium text-[#3B5BFF]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {item.role}
              </p>

              {/* Quote */}
              <p
                className="mt-4 text-[15px] leading-[1.6] text-muted"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {item.quote}
              </p>
            </article>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
