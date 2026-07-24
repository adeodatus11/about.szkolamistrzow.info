"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useState } from "react";

type Lang = "pl" | "en";

const sections = ["start", "manifest", "paths", "practice", "projects", "jubilee", "contact"];

type PageContent = {
  nav: string[];
  heroKicker: string;
  heroTitle: string;
  heroLead: string;
  primaryCta: string;
  secondaryCta: string;
  stats: string[][];
  manifestTitle: string;
  manifestLead: string;
  values: string[][];
  pathsTitle: string;
  pathsLead: string;
  paths: string[][];
  practiceTitle: string;
  practiceLead: string;
  practice: string[][];
  projectsTitle: string;
  projectsLead: string;
  projects: string[][];
  jubileeTitle: string;
  jubileeLead: string;
  finaleTitle: string;
  finaleLead: string;
  links: string[][];
};

const content = {
  pl: {
    nav: ["Idea", "Ścieżki", "Praktyka", "Projekty", "80-lecie"],
    heroKicker: "Zespół Szkół Zawodowych nr 5 we Wrocławiu",
    heroTitle: "Szkoła, w której zawód staje się przyszłością",
    heroLead:
      "Łączymy tradycję rzemiosła, nowoczesne pracownie i naukę blisko prawdziwego rynku pracy.",
    primaryCta: "Poznaj szkołę",
    secondaryCta: "Rekrutacja",
    stats: [
      ["80+", "lat tradycji"],
      ["4", "ścieżki kształcenia"],
      ["PL/EN", "gotowe do prezentacji"],
    ],
    manifestTitle: "To miejsce ma tempo warsztatu i pamięć szkoły z historią.",
    manifestLead:
      "ZSZ nr 5 pokazuje, że edukacja zawodowa może być konkretna, ambitna i bliska ludziom. Uczeń widzi efekt pracy, poznaje standardy branży i uczy się odpowiedzialności za własny rozwój.",
    values: [
      ["Tradycja", "Szkoła wyrasta z historii Wrocławia i codziennej pracy wielu pokoleń nauczycieli, uczniów oraz mistrzów zawodu."],
      ["Rzemiosło", "Najważniejsze są umiejętności: dobrze wykonane zadanie, dokładność, kultura pracy i kontakt z klientem."],
      ["Nowoczesność", "Pracownie, projekty i współpraca z otoczeniem pomagają łączyć szkolną naukę z realnymi oczekiwaniami rynku."],
    ],
    pathsTitle: "Jedna szkoła, kilka dróg do zawodu",
    pathsLead:
      "Strona nie zastępuje rekrutacji. Pokazuje logikę szkoły: różne tempo nauki, wspólny cel i praktyczne przygotowanie.",
    paths: [
      ["Technikum", "Dłuższa ścieżka z maturą, kwalifikacjami zawodowymi i przygotowaniem do dalszej nauki lub pracy."],
      ["Branżowa I stopnia", "Praktyczna droga do zawodu z dużym naciskiem na naukę w realnym środowisku pracy."],
      ["Branżowa II stopnia", "Kontynuacja edukacji dla osób, które chcą rozwijać kwalifikacje i otworzyć drogę do matury."],
      ["KKZ", "Kwalifikacyjne kursy zawodowe dla osób, które chcą zdobyć lub uzupełnić konkretne kwalifikacje."],
    ],
    practiceTitle: "Uczymy w praktyce",
    practiceLead:
      "Najlepsza opowieść o szkole jest w pracowniach. Tam widać narzędzia, rytm zajęć i wymagania zawodu.",
    practice: [
      ["Gastronomia i cukiernictwo", "Technika, smak, organizacja pracy i konkursowa precyzja.", "/photos/gastronomy-tools.webp", "Narzędzia i produkty w pracowni gastronomiczno-cukierniczej"],
      ["Fryzjerstwo", "Estetyka, kontakt z człowiekiem i praca na realnym stanowisku.", "/photos/hair-lab.webp", "Pracownia fryzjerska z lustrami i stanowiskami"],
      ["Handel", "Obsługa klienta, ekspozycja, sprzedaż i codzienna organizacja sklepu.", "/photos/trade-lab.webp", "Kasa i wyposażenie pracowni handlowej"],
      ["Aktywność", "Ruch, zespół i szkolna codzienność poza samą salą lekcyjną.", "/photos/gym.webp", "Uczniowie ćwiczący na sali gimnastycznej"],
    ],
    projectsTitle: "Projekty otwierają szkołę na zewnątrz",
    projectsLead:
      "W projektach szkoła spotyka pracodawców, partnerów edukacyjnych i międzynarodowe środowisko kształcenia zawodowego.",
    projects: [
      ["COVE", "Współpraca wokół centrów doskonałości zawodowej i jakości nowoczesnego VET."],
      ["WIN4SMEs", "Międzynarodowe działania wzmacniające kompetencje potrzebne w małych i średnich przedsiębiorstwach."],
      ["Zawodowo w przyszłość", "Rozwój umiejętności uczniów i kadry we współpracy z lokalnym rynkiem pracy."],
      ["Modernizacja", "Inwestycje miejskie i energetyczne, które wzmacniają warunki nauki w zabytkowych budynkach oświatowych."],
    ],
    jubileeTitle: "80 lat szkoły to nie archiwum. To punkt startu.",
    jubileeLead:
      "Jubileusz pokazuje ciągłość: ludzie, miejsca, zawody i wspólnota, która potrafi zmieniać się razem z Wrocławiem.",
    finaleTitle: "Dalej: szczegóły, rekrutacja i aktualności",
    finaleLead:
      "Ta strona jest krótką prezentacją. Pełne informacje są w serwisach szkoły.",
    links: [
      ["Strona rekrutacyjna", "https://www.szkolamistrzow.info/"],
      ["Strona główna szkoły", "https://zsz5.edupage.org/"],
      ["Projekty", "https://zsz5.edupage.org/a/projekty"],
    ],
  },
  en: {
    nav: ["Idea", "Paths", "Practice", "Projects", "80 years"],
    heroKicker: "Vocational School Complex No. 5 in Wroclaw",
    heroTitle: "A school where skills become a future",
    heroLead:
      "We connect craft tradition, modern workshops and learning close to the real labour market.",
    primaryCta: "Explore the school",
    secondaryCta: "Admissions",
    stats: [
      ["80+", "years of tradition"],
      ["4", "learning paths"],
      ["PL/EN", "presentation ready"],
    ],
    manifestTitle: "This place has the pace of a workshop and the memory of a school with history.",
    manifestLead:
      "ZSZ No. 5 shows that vocational education can be practical, ambitious and close to people. Students see the result of their work, learn industry standards and take responsibility for their growth.",
    values: [
      ["Tradition", "The school grows from Wroclaw's history and the daily work of generations of teachers, students and vocational masters."],
      ["Craft", "Skills come first: a well completed task, precision, work culture and contact with customers."],
      ["Modernity", "Workshops, projects and cooperation with the environment connect school learning with real market expectations."],
    ],
    pathsTitle: "One school, several paths to a profession",
    pathsLead:
      "This page does not replace admissions. It explains the school: different learning rhythms, one shared goal and practical preparation.",
    paths: [
      ["Technical school", "A longer path with final exams, vocational qualifications and preparation for further education or work."],
      ["Stage I sectoral school", "A practical route to a profession with strong focus on learning in a real workplace."],
      ["Stage II sectoral school", "A continuation path for students who want to develop qualifications and open the way to final exams."],
      ["Vocational courses", "Qualification courses for people who want to gain or complete specific professional skills."],
    ],
    practiceTitle: "We teach through practice",
    practiceLead:
      "The strongest story about the school is inside the workshops. You can see the tools, the rhythm of classes and the standards of work.",
    practice: [
      ["Gastronomy and confectionery", "Technique, taste, work organisation and competition-level precision.", "/photos/gastronomy-tools.webp", "Tools and ingredients in the gastronomy and confectionery workshop"],
      ["Hairdressing", "Aesthetics, contact with people and learning at a real workstation.", "/photos/hair-lab.webp", "Hairdressing classroom with mirrors and workstations"],
      ["Retail and trade", "Customer service, display, sales and the everyday organisation of a store.", "/photos/trade-lab.webp", "Cash register and equipment in the trade workshop"],
      ["Activity", "Movement, teamwork and school life beyond the classroom.", "/photos/gym.webp", "Students exercising in the school gym"],
    ],
    projectsTitle: "Projects open the school to the world",
    projectsLead:
      "Through projects, the school meets employers, education partners and the international vocational education community.",
    projects: [
      ["COVE", "Cooperation around centres of vocational excellence and the quality of modern VET."],
      ["WIN4SMEs", "International activities strengthening skills needed in small and medium-sized enterprises."],
      ["Professionally into the future", "Development of student and teacher skills in cooperation with the local labour market."],
      ["Modernisation", "Municipal and energy investments improving learning conditions in historic education buildings."],
    ],
    jubileeTitle: "80 years of school is not an archive. It is a starting point.",
    jubileeLead:
      "The jubilee shows continuity: people, places, professions and a community that can change together with Wroclaw.",
    finaleTitle: "Next: details, admissions and news",
    finaleLead:
      "This page is a short presentation. Full information is available on the school's websites.",
    links: [
      ["Admissions website", "https://www.szkolamistrzow.info/"],
      ["Main school website", "https://zsz5.edupage.org/"],
      ["Projects", "https://zsz5.edupage.org/a/projekty"],
    ],
  },
} satisfies Record<Lang, PageContent>;

