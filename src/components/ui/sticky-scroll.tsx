'use client';

import { forwardRef } from 'react';
import { useLocale } from '@/components/LocaleProvider/LocaleProvider';

import './sticky-scroll.css';

type StickyTestimonial = {
  id: number;
  name: string;
  role: string;
  quote: string;
  image: string;
  alt: string;
  cutout?: boolean;
};

const stickyTestimonials: StickyTestimonial[] = [
  {
    id: 1,
    name: 'Arjun Mehta',
    role: 'Site Engineer, Mumbai',
    quote:
      'Bondure systems hold up under real monsoon conditions. Substrate prep, open time, and final bond strength have stayed consistent across every tower we have used them on.',
    image: '/clients/testimonial%201%20png.jpg',
    alt: 'Arjun Mehta, site engineer',
    cutout: true,
  },
  {
    id: 2,
    name: 'Lena Schmidt',
    role: 'Specifier, Hamburg',
    quote:
      'What I appreciate is how clearly each system is documented. Substrate prep, consumption rates and curing — it all translates cleanly to site.',
    image: '/clients/sticky-scroll/german-interview-woman.webp',
    alt: 'Lena Schmidt in a professional interview setting',
  },
  {
    id: 3,
    name: 'Priya Desai',
    role: 'Project Manager, Bengaluru',
    quote:
      'What stood out was how predictable the mixes are on site. The crew gets the same workability batch after batch, which keeps our finishing schedule tight.',
    image: '/clients/testimonial%203%20png.png',
    alt: 'Priya Desai, project manager',
    cutout: true,
  },
  {
    id: 4,
    name: 'Stefan Richter',
    role: 'Contractor, Berlin',
    quote:
      'We used Bondure across a mixed-use tower — AAC joining, screed and tile work. Performance stayed consistent from basement to rooftop.',
    image: '/clients/sticky-scroll/german-interview-man.webp',
    alt: 'Stefan Richter in a site interview',
  },
  {
    id: 5,
    name: 'Rahul Sharma',
    role: 'Technical Lead, Pune',
    quote:
      'We switched to Bondure for AAC block joining and tile adhesive work. Coverage improved, rework dropped, and the technical team was on call whenever we needed them.',
    image: '/clients/testimonial%202%20png.jpg',
    alt: 'Rahul Sharma, technical lead',
    cutout: true,
  },
  {
    id: 6,
    name: 'Helena Weiss',
    role: 'Architect, Frankfurt',
    quote:
      'For high-traffic healthcare interiors we needed systems that balance hygiene, durability and speed. Bondure delivered on all three without compromise.',
    image: '/clients/sticky-scroll/german-interview-team.webp',
    alt: 'Helena Weiss leading a project review interview',
  },
  {
    id: 7,
    name: 'Markus Hoffmann',
    role: 'Site Manager, Munich',
    quote:
      'On our hospital refurbishment in Bavaria, Bondure mortars gave us predictable open time and clean edges — even in cold morning conditions on the slab.',
    image: '/clients/sticky-scroll/interview-office.webp',
    alt: 'Markus Hoffmann in an office interview',
  },
  {
    id: 8,
    name: 'James Mensah',
    role: 'Project Lead, Accra',
    quote:
      'The tile adhesive coverage was right first time. Our crew spent less time re-mixing and more time laying — that alone kept the programme on track.',
    image: '/clients/sticky-scroll/james-mensah.webp',
    alt: 'James Mensah, project lead',
  },
  {
    id: 9,
    name: 'Amara Osei',
    role: 'Developer, London',
    quote:
      'Reliable batch-to-batch consistency meant fewer callbacks on finishing. The technical team answered spec questions before they became site issues.',
    image: '/clients/sticky-scroll/amara-osei.webp',
    alt: 'Amara Osei, developer',
  },
];

