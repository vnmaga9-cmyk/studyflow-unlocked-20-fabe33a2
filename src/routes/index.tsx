import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Zap, Calendar, Timer, BookOpen, FileUp, LineChart,
  CheckSquare, Moon, ArrowRight, Sparkles,
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
        content: "Pomodoro, tarefas, calendário e progresso semanal num app minimalista em dark mode.",
      },
    ],
  }),
});

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: "easeOut", staggerChildren: 0.08 }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function Navbar({ onCta }: { onCta: () => void }) {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(latest > prev && latest > 120);
  });

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: hidden ? -80 : 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="fixed top-0 inset-x-0 z-50 px-4 pt-4"
    >
      <div className="mx-auto max-w-6xl glass rounded-2xl px-5 py-3 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group">
          <div className="size-8 rounded-lg bg-gradient-primary grid place-items-center glow-primary">
            <Zap className="size-4 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <span className="font-semibold tracking-tight text-lg">StudyFlow</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#funcionalidades" className="hover:text-foreground transition-colors">Funcionalidades</a>
          <a href="#como-funciona" className="hover:text-foreground transition-colors">Como funciona</a>
          <a href="#planos" className="hover:text-foreground transition-colors">Planos</a>
        </nav>
        <button
          onClick={onCta}
          className="rounded-lg bg-gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
        >
          Começar agora
        </button>
      </div>
    </motion.header>
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
    { icon: Calendar, emoji: "📅", title: "Organize", desc: "Crie matérias, tarefas e prazos em segundos." },
    { icon: Timer, emoji: "⏱️", title: "Foque", desc: "Use o Pomodoro integrado e registre seu tempo de estudo." },
    { icon: LineChart, emoji: "📈", title: "Evolua", desc: "Acompanhe seu progresso semanal com gráficos visuais." },
  ];

  const features = [
    { icon: Timer, title: "Timer Pomodoro integrado" },
    { icon: CheckSquare, title: "Gestão de tarefas por matéria" },
    { icon: Calendar, title: "Calendário de prazos" },
    { icon: FileUp, title: "Upload de PDFs por matéria" },
    { icon: LineChart, title: "Progresso semanal visual" },
    { icon: Moon, title: "Dark Mode nativo" },
  ];

  return (
    <AnimatePresence>
      {!leaving && (
        <motion.div
          key="page"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          id="top"
          className="relative min-h-screen overflow-hidden"
        >
          {/* Ambient glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-[800px]"
            style={{ background: "var(--gradient-hero)" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />

          <Navbar onCta={goLogin} />

          {/* HERO */}
          <main className="relative">
            <Section className="pt-40 pb-24 px-6">
              <div className="mx-auto max-w-5xl text-center">
                <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
                  <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs text-muted-foreground">
                    <Sparkles className="size-3.5 text-primary" />
                    Feito para estudantes que levam a sério
                  </span>
                </motion.div>

                <motion.h1
                  variants={fadeUp}
                  transition={{ duration: 0.7 }}
                  className="mt-8 text-5xl md:text-7xl font-semibold tracking-tight text-gradient leading-[1.05]"
                >
                  Pare de procrastinar.
                  <br />
                  Comece a estudar de verdade.
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  transition={{ duration: 0.7 }}
                  className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground"
                >
                  Organize suas matérias, tarefas e tempo de foco em um só lugar.
                  O StudyFlow é seu parceiro de estudos diário.
                </motion.p>

                <motion.div
                  variants={fadeUp}
                  transition={{ duration: 0.7 }}
                  className="mt-10 flex flex-wrap items-center justify-center gap-3"
                >
                  <button
                    onClick={goLogin}
                    className="group inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-6 py-3 text-sm font-medium text-primary-foreground glow-primary hover:opacity-95 transition-all"
                  >
                    Começar grátis
                    <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                  <a
                    href="#como-funciona"
                    className="inline-flex items-center gap-2 rounded-xl border border-border bg-secondary/40 px-6 py-3 text-sm font-medium text-foreground hover:bg-secondary/70 transition-colors"
                  >
                    Ver como funciona
                  </a>
                </motion.div>

                {/* Browser frame mockup */}
                <motion.div
                  variants={fadeUp}
                  transition={{ duration: 0.9, delay: 0.1 }}
                  className="mt-20 mx-auto max-w-5xl"
                >
                  <div className="glass rounded-2xl p-2 shadow-2xl glow-primary">
                    <div className="flex items-center gap-1.5 px-3 py-2">
                      <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                      <span className="size-2.5 rounded-full bg-[#febc2e]" />
                      <span className="size-2.5 rounded-full bg-[#28c840]" />
                      <div className="mx-auto text-xs text-muted-foreground">
                        studyflow.app/dashboard
                      </div>
                    </div>
                    <img
                      src={dashboardImg}
                      alt="Dashboard do StudyFlow com Pomodoro, tarefas do dia e progresso semanal"
                      width={1920}
                      height={1080}
                      className="rounded-xl w-full h-auto"
                    />
                  </div>
                  <div
                    aria-hidden
                    className="mx-auto h-24 max-w-3xl -mt-8 blur-3xl opacity-50"
                    style={{ background: "var(--gradient-primary)" }}
                  />
                </motion.div>
              </div>
            </Section>

            {/* COMO FUNCIONA */}
            <Section id="como-funciona" className="py-24 px-6">
              <div className="mx-auto max-w-6xl">
                <motion.div variants={fadeUp} transition={{ duration: 0.6 }} className="text-center max-w-2xl mx-auto">
                  <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
                    Tudo que você precisa em um lugar só
                  </h2>
                  <p className="mt-4 text-muted-foreground">
                    Três passos simples para transformar sua rotina de estudos.
                  </p>
                </motion.div>

                <div className="mt-14 grid md:grid-cols-3 gap-5">
                  {steps.map((s, i) => (
                    <motion.div
                      key={s.title}
                      variants={fadeUp}
                      transition={{ duration: 0.6, delay: i * 0.08 }}
                      className="glass rounded-2xl p-7 hover:border-primary/30 transition-colors group"
                    >
                      <div className="size-12 rounded-xl bg-secondary/60 grid place-items-center text-2xl group-hover:bg-gradient-primary transition-colors">
                        <s.icon className="size-5 text-primary group-hover:text-primary-foreground transition-colors" />
                      </div>
                      <h3 className="mt-5 text-xl font-semibold">
                        <span className="mr-2">{s.emoji}</span>{s.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Section>

            {/* FUNCIONALIDADES */}
            <Section id="funcionalidades" className="py-24 px-6">
              <div className="mx-auto max-w-6xl">
                <motion.div variants={fadeUp} transition={{ duration: 0.6 }} className="text-center max-w-2xl mx-auto">
                  <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
                    Recursos que fazem a diferença
                  </h2>
                  <p className="mt-4 text-muted-foreground">
                    Pensado para o dia a dia real de um estudante.
                  </p>
                </motion.div>

                <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {features.map((f, i) => (
                    <motion.div
                      key={f.title}
                      variants={fadeUp}
                      transition={{ duration: 0.5, delay: i * 0.05 }}
                      className="glass rounded-xl p-5 flex items-center gap-4 hover:bg-secondary/30 transition-colors"
                    >
                      <div className="size-10 shrink-0 rounded-lg bg-primary/10 grid place-items-center">
                        <f.icon className="size-5 text-primary" />
                      </div>
                      <span className="text-sm font-medium">{f.title}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Section>

            {/* CTA FINAL */}
            <Section id="planos" className="py-24 px-6">
              <div className="mx-auto max-w-4xl">
                <motion.div
                  variants={fadeUp}
                  transition={{ duration: 0.7 }}
                  className="relative glass rounded-3xl px-8 py-16 text-center overflow-hidden"
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-60"
                    style={{ background: "var(--gradient-hero)" }}
                  />
                  <div className="relative">
                    <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gradient">
                      Pronto para estudar com mais foco?
                    </h2>
                    <p className="mt-4 text-muted-foreground text-lg">
                      Comece agora, é grátis.
                    </p>
                    <button
                      onClick={goLogin}
                      className="mt-10 inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-8 py-4 text-base font-medium text-primary-foreground glow-primary hover:opacity-95 transition-all"
                    >
                      Criar minha conta
                      <ArrowRight className="size-4" />
                    </button>
                  </div>
                </motion.div>
              </div>
            </Section>

            {/* FOOTER */}
            <footer className="border-t border-border/60 px-6 py-10">
              <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="size-6 rounded-md bg-gradient-primary grid place-items-center">
                    <BookOpen className="size-3.5 text-primary-foreground" />
                  </div>
                  <span>© 2026 StudyFlow</span>
                </div>
                <div className="flex items-center gap-6">
                  <a href="#" className="hover:text-foreground transition-colors">Privacidade</a>
                  <a href="#" className="hover:text-foreground transition-colors">Termos</a>
                </div>
              </div>
            </footer>
          </main>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