const navTargets = ["manifest", "paths", "practice", "projects", "jubilee"];

const gallery = [
  ["/photos/school-building.webp", "Główne wejście do szkoły"],
  ["/photos/library.webp", "Biblioteka szkolna"],
  ["/photos/eu-cooperation.webp", "Flagi Unii Europejskiej i państw europejskich"],
  ["/photos/hair-contest.webp", "Uczestnicy konkursu fryzjerskiego"],
  ["/photos/contest.webp", "Praca konkursowa w turnieju cukierniczym"],
  ["/photos/jubilee-stage.webp", "Uroczystość jubileuszowa szkoły"],
  ["/photos/jubilee-award.webp", "Wręczenie wyróżnienia podczas jubileuszu"],
];

function useLanguage() {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === "undefined") return "pl";
    const stored = window.localStorage.getItem("zsz5-lang");
    return stored === "pl" || stored === "en" ? stored : "pl";
  });

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const chooseLang = (nextLang: Lang) => {
    setLang(nextLang);
    window.localStorage.setItem("zsz5-lang", nextLang);
    document.documentElement.lang = nextLang;
  };

  return [lang, chooseLang] as const;
}

function useSectionKeys() {
  useEffect(() => {
    const move = (direction: 1 | -1) => {
      const current = sections
        .map((id) => document.getElementById(id))
        .filter(Boolean)
        .map((node) => ({
          id: node!.id,
          top: Math.abs(node!.getBoundingClientRect().top),
        }))
        .sort((a, b) => a.top - b.top)[0]?.id;

      const index = Math.max(0, sections.indexOf(current ?? "start"));
      const target = sections[Math.min(sections.length - 1, Math.max(0, index + direction))];
      document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.key === "ArrowDown" || event.key === "PageDown") {
        event.preventDefault();
        move(1);
      }
      if (event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        move(-1);
      }
      if (event.key === "Home") {
        event.preventDefault();
        document.getElementById("start")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      if (event.key === "End") {
        event.preventDefault();
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [lang, setLang] = useLanguage();
  const t = content[lang];
  const year = useMemo(() => new Date().getFullYear(), []);
  useSectionKeys();

  return (
    <main className="min-h-screen bg-[#f7f8f3] text-[#172019] selection:bg-[#d7b15d] selection:text-[#172019]">
      <header className="fixed left-0 right-0 top-0 z-30 border-b border-[#172019]/10 bg-[#f7f8f3]/88 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
          <a href="#start" aria-label="ZSZ nr 5 Wrocław" className="flex min-w-0 items-center gap-3 text-sm font-semibold tracking-normal text-[#172019]">
            <img src="/photos/szkola-mistrzow-lockup.png" alt="" width={168} height={36} className="h-9 w-auto object-contain" />
            <span className="hidden max-w-[260px] truncate sm:block">ZSZ nr 5 Wrocław</span>
          </a>
          <nav aria-label={lang === "pl" ? "Główna nawigacja" : "Main navigation"} className="hidden items-center gap-1 lg:flex">
            {t.nav.map((item, index) => (
              <a key={item} href={`#${navTargets[index]}`} className="rounded-[8px] px-3 py-2 text-sm font-medium text-[#172019]/76 transition hover:bg-[#172019]/8 hover:text-[#172019]">
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <div className="rounded-[8px] border border-[#172019]/14 bg-white/70 p-1" aria-label={lang === "pl" ? "Wybór języka" : "Language selector"}>
              {(["pl", "en"] as Lang[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setLang(item)}
                  className={`rounded-[6px] px-3 py-1.5 text-sm font-semibold transition ${lang === item ? "bg-[#1f5b3a] text-white" : "text-[#172019]/70 hover:bg-[#172019]/8"}`}
                >
                  {item.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <section id="start" className="relative isolate flex min-h-[100dvh] items-center overflow-hidden px-4 pb-14 pt-24 md:px-8">
        <img
          src="/photos/hero-mural.webp"
          alt={lang === "pl" ? "Mural przy budynku szkoły" : "Mural next to the school building"}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#f7f8f3] via-[#f7f8f3]/82 to-[#f7f8f3]/26" />
        <div className="mx-auto grid w-full max-w-7xl items-end gap-10 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_360px]">
          <Reveal className="max-w-3xl">
            <p className="mb-5 max-w-fit rounded-[8px] bg-white/76 px-4 py-2 text-sm font-semibold text-[#1f5b3a] shadow-sm">
              {t.heroKicker}
            </p>
            <h1 className="max-w-5xl text-5xl font-black leading-[1.02] tracking-normal text-[#172019] md:text-5xl xl:text-6xl">
              {t.heroTitle}
            </h1>
            <p className="mt-6 max-w-[58ch] text-lg font-medium leading-8 text-[#334038] md:text-xl">
              {t.heroLead}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#manifest" className="rounded-[8px] bg-[#1f5b3a] px-5 py-3 text-base font-bold text-white shadow-[0_14px_34px_rgba(31,91,58,.22)] transition hover:-translate-y-0.5 hover:bg-[#184a2f] active:translate-y-0">
                {t.primaryCta}
              </a>
              <a href="https://www.szkolamistrzow.info/" className="rounded-[8px] border border-[#172019]/18 bg-white/80 px-5 py-3 text-base font-bold text-[#172019] transition hover:-translate-y-0.5 hover:bg-white active:translate-y-0">
                {t.secondaryCta}
              </a>
            </div>
          </Reveal>
          <Reveal className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1" delay={0.12}>
            {t.stats.map(([number, label]) => (
              <div key={label} className="rounded-[8px] border border-white/70 bg-white/78 p-5 shadow-[0_24px_80px_rgba(23,32,25,.12)] backdrop-blur-xl">
                <div className="text-4xl font-black text-[#1f5b3a]">{number}</div>
                <div className="mt-1 text-sm font-semibold text-[#334038]">{label}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="manifest" className="px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <Reveal>
            <h2 className="max-w-3xl text-4xl font-black leading-tight tracking-normal md:text-6xl">
              {t.manifestTitle}
            </h2>
            <p className="mt-6 max-w-[62ch] text-lg leading-8 text-[#465148]">{t.manifestLead}</p>
          </Reveal>
          <Reveal className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1" delay={0.08}>
            {t.values.map(([title, body]) => (
              <article key={title} className="rounded-[8px] border border-[#172019]/10 bg-white p-6 shadow-[0_18px_60px_rgba(23,32,25,.07)]">
                <h3 className="text-2xl font-black text-[#1f5b3a]">{title}</h3>
                <p className="mt-3 text-base leading-7 text-[#465148]">{body}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="paths" className="bg-white px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-3xl">
            <h2 className="text-4xl font-black leading-tight tracking-normal md:text-6xl">{t.pathsTitle}</h2>
            <p className="mt-5 text-lg leading-8 text-[#465148]">{t.pathsLead}</p>
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {t.paths.map(([title, body], index) => (
              <Reveal key={title} delay={index * 0.04}>
                <article className="group min-h-[250px] rounded-[8px] border border-[#172019]/10 bg-[#f7f8f3] p-6 transition hover:-translate-y-1 hover:border-[#1f5b3a]/36 hover:shadow-[0_22px_70px_rgba(23,32,25,.10)]">
                  <div className="mb-8 h-1.5 w-16 rounded-full bg-[#d7b15d] transition group-hover:w-24" />
                  <h3 className="text-2xl font-black text-[#172019]">{title}</h3>
                  <p className="mt-4 text-base leading-7 text-[#465148]">{body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="practice" className="px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-3xl">
            <h2 className="text-4xl font-black leading-tight tracking-normal md:text-6xl">{t.practiceTitle}</h2>
            <p className="mt-5 text-lg leading-8 text-[#465148]">{t.practiceLead}</p>
          </Reveal>
          <div className="mt-12 grid auto-rows-[minmax(320px,auto)] gap-5 lg:grid-cols-4">
            {t.practice.map(([title, body, src, alt], index) => (
              <Reveal key={title} className={index === 0 ? "lg:col-span-2 lg:row-span-2" : index === 3 ? "lg:col-span-2" : ""} delay={index * 0.04}>
                <article className="group relative h-full min-h-[320px] overflow-hidden rounded-[8px] bg-[#172019] text-white">
                  <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#102017]/88 via-[#102017]/26 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="text-2xl font-black">{title}</h3>
                    <p className="mt-3 max-w-[46ch] text-base leading-7 text-white/88">{body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="bg-[#183a2a] px-4 py-20 text-white md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.95fr_1.05fr]">
          <Reveal>
            <h2 className="text-4xl font-black leading-tight tracking-normal md:text-6xl">{t.projectsTitle}</h2>
            <p className="mt-5 max-w-[60ch] text-lg leading-8 text-white/78">{t.projectsLead}</p>
            <div className="mt-8 overflow-hidden rounded-[8px]">
              <img src="/photos/eu-cooperation.webp" alt={lang === "pl" ? "Flagi Unii Europejskiej i państw europejskich" : "European Union and European country flags"} width={1100} height={720} className="aspect-[16/10] w-full object-cover" />
            </div>
          </Reveal>
          <div className="grid gap-4">
            {t.projects.map(([title, body], index) => (
              <Reveal key={title} delay={index * 0.05}>
                <article className="rounded-[8px] border border-white/14 bg-white/8 p-6 backdrop-blur-sm transition hover:bg-white/12">
                  <h3 className="text-2xl font-black text-[#f0cb77]">{title}</h3>
                  <p className="mt-3 text-base leading-7 text-white/80">{body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="jubilee" className="bg-white px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-3xl">
            <h2 className="text-4xl font-black leading-tight tracking-normal md:text-6xl">{t.jubileeTitle}</h2>
            <p className="mt-5 text-lg leading-8 text-[#465148]">{t.jubileeLead}</p>
          </Reveal>
          <Reveal className="mt-12 overflow-x-auto pb-4" delay={0.08}>
            <div className="flex w-max gap-4">
              {gallery.map(([src, alt], index) => (
                <figure key={src} className={`relative overflow-hidden rounded-[8px] bg-[#172019] ${index % 3 === 0 ? "h-[420px] w-[620px]" : "h-[420px] w-[330px]"}`}>
                  <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
                </figure>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="contact" className="px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 rounded-[8px] bg-[#172019] p-8 text-white md:p-12 lg:grid-cols-[1fr_.8fr]">
          <Reveal>
            <img src="/photos/orzel-zsz5.png" alt="" width={96} height={96} className="mb-8 h-16 w-auto" />
            <h2 className="text-4xl font-black leading-tight tracking-normal md:text-6xl">{t.finaleTitle}</h2>
            <p className="mt-5 max-w-[58ch] text-lg leading-8 text-white/78">{t.finaleLead}</p>
          </Reveal>
          <Reveal className="grid content-end gap-3" delay={0.08}>
            {t.links.map(([label, href]) => (
              <a key={href} href={href} className="rounded-[8px] border border-white/14 bg-white/8 px-5 py-4 text-lg font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/14 active:translate-y-0">
                {label}
              </a>
            ))}
            <p className="pt-5 text-sm text-white/54">ZSZ nr 5 Wrocław, {year}</p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