const stickyTestimonialsDe = [
  {
    role: 'Bauingenieur, Mumbai',
    quote: 'Bondure Systeme bewähren sich unter realen Monsunbedingungen. Untergrundvorbereitung, offene Zeit und endgültige Haftfestigkeit blieben bei jedem Hochhaus, in dem wir sie eingesetzt haben, konstant.',
    alt: 'Arjun Mehta, Bauingenieur',
  },
  {
    role: 'Planerin, Hamburg',
    quote: 'Ich schätze besonders, wie klar jedes System dokumentiert ist. Untergrundvorbereitung, Verbrauchsmengen und Aushärtung lassen sich allesamt eindeutig auf die Baustelle übertragen.',
    alt: 'Lena Schmidt in einer professionellen Interviewsituation',
  },
  {
    role: 'Projektleiterin, Bengaluru',
    quote: 'Besonders aufgefallen ist uns, wie berechenbar die Mischungen auf der Baustelle sind. Das Team erhält Charge für Charge dieselbe Verarbeitbarkeit, wodurch unser Fertigstellungsplan eingehalten wird.',
    alt: 'Priya Desai, Projektleiterin',
  },
  {
    role: 'Bauunternehmer, Berlin',
    quote: 'Wir haben Bondure in einem gemischt genutzten Hochhaus eingesetzt: für Porenbeton-Fugen, Estrich und Fliesenarbeiten. Die Leistung blieb vom Keller bis zum Dach konstant.',
    alt: 'Stefan Richter bei einem Baustelleninterview',
  },
  {
    role: 'Technischer Leiter, Pune',
    quote: 'Wir sind für Porenbeton-Fugen und Fliesenkleber auf Bondure umgestiegen. Die Ergiebigkeit stieg, Nacharbeiten gingen zurück und das Technikteam war jederzeit erreichbar.',
    alt: 'Rahul Sharma, technischer Leiter',
  },
  {
    role: 'Architektin, Frankfurt',
    quote: 'Für stark frequentierte Innenräume im Gesundheitswesen brauchten wir Systeme, die Hygiene, Haltbarkeit und Geschwindigkeit vereinen. Bondure erfüllte alle drei Anforderungen ohne Kompromisse.',
    alt: 'Helena Weiss leitet ein Interview zur Projektbesprechung',
  },
  {
    role: 'Bauleiter, München',
    quote: 'Bei unserer Krankenhaussanierung in Bayern boten Bondure Mörtel eine berechenbare offene Zeit und saubere Kanten, selbst bei kalten Bedingungen am Morgen auf der Bodenplatte.',
    alt: 'Markus Hoffmann bei einem Bürointerview',
  },
  {
    role: 'Projektleiter, Accra',
    quote: 'Die Ergiebigkeit des Fliesenklebers stimmte vom ersten Versuch an. Unser Team verbrachte weniger Zeit mit erneutem Mischen und mehr Zeit mit Verlegen. Allein das hielt den Zeitplan auf Kurs.',
    alt: 'James Mensah, Projektleiter',
  },
  {
    role: 'Projektentwicklerin, London',
    quote: 'Die zuverlässige Konstanz von Charge zu Charge bedeutete weniger Nachbesserungen beim Ausbau. Das Technikteam beantwortete Spezifikationsfragen, bevor sie auf der Baustelle zum Problem wurden.',
    alt: 'Amara Osei, Projektentwicklerin',
  },
];

function TestimonialHoverStrokes() {
  return (
    <span className="sticky-testimonial-card__strokes" aria-hidden="true">
      <svg className="sticky-testimonial-card__stroke sticky-testimonial-card__stroke--accent" viewBox="0 0 2453 2273" fill="none">
        <path
          pathLength="1"
          d="M227.549 1818.76C227.549 1818.76 406.016 2207.75 569.049 2130.26C843.431 1999.85 -264.104 1002.3 227.549 876.262C552.918 792.849 773.647 2456.11 1342.05 2130.26C1885.43 1818.76 14.9644 455.772 760.548 137.262C1342.05 -111.152 1663.5 2266.35 2209.55 1972.76C2755.6 1679.18 1536.63 384.467 1826.55 137.262C2013.5 -22.1463 2209.55 381.262 2209.55 381.262"
        />
      </svg>
      <svg className="sticky-testimonial-card__stroke sticky-testimonial-card__stroke--base" viewBox="0 0 2250 2535" fill="none">
        <path
          pathLength="1"
          d="M1661.28 2255.51C1661.28 2255.51 2311.09 1960.37 2111.78 1817.01C1944.47 1696.67 718.456 2870.17 499.781 2255.51C308.969 1719.17 2457.51 1613.83 2111.78 963.512C1766.05 313.198 427.949 2195.17 132.281 1455.51C-155.219 736.292 2014.78 891.514 1708.78 252.012C1437.81 -314.29 369.471 909.169 132.281 566.512C18.1772 401.672 244.781 193.012 244.781 193.012"
        />
      </svg>
    </span>
  );
}

