import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import {
  Zap, Calendar, Timer, BookOpen, FileUp, LineChart,
  CheckSquare, Moon, ArrowRight, Sparkles, ArrowUpRight,
} from "lucide-react";
import dashboardImg from "@/assets/dashboard-mockup.jpg";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "StudyFlow — Pare de procrastinar. Estude de verdade." },
      {
        name: "description",
        content:
          "Organize matérias, tarefas e tempo de foco em um só lugar. O parceiro de estudos diário para estudantes que levam a sério.",
      },
      { property: "og:title", content: "StudyFlow — Foco e produtividade para estudantes" },
      {
        property: "og:description",
        content:
          "Pomodoro, tarefas, calendário e progresso semanal num app minimalista em dark mode.",
      },
    ],
  }),
});

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Particles() {
  const dots = useMemo(
    () =>
      Array.from({ length: 28 }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        delay: Math.random() * 6,
        duration: 6 + Math.random() * 6,
        opacity: 0.15 + Math.random() * 0.45,
      })),
    [],
  );
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((d, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            opacity: d.opacity,
            animation: `float-particle ${d.duration}s ease-in-out ${d.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function Navbar({ onCta }: { onCta: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(8,8,8,0.8)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid #1a1a1a" : "1px solid transparent",
      }}
    >
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5">
          <div className="size-8 rounded-lg bg-violet-gradient grid place-items-center shadow-[0_0_20px_rgba(124,58,237,0.45)]">
            <Zap className="size-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-semibold tracking-tight text-[17px] text-white">StudyFlow</span>
        </a>
        <nav className="hidden md:flex items-center gap-9 text-[13.5px] text-zinc-400">
          <a href="#funcionalidades" className="hover:text-white transition-colors">Funcionalidades</a>
          <a href="#como-funciona" className="hover:text-white transition-colors">Como funciona</a>
          <a href="#planos" className="hover:text-white transition-colors">Planos</a>
        </nav>
        <button
          onClick={onCta}
          className="rounded-full bg-violet-gradient px-4 py-2 text-[13px] font-medium text-white shadow-[0_0_20px_rgba(124,58,237,0.45)] hover:shadow-[0_0_30px_rgba(124,58,237,0.7)] transition-shadow"
        >
          Começar agora
        </button>
      </div>
    </header>
  );
}

function BrowserFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-[#222] bg-[#0c0c0c]">
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[#1a1a1a] bg-[#0a0a0a]">
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
        <div className="mx-auto text-[11px] text-zinc-500 font-mono">
          studyflow.app/dashboard
        </div>
      </div>
      {children}
    </div>
  );
}

function Landing() {
  const navigate = useNavigate();
  const [leaving, setLeaving] = useState(false);

  const goLogin = () => {
    setLeaving(true);
    setTimeout(() => navigate({ to: "/login" }), 450);
  };

  const steps = [
    {
      n: "01",
      icon: Calendar,
      title: "Organize",
      desc: "Crie matérias, tarefas e prazos em segundos. Tudo num só lugar, sempre à mão.",
    },
    {
      n: "02",
      icon: Timer,
      title: "Foque",
      desc: "Pomodoro integrado, sessões cronometradas e zero distrações.",
    },
    {
      n: "03",
      icon: LineChart,
      title: "Evolua",
      desc: "Acompanhe seu progresso semanal com gráficos visuais que importam.",
    },
  ];

  const features = [
    { icon: Timer, title: "Timer Pomodoro integrado", desc: "25/5 com estado global.", color: "#a78bfa" },
    { icon: CheckSquare, title: "Tarefas por matéria", desc: "Status, prioridade e prazo.", color: "#60a5fa" },
    { icon: Calendar, title: "Calendário de prazos", desc: "Mensal e semanal.", color: "#34d399" },
    { icon: FileUp, title: "Upload de PDFs", desc: "Tudo organizado por matéria.", color: "#fbbf24" },
    { icon: LineChart, title: "Progresso semanal", desc: "Visual e honesto.", color: "#f472b6" },
    { icon: Moon, title: "Dark Mode nativo", desc: "Feito pra durar a noite.", color: "#fb923c" },
  ];

  return (
    <AnimatePresence>
      {!leaving && (
        <motion.div
          key="page"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          id="top"
          className="relative min-h-screen"
        >
          {/* Global noise overlay */}
          <div
            aria-hidden
            className="fixed inset-0 noise-bg pointer-events-none opacity-[0.06] mix-blend-overlay z-[1]"
          />

          <Navbar onCta={goLogin} />

          {/* HERO */}
          <section className="relative pt-36 md:pt-44 pb-24 px-6 overflow-hidden">
            {/* Diffused violet glow behind title */}
            <div
              aria-hidden
              className="absolute left-1/2 top-40 -translate-x-1/2 w-[800px] h-[500px] rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(124,58,237,0.35), rgba(79,70,229,0.15) 40%, transparent 70%)",
                filter: "blur(60px)",
              }}
            />
            <Particles />

            <div className="relative mx-auto max-w-5xl text-center">
              <Reveal>
                <div className="inline-block shimmer-pill">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 text-[12px] text-zinc-300">
                    <Sparkles className="size-3.5 text-violet-400" />
                    Feito para estudantes que levam a sério
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <h1
                  className="mt-8 font-extrabold tracking-tight text-white leading-[1.02]"
                  style={{ fontSize: "clamp(56px, 9vw, 96px)", letterSpacing: "-0.04em" }}
                >
                  Pare de procrastinar.
                  <br />
                  Comece a{" "}
                  <span className="text-violet-gradient">estudar</span>
                  <br className="hidden md:block" />
                  com{" "}
                  <span className="text-violet-gradient">foco</span> de verdade.
                </h1>
              </Reveal>

              <Reveal delay={0.16}>
                <p className="mt-7 mx-auto max-w-[480px] text-[15.5px] leading-relaxed text-zinc-400">
                  Organize suas matérias, tarefas e tempo de foco em um só lugar.
                  O StudyFlow é seu parceiro de estudos diário.
                </p>
              </Reveal>

              <Reveal delay={0.24}>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={goLogin}
                    className="group inline-flex items-center gap-2 rounded-xl bg-violet-gradient px-6 py-3.5 text-[14px] font-medium text-white shadow-[0_0_30px_rgba(124,58,237,0.5)] hover:shadow-[0_0_50px_rgba(124,58,237,0.85)] transition-shadow"
                  >
                    Começar grátis
                    <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                  <a
                    href="#como-funciona"
                    className="inline-flex items-center gap-2 rounded-xl border border-[#333] bg-transparent px-6 py-3.5 text-[14px] font-medium text-white hover:bg-[#111] hover:border-[#444] transition-all"
                  >
                    Ver como funciona
                  </a>
                </div>
              </Reveal>

              {/* Mockup with 3D tilt + fade-to-black */}
              <Reveal delay={0.32}>
                <div
                  className="mt-20 mx-auto max-w-5xl"
                  style={{ perspective: "1800px" }}
                >
                  <div
                    className="relative"
                    style={{ transform: "rotateX(8deg)", transformStyle: "preserve-3d" }}
                  >
                    <BrowserFrame>
                      <img
                        src={dashboardImg}
                        alt="Dashboard do StudyFlow com Pomodoro, tarefas e progresso semanal"
                        width={1536}
                        height={1024}
                        className="w-full h-auto block"
                      />
                    </BrowserFrame>
                    {/* Fade to black */}
                    <div
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(to bottom, transparent, #080808 85%)",
                      }}
                    />
                    {/* Glow under */}
                    <div
                      aria-hidden
                      className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[70%] h-24 blur-3xl opacity-60 rounded-full"
                      style={{ background: "var(--gradient-violet)" }}
                    />
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          <div className="section-divider mx-auto max-w-6xl" />

          {/* COMO FUNCIONA */}
          <section id="como-funciona" className="relative py-28 px-6">
            <div className="mx-auto max-w-6xl">
              <Reveal>
                <div className="text-center max-w-2xl mx-auto">
                  <span className="text-[12px] uppercase tracking-[0.2em] text-violet-400 font-medium">
                    Como funciona
                  </span>
                  <h2
                    className="mt-4 font-extrabold tracking-tight text-white"
                    style={{ fontSize: "clamp(34px, 5vw, 54px)", letterSpacing: "-0.03em" }}
                  >
                    Tudo que você precisa
                    <br />
                    em um lugar só
                  </h2>
                </div>
              </Reveal>

              <div className="relative mt-16">
                {/* Connector line desktop */}
                <div
                  aria-hidden
                  className="hidden md:block absolute top-16 left-[16%] right-[16%] h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, #2d2640 20%, #4f46e5 50%, #2d2640 80%, transparent)",
                  }}
                />
                <div className="grid md:grid-cols-3 gap-5 relative">
                  {steps.map((s, i) => (
                    <Reveal key={s.n} delay={i * 0.1}>
                      <div className="relative overflow-hidden rounded-2xl border border-[#222] bg-[#111] p-7 h-full">
                        <span
                          aria-hidden
                          className="absolute top-4 right-5 text-[64px] font-extrabold leading-none select-none"
                          style={{
                            color: "transparent",
                            WebkitTextStroke: "1px rgba(124,58,237,0.35)",
                          }}
                        >
                          {s.n}
                        </span>
                        <div className="size-12 rounded-xl grid place-items-center bg-[#1e1b4b] border border-violet-500/20">
                          <s.icon className="size-5 text-violet-300" />
                        </div>
                        <h3 className="mt-6 text-xl font-semibold text-white tracking-tight">
                          {s.title}
                        </h3>
                        <p className="mt-2 text-[14px] leading-relaxed text-zinc-400">
                          {s.desc}
                        </p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <div className="section-divider mx-auto max-w-6xl" />

          {/* FUNCIONALIDADES */}
          <section id="funcionalidades" className="relative py-28 px-6">
            <div className="mx-auto max-w-6xl">
              <Reveal>
                <div className="text-center max-w-2xl mx-auto">
                  <span className="text-[12px] uppercase tracking-[0.2em] text-violet-400 font-medium">
                    Recursos
                  </span>
                  <h2
                    className="mt-4 font-extrabold tracking-tight text-white"
                    style={{ fontSize: "clamp(34px, 5vw, 54px)", letterSpacing: "-0.03em" }}
                  >
                    Pequenos detalhes,
                    <br />
                    grande diferença.
                  </h2>
                </div>
              </Reveal>

              <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {features.map((f, i) => (
                  <Reveal key={f.title} delay={i * 0.06}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="group relative rounded-2xl border border-[#222] bg-[#111] p-6 h-full hover:border-violet-500/50 transition-colors"
                    >
                      <div
                        className="size-11 rounded-xl grid place-items-center mb-5"
                        style={{
                          backgroundColor: `${f.color}1a`,
                          border: `1px solid ${f.color}40`,
                        }}
                      >
                        <f.icon className="size-5" style={{ color: f.color }} />
                      </div>
                      <h3 className="text-[15.5px] font-semibold text-white tracking-tight">
                        {f.title}
                      </h3>
                      <p className="mt-1.5 text-[13.5px] text-zinc-500">{f.desc}</p>
                      <ArrowUpRight className="absolute top-5 right-5 size-4 text-zinc-700 group-hover:text-violet-400 transition-colors" />
                    </motion.div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <div className="section-divider mx-auto max-w-6xl" />

          {/* CTA FINAL */}
          <section id="planos" className="relative py-28 px-6">
            <div className="mx-auto max-w-4xl">
              <Reveal>
                <div className="conic-border">
                  <div className="relative rounded-[26.5px] px-8 py-20 text-center overflow-hidden bg-[#0d0d0d]">
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-70 pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(ellipse at center, rgba(124,58,237,0.25), transparent 60%)",
                      }}
                    />
                    <div className="relative">
                      <h2
                        className="font-extrabold tracking-tight text-white"
                        style={{
                          fontSize: "clamp(36px, 5.5vw, 60px)",
                          letterSpacing: "-0.035em",
                          lineHeight: 1.05,
                        }}
                      >
                        Pronto para estudar
                        <br />
                        com mais <span className="text-violet-gradient">foco</span>?
                      </h2>
                      <p className="mt-5 text-zinc-400 text-[16px]">
                        Comece agora, é grátis.
                      </p>
                      <button
                        onClick={goLogin}
                        className="mt-10 inline-flex items-center gap-2 rounded-xl bg-violet-gradient px-8 py-4 text-[15px] font-medium text-white shadow-[0_0_40px_rgba(124,58,237,0.6)] hover:shadow-[0_0_60px_rgba(124,58,237,0.9)] transition-shadow"
                      >
                        Criar minha conta
                        <ArrowRight className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="relative px-6 py-12 border-t border-[#1a1a1a]">
            <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-zinc-500">
              <div className="flex items-center gap-2.5">
                <div className="size-6 rounded-md bg-violet-gradient grid place-items-center">
                  <BookOpen className="size-3.5 text-white" />
                </div>
                <span>© 2026 StudyFlow</span>
              </div>
              <div className="flex items-center gap-7">
                <a href="#" className="hover:text-white transition-colors">Privacidade</a>
                <a href="#" className="hover:text-white transition-colors">Termos</a>
              </div>
            </div>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