function PortraitTestimonialCard({
  testimonial,
  className = '',
}: {
  testimonial: StickyTestimonial;
  className?: string;
}) {
  return (
    <figure
      className={`group sticky-testimonial-card relative overflow-hidden rounded-lg ${className}`}
      key={testimonial.id}
      tabIndex={0}
      aria-label={`${testimonial.name}, ${testimonial.role}`}
    >
      <img
        src={testimonial.image}
        alt={testimonial.alt}
        className={`sticky-testimonial-card__image${testimonial.cutout ? ' sticky-testimonial-card__image--cutout' : ''}`}
        loading="lazy"
        decoding="async"
      />
      <TestimonialHoverStrokes />
      <div className="sticky-testimonial-card__overlay absolute inset-0" aria-hidden="true" />
      <figcaption className="sticky-testimonial-card__caption absolute inset-x-5 bottom-5 z-[3] sm:inset-x-7 sm:bottom-7" aria-hidden="true">
        <blockquote className="sticky-testimonial-card__quote font-[family-name:var(--font-crimson-pro)] text-[0.9rem] leading-[1.35] tracking-[-0.01em] sm:text-base">
          <p>&ldquo;{testimonial.quote}&rdquo;</p>
        </blockquote>
        <div className="mt-2.5 flex items-center gap-2.5">
          <span className="sticky-testimonial-card__rule h-px w-5 bg-[#d8a46b]" aria-hidden="true" />
          <div>
            <p className="sticky-testimonial-card__name font-[family-name:var(--font-manrope)] text-[0.62rem] font-semibold uppercase tracking-[0.18em] sm:text-[0.68rem]">
              {testimonial.name}
            </p>
            <p className="sticky-testimonial-card__role font-[family-name:var(--font-manrope)] text-[0.58rem] tracking-[0.06em] sm:text-[0.62rem]">
              {testimonial.role}
            </p>
          </div>
        </div>
      </figcaption>
      <span className="sr-only">{testimonial.quote}</span>
    </figure>
  );
}

const StickyScroll = forwardRef<HTMLElement>((props, ref) => {
  const { locale } = useLocale();
  const testimonials = locale === 'de'
    ? stickyTestimonials.map((testimonial, index) => ({ ...testimonial, ...stickyTestimonialsDe[index] }))
    : stickyTestimonials;
  const leftTestimonials = testimonials.slice(0, 3);
  const centerTestimonials = testimonials.slice(3, 6);
  const rightTestimonials = testimonials.slice(6, 9);

  return (
    <section
      className="sticky-scroll"
      ref={ref}
      aria-label={locale === 'de' ? 'Kundenstimmen' : 'Client testimonials'}
    >
      <section className="sticky-scroll__panel">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-6 grid gap-2 md:col-span-4">
            {leftTestimonials.map((testimonial) => (
              <PortraitTestimonialCard
                testimonial={testimonial}
                className="h-96"
                key={testimonial.id}
              />
            ))}
          </div>

          <div className="sticky top-0 col-span-6 grid h-screen min-h-0 w-full grid-rows-3 gap-2 md:col-span-4">
            {centerTestimonials.map((testimonial) => (
              <PortraitTestimonialCard
                testimonial={testimonial}
                className="min-h-0"
                key={testimonial.id}
              />
            ))}
          </div>

          <div className="col-span-4 hidden gap-2 md:grid">
            {rightTestimonials.map((testimonial) => (
              <PortraitTestimonialCard
                testimonial={testimonial}
                className="h-96"
                key={testimonial.id}
              />
            ))}
          </div>
        </div>
      </section>
    </section>
  );
});

StickyScroll.displayName = 'StickyScroll';

export default StickyScroll;
