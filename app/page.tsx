"use client";

import { useState } from "react";

/* ── DATA ──────────────────────────────────────────────────────────────── */

const MODULES = [
  {
    num: "01",
    title: "Fundamentos de Machine Learning",
    weeks: "4 semanas · 24 horas",
    color: "#2dd4bf",
    topics: [
      "Álgebra lineal y estadística aplicada para ML",
      "Regresión, clasificación y clustering desde cero",
      "Evaluación, validación cruzada y métricas de negocio",
      "Feature engineering y pipelines de datos",
    ],
  },
  {
    num: "02",
    title: "Deep Learning y Redes Neuronales",
    weeks: "5 semanas · 30 horas",
    color: "#818cf8",
    topics: [
      "Perceptrones, capas densas y funciones de activación",
      "Backpropagation y optimizadores (Adam, AdamW, SGD)",
      "CNN, RNN, LSTM y arquitecturas Transformer",
      "PyTorch avanzado: entrenamiento distribuido a escala",
    ],
  },
  {
    num: "03",
    title: "NLP y Grandes Modelos de Lenguaje",
    weeks: "4 semanas · 24 horas",
    color: "#f97316",
    topics: [
      "Embeddings y representación semántica del lenguaje",
      "Fine-tuning eficiente de GPT, BERT y Llama (LoRA/QLoRA)",
      "Ingeniería de prompts avanzada y LLM chains",
      "RAG, agentes autónomos y aplicaciones empresariales",
    ],
  },
  {
    num: "04",
    title: "Computer Vision",
    weeks: "3 semanas · 18 horas",
    color: "#ec4899",
    topics: [
      "Detección y segmentación de objetos (YOLO v9, SAM 2)",
      "Modelos generativos: GANs y Diffusion Models",
      "Visión en tiempo real y edge AI en dispositivos",
      "Casos de uso médicos, industriales y de seguridad",
    ],
  },
  {
    num: "05",
    title: "MLOps y Modelos en Producción",
    weeks: "3 semanas · 18 horas",
    color: "#34d399",
    topics: [
      "Pipelines CI/CD para proyectos de ML (GitHub Actions)",
      "Monitorización de drift de datos y degradación de modelos",
      "Docker, Kubernetes y plataformas cloud ML (AWS SageMaker)",
      "MLflow, DVC y gestión de experimentos a escala",
    ],
  },
  {
    num: "06",
    title: "Proyecto Final con Mentores",
    weeks: "3 semanas · 15 horas",
    color: "#fbbf24",
    topics: [
      "Definición y scoping de un problema real de negocio",
      "Diseño de arquitectura e implementación completa",
      "Evaluación, despliegue y monitorización en producción",
      "Presentación ante panel de expertos del sector tecnológico",
    ],
  },
];

const FEATURES = [
  {
    icon: "⚡",
    label: "Online & Flexible",
    text: "Aprende a tu ritmo con acceso de por vida. Compatible con trabajo a tiempo completo.",
    stat: "24/7",
  },
  {
    icon: "🎯",
    label: "Proyectos Reales",
    text: "Cada módulo incluye datasets y retos extraídos de problemas reales de la industria.",
    stat: "20+",
  },
  {
    icon: "🧠",
    label: "Mentores Top",
    text: "Profesionales de Google DeepMind, Meta AI y OpenAI. No teoría vacía, experiencia real.",
    stat: "12",
  },
  {
    icon: "🏆",
    label: "Certificado Avalado",
    text: "Reconocida por más de 200 empresas tech. Añádela directamente a tu perfil de LinkedIn.",
    stat: "200+",
  },
  {
    icon: "👥",
    label: "Comunidad Exclusiva",
    text: "Acceso vitalicio a la red privada de alumni: 3.000+ profesionales de IA en activo.",
    stat: "3K+",
  },
  {
    icon: "🔄",
    label: "Garantía Total",
    text: "No estás satisfecho en los primeros 30 días. Te devolvemos el 100% sin condiciones.",
    stat: "30d",
  },
];

const TESTIMONIALS = [
  {
    name: "Alejandro Martínez",
    role: "Lead ML Engineer · Telefónica",
    text: "En 6 meses pasé de backend developer a liderar el equipo de IA de mi empresa. El nivel de los mentores y la calidad de los proyectos es incomparable.",
    initials: "AM",
    color: "#2dd4bf",
  },
  {
    name: "Laura Sánchez",
    role: "Senior Data Scientist · BBVA",
    text: "El programa es brutalmente práctico. Nada de diapositivas vacías: construyes sistemas reales desde el primer día. Me triplicaron el sueldo al mes de terminar.",
    initials: "LS",
    color: "#818cf8",
  },
  {
    name: "Carlos Puente",
    role: "CTO & Co-founder · FinAI",
    text: "El proyecto final fue la demo técnica que usé para levantar una ronda seed de €500K. Invertir en este programa fue la decisión más inteligente de mi carrera.",
    initials: "CP",
    color: "#f97316",
  },
];

const PLANS = [
  {
    name: "Esencial",
    price: "497",
    badge: null as string | null,
    accent: "#2dd4bf",
    featured: false,
    perks: [
      "Acceso a todos los módulos",
      "Proyectos prácticos guiados",
      "Foro de comunidad",
      "Certificado digital avalado",
      "Actualizaciones durante 1 año",
    ],
    cta: "Empezar ahora",
  },
  {
    name: "Pro",
    price: "997",
    badge: "MÁS POPULAR",
    accent: "#818cf8",
    featured: true,
    perks: [
      "Todo lo del plan Esencial",
      "Sesiones en vivo semanales",
      "Mentorías grupales con expertos",
      "Code review 1:1 mensual",
      "Acceso de por vida al contenido",
      "Bolsa de empleo exclusiva IA",
    ],
    cta: "Unirme al Pro",
  },
  {
    name: "Elite",
    price: "1.997",
    badge: null as string | null,
    accent: "#f97316",
    featured: false,
    perks: [
      "Todo lo del plan Pro",
      "Coaching 1:1 quincenal",
      "Revisión de CV y perfil LinkedIn",
      "Acceso anticipado a módulos nuevos",
      "Badge verificado en LinkedIn",
      "Garantía de entrevistas*",
    ],
    cta: "Aplicar al Elite",
  },
];

/* ── COMPONENT ─────────────────────────────────────────────────────────── */

export default function Home() {
  const [activeModule, setActiveModule] = useState<number | null>(0);

  return (
    <>
      <style>{`
        @keyframes orb-drift {
          0%, 100% { transform: scale(1) translate(0, 0); opacity: 0.45; }
          33%       { transform: scale(1.12) translate(22px, -28px); opacity: 0.65; }
          66%       { transform: scale(0.93) translate(-18px, 22px); opacity: 0.5; }
        }
        @keyframes shimmer-text {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes dot-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
        .gradient-text {
          background: linear-gradient(130deg, #2dd4bf 0%, #818cf8 50%, #f97316 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer-text 5s linear infinite;
        }
        .card-lift {
          transition: transform 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease;
        }
        .card-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 24px 64px rgba(0, 0, 0, 0.45);
        }
        .btn-glow {
          background: linear-gradient(130deg, #2dd4bf, #818cf8);
          transition: opacity 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }
        .btn-glow:hover {
          opacity: 0.88;
          transform: translateY(-2px);
          box-shadow: 0 14px 44px rgba(45, 212, 191, 0.38);
        }
        .nav-glass {
          background: rgba(6, 6, 18, 0.82);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }
        .dot-grid {
          background-image: radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px);
          background-size: 32px 32px;
        }
        .module-row { transition: background 0.2s ease; }
        .module-row:hover { background: rgba(255,255,255,0.04); }
        .link-fade {
          color: rgba(226,232,240,0.45);
          text-decoration: none;
          transition: color 0.2s;
        }
        .link-fade:hover { color: rgba(226,232,240,0.9); }
        .nav-link {
          font-size: 0.875rem;
          color: rgba(226,232,240,0.65);
          text-decoration: none;
          transition: color 0.2s;
        }
        .nav-link:hover { color: #2dd4bf; }
      `}</style>

      <div
        style={{
          background: "var(--bg)",
          color: "var(--fg)",
          fontFamily: "var(--font-body, sans-serif)",
          overflowX: "hidden",
        }}
      >
        {/* ── NAV ──────────────────────────────────────────────────── */}
        <nav className="nav-glass" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50 }}>
          <div
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              padding: "0 2rem",
              height: "64px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "9px",
                  background: "linear-gradient(135deg, #2dd4bf, #818cf8)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "17px",
                  flexShrink: 0,
                }}
              >
                🧠
              </div>
              <span
                style={{
                  fontFamily: "var(--font-display, sans-serif)",
                  fontWeight: 700,
                  fontSize: "0.88rem",
                  letterSpacing: "-0.02em",
                }}
              >
                AIFormación
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
              <div style={{ display: "flex", gap: "2rem" }}>
                {["programa", "mentores", "precios"].map((id) => (
                  <a key={id} href={`#${id}`} className="nav-link" style={{ textTransform: "capitalize" }}>
                    {id.charAt(0).toUpperCase() + id.slice(1)}
                  </a>
                ))}
              </div>
              <button
                className="btn-glow"
                style={{
                  padding: "9px 22px",
                  borderRadius: "100px",
                  border: "none",
                  color: "#060612",
                  fontWeight: 800,
                  fontSize: "0.82rem",
                  cursor: "pointer",
                  fontFamily: "var(--font-body, sans-serif)",
                  letterSpacing: "0.01em",
                }}
              >
                Reservar plaza
              </button>
            </div>
          </div>
        </nav>

        {/* ── HERO ─────────────────────────────────────────────────── */}
        <section
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            paddingTop: "80px",
            overflow: "hidden",
          }}
        >
          {/* Dot grid */}
          <div className="dot-grid" style={{ position: "absolute", inset: 0, opacity: 0.55, pointerEvents: "none" }} />

          {/* Ambient orbs */}
          <div
            style={{
              position: "absolute",
              top: "5%",
              left: "8%",
              width: "560px",
              height: "560px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(45,212,191,0.16) 0%, transparent 68%)",
              animation: "orb-drift 9s ease-in-out infinite",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "5%",
              right: "5%",
              width: "440px",
              height: "440px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(129,140,248,0.14) 0%, transparent 68%)",
              animation: "orb-drift 11s ease-in-out infinite reverse",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "45%",
              right: "18%",
              width: "320px",
              height: "320px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 68%)",
              animation: "orb-drift 13s ease-in-out infinite 3s",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 1,
              maxWidth: "1100px",
              margin: "0 auto",
              padding: "0 2rem",
              textAlign: "center",
            }}
          >
            {/* Live badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 18px",
                borderRadius: "100px",
                border: "1px solid rgba(45,212,191,0.3)",
                background: "rgba(45,212,191,0.06)",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: "#2dd4bf",
                marginBottom: "2.5rem",
                textTransform: "uppercase",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#2dd4bf",
                  display: "inline-block",
                  animation: "dot-pulse 2s ease-in-out infinite",
                }}
              />
              Nueva convocatoria · Septiembre 2026
            </div>

            {/* Headline */}
            <h1
              style={{
                fontFamily: "var(--font-display, sans-serif)",
                fontWeight: 900,
                fontSize: "clamp(3.5rem, 9.5vw, 9rem)",
                letterSpacing: "-0.035em",
                lineHeight: 0.88,
                color: "#e2e8f0",
                marginBottom: "1.5rem",
              }}
            >
              DOMINA
              <br />
              <span className="gradient-text">LA IA</span>
              <br />
              AHORA
            </h1>

            <p
              style={{
                fontSize: "clamp(1rem, 2.2vw, 1.22rem)",
                color: "rgba(226,232,240,0.62)",
                maxWidth: "600px",
                margin: "0 auto 3rem",
                lineHeight: 1.75,
              }}
            >
              El programa de formación más exigente y práctico para
              profesionales que quieren liderar la revolución de la
              inteligencia artificial.
            </p>

            {/* CTAs */}
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <button
                className="btn-glow"
                style={{
                  padding: "17px 44px",
                  borderRadius: "100px",
                  border: "none",
                  color: "#060612",
                  fontWeight: 800,
                  fontSize: "1.05rem",
                  cursor: "pointer",
                  fontFamily: "var(--font-body, sans-serif)",
                }}
              >
                Empieza ahora →
              </button>
              <button
                style={{
                  padding: "17px 44px",
                  borderRadius: "100px",
                  border: "1px solid rgba(255,255,255,0.14)",
                  background: "transparent",
                  color: "#e2e8f0",
                  fontWeight: 600,
                  fontSize: "1.05rem",
                  cursor: "pointer",
                  fontFamily: "var(--font-body, sans-serif)",
                  transition: "border-color 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(45,212,191,0.45)";
                  e.currentTarget.style.background = "rgba(45,212,191,0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                Ver el programa ↓
              </button>
            </div>

            {/* Key stats */}
            <div
              style={{
                marginTop: "4.5rem",
                display: "flex",
                gap: "3rem",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {[
                { val: "3.200+", label: "Alumnos formados" },
                { val: "94%", label: "Tasa de empleo en IA" },
                { val: "4.9★", label: "Valoración media" },
                { val: "6 meses", label: "Duración total" },
              ].map(({ val, label }) => (
                <div key={label} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontFamily: "var(--font-display, sans-serif)",
                      fontWeight: 900,
                      fontSize: "1.9rem",
                      color: "#2dd4bf",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {val}
                  </div>
                  <div
                    style={{
                      fontSize: "0.78rem",
                      color: "rgba(226,232,240,0.45)",
                      marginTop: "3px",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURES ─────────────────────────────────────────────── */}
        <section style={{ padding: "7rem 2rem" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <p
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: "#2dd4bf",
                  textTransform: "uppercase",
                  marginBottom: "1rem",
                }}
              >
                Por qué elegirnos
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-display, sans-serif)",
                  fontWeight: 900,
                  fontSize: "clamp(2rem, 5vw, 3.75rem)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                }}
              >
                No es un curso más.
                <br />
                <span className="gradient-text">Es otra liga.</span>
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "1.25rem",
              }}
            >
              {FEATURES.map((f) => (
                <div
                  key={f.label}
                  className="card-lift"
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "16px",
                    padding: "2rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "1.25rem",
                    }}
                  >
                    <div style={{ fontSize: "2rem" }}>{f.icon}</div>
                    <div
                      style={{
                        fontFamily: "var(--font-display, sans-serif)",
                        fontWeight: 900,
                        fontSize: "1.85rem",
                        color: "#2dd4bf",
                        letterSpacing: "-0.03em",
                      }}
                    >
                      {f.stat}
                    </div>
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: "1.05rem", marginBottom: "0.5rem" }}>
                    {f.label}
                  </h3>
                  <p style={{ fontSize: "0.9rem", color: "rgba(226,232,240,0.58)", lineHeight: 1.65 }}>
                    {f.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CURRICULUM ───────────────────────────────────────────── */}
        <section
          id="programa"
          style={{ padding: "7rem 2rem", background: "rgba(255,255,255,0.012)" }}
        >
          <div style={{ maxWidth: "880px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <p
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: "#818cf8",
                  textTransform: "uppercase",
                  marginBottom: "1rem",
                }}
              >
                Contenidos
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-display, sans-serif)",
                  fontWeight: 900,
                  fontSize: "clamp(2rem, 5vw, 3.75rem)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                }}
              >
                22 semanas.
                <br />
                <span style={{ color: "#818cf8" }}>6 módulos.</span>
                <br />
                Resultados reales.
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {MODULES.map((mod, i) => (
                <div
                  key={i}
                  className="module-row"
                  onClick={() => setActiveModule(activeModule === i ? null : i)}
                  style={{
                    border: "1px solid",
                    borderColor:
                      activeModule === i ? `${mod.color}45` : "var(--border)",
                    borderRadius: "12px",
                    overflow: "hidden",
                    cursor: "pointer",
                    background: activeModule === i ? `${mod.color}08` : "transparent",
                    transition: "background 0.2s, border-color 0.2s",
                  }}
                >
                  <div
                    style={{
                      padding: "1.25rem 1.5rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "1rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1.25rem",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-display, sans-serif)",
                          fontWeight: 900,
                          fontSize: "1.6rem",
                          color: mod.color,
                          opacity: 0.65,
                          minWidth: "44px",
                          lineHeight: 1,
                        }}
                      >
                        {mod.num}
                      </span>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: "1rem", lineHeight: 1.3 }}>
                          {mod.title}
                        </div>
                        <div
                          style={{
                            fontSize: "0.78rem",
                            color: "rgba(226,232,240,0.45)",
                            marginTop: "3px",
                          }}
                        >
                          {mod.weeks}
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: "1.4rem",
                        color: mod.color,
                        transition: "transform 0.3s ease",
                        transform:
                          activeModule === i ? "rotate(45deg)" : "rotate(0deg)",
                        flexShrink: 0,
                        lineHeight: 1,
                        fontWeight: 300,
                      }}
                    >
                      +
                    </div>
                  </div>

                  {activeModule === i && (
                    <div
                      style={{
                        padding: "0 1.5rem 1.5rem",
                        paddingLeft: "calc(1.5rem + 44px + 1.25rem)",
                      }}
                    >
                      <ul
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.6rem",
                          listStyle: "none",
                        }}
                      >
                        {mod.topics.map((topic, j) => (
                          <li
                            key={j}
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "0.75rem",
                              fontSize: "0.88rem",
                              color: "rgba(226,232,240,0.75)",
                              lineHeight: 1.5,
                            }}
                          >
                            <span
                              style={{
                                color: mod.color,
                                flexShrink: 0,
                                marginTop: "1px",
                              }}
                            >
                              →
                            </span>
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INSTRUCTOR ───────────────────────────────────────────── */}
        <section
          id="mentores"
          style={{ padding: "7rem 2rem" }}
        >
          <div
            style={{
              maxWidth: "1100px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "4rem",
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  width: "110px",
                  height: "110px",
                  borderRadius: "22px",
                  background:
                    "linear-gradient(135deg, rgba(45,212,191,0.14), rgba(129,140,248,0.2))",
                  border: "1px solid rgba(45,212,191,0.22)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "3.2rem",
                  marginBottom: "2rem",
                }}
              >
                👩‍💻
              </div>
              <p
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: "#2dd4bf",
                  textTransform: "uppercase",
                  marginBottom: "0.75rem",
                }}
              >
                Directora del Programa
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-display, sans-serif)",
                  fontWeight: 900,
                  fontSize: "clamp(2rem, 4.5vw, 3rem)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                  marginBottom: "1.5rem",
                }}
              >
                Dra. María
                <br />
                Rodríguez
              </h2>
              <p
                style={{
                  fontSize: "0.98rem",
                  color: "rgba(226,232,240,0.62)",
                  lineHeight: 1.8,
                  marginBottom: "2rem",
                }}
              >
                Ex-Research Engineer en Google DeepMind y ex-Staff Engineer en Meta AI.
                Doctora en Machine Learning por la UPM con más de 15 años aplicando IA
                en producción a escala global. Ponente habitual en NeurIPS e ICML.
              </p>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                {["Google DeepMind", "Meta AI", "OpenAI Partner", "15+ años"].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: "5px 14px",
                      borderRadius: "100px",
                      border: "1px solid rgba(45,212,191,0.22)",
                      background: "rgba(45,212,191,0.05)",
                      fontSize: "0.78rem",
                      color: "#2dd4bf",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { num: "12", label: "publicaciones en NeurIPS / ICML", icon: "📄" },
                { num: "3.200+", label: "profesionales formados", icon: "👥" },
                { num: "8", label: "startups de IA fundadas por alumni", icon: "🚀" },
                { num: "94%", label: "de alumni trabajan en IA", icon: "🎯" },
              ].map(({ num, label, icon }) => (
                <div
                  key={label}
                  className="card-lift"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1.25rem",
                    padding: "1.25rem 1.5rem",
                    borderRadius: "12px",
                    border: "1px solid var(--border)",
                    background: "var(--surface)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "1.5rem",
                      width: "46px",
                      textAlign: "center",
                      flexShrink: 0,
                    }}
                  >
                    {icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-display, sans-serif)",
                        fontWeight: 900,
                        fontSize: "1.6rem",
                        color: "#2dd4bf",
                        letterSpacing: "-0.03em",
                      }}
                    >
                      {num}
                    </div>
                    <div
                      style={{
                        fontSize: "0.82rem",
                        color: "rgba(226,232,240,0.55)",
                        marginTop: "1px",
                      }}
                    >
                      {label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRICING ──────────────────────────────────────────────── */}
        <section
          id="precios"
          style={{ padding: "7rem 2rem", background: "rgba(255,255,255,0.012)" }}
        >
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <p
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: "#f97316",
                  textTransform: "uppercase",
                  marginBottom: "1rem",
                }}
              >
                Inversión
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-display, sans-serif)",
                  fontWeight: 900,
                  fontSize: "clamp(2rem, 5vw, 3.75rem)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                }}
              >
                Elige tu
                <br />
                <span style={{ color: "#f97316" }}>nivel de acceso.</span>
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
                gap: "1.25rem",
              }}
            >
              {PLANS.map((plan) => (
                <div
                  key={plan.name}
                  className="card-lift"
                  style={{
                    position: "relative",
                    borderRadius: "20px",
                    border: `1px solid ${
                      plan.featured ? plan.accent + "55" : "var(--border)"
                    }`,
                    background: plan.featured
                      ? `rgba(129,140,248,0.07)`
                      : "var(--surface)",
                    padding: "2.5rem 2rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem",
                  }}
                >
                  {plan.badge && (
                    <div
                      style={{
                        position: "absolute",
                        top: "-14px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        padding: "4px 18px",
                        borderRadius: "100px",
                        background: plan.accent,
                        color: "#060612",
                        fontSize: "0.68rem",
                        fontWeight: 800,
                        letterSpacing: "0.1em",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {plan.badge}
                    </div>
                  )}

                  <div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        color: plan.accent,
                        textTransform: "uppercase",
                        marginBottom: "0.6rem",
                      }}
                    >
                      {plan.name}
                    </div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "3px" }}>
                      <span style={{ fontSize: "0.9rem", color: "rgba(226,232,240,0.45)" }}>€</span>
                      <span
                        style={{
                          fontFamily: "var(--font-display, sans-serif)",
                          fontWeight: 900,
                          fontSize: "3.2rem",
                          color: "#e2e8f0",
                          letterSpacing: "-0.04em",
                          lineHeight: 1,
                        }}
                      >
                        {plan.price}
                      </span>
                    </div>
                    <div style={{ fontSize: "0.78rem", color: "rgba(226,232,240,0.38)", marginTop: "3px" }}>
                      pago único · sin suscripción
                    </div>
                  </div>

                  <ul
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.7rem",
                      listStyle: "none",
                      flex: 1,
                    }}
                  >
                    {plan.perks.map((perk) => (
                      <li
                        key={perk}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.75rem",
                          fontSize: "0.88rem",
                          color: "rgba(226,232,240,0.78)",
                        }}
                      >
                        <span style={{ color: plan.accent, fontWeight: 700, flexShrink: 0 }}>
                          ✓
                        </span>
                        {perk}
                      </li>
                    ))}
                  </ul>

                  <button
                    style={{
                      width: "100%",
                      padding: "14px",
                      borderRadius: "100px",
                      border: `1px solid ${plan.accent}`,
                      background: plan.featured ? plan.accent : "transparent",
                      color: plan.featured ? "#060612" : plan.accent,
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      cursor: "pointer",
                      fontFamily: "var(--font-body, sans-serif)",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      if (!plan.featured)
                        e.currentTarget.style.background = `${plan.accent}18`;
                    }}
                    onMouseLeave={(e) => {
                      if (!plan.featured)
                        e.currentTarget.style.background = "transparent";
                    }}
                  >
                    {plan.cta} →
                  </button>
                </div>
              ))}
            </div>

            <p
              style={{
                textAlign: "center",
                marginTop: "1.5rem",
                fontSize: "0.78rem",
                color: "rgba(226,232,240,0.3)",
              }}
            >
              *La garantía de entrevistas aplica a candidatos que completan el 100% del programa. Consulta condiciones.
            </p>
          </div>
        </section>

        {/* ── TESTIMONIALS ─────────────────────────────────────────── */}
        <section style={{ padding: "7rem 2rem" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <p
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: "#2dd4bf",
                  textTransform: "uppercase",
                  marginBottom: "1rem",
                }}
              >
                Testimonios
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-display, sans-serif)",
                  fontWeight: 900,
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                }}
              >
                Lo dicen quienes ya
                <br />
                <span className="gradient-text">lo vivieron.</span>
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
                gap: "1.25rem",
              }}
            >
              {TESTIMONIALS.map((t) => (
                <div
                  key={t.name}
                  className="card-lift"
                  style={{
                    padding: "2rem",
                    borderRadius: "16px",
                    border: "1px solid var(--border)",
                    background: "var(--surface)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.25rem",
                  }}
                >
                  <div
                    style={{
                      fontSize: "2.8rem",
                      color: t.color,
                      opacity: 0.55,
                      lineHeight: 1,
                      fontFamily: "Georgia, serif",
                    }}
                  >
                    "
                  </div>
                  <p
                    style={{
                      fontSize: "0.93rem",
                      color: "rgba(226,232,240,0.78)",
                      lineHeight: 1.78,
                      flex: 1,
                    }}
                  >
                    {t.text}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.875rem",
                      paddingTop: "1rem",
                      borderTop: "1px solid var(--border)",
                    }}
                  >
                    <div
                      style={{
                        width: "42px",
                        height: "42px",
                        borderRadius: "50%",
                        background: `linear-gradient(135deg, ${t.color}40, ${t.color}1a)`,
                        border: `1px solid ${t.color}38`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "var(--font-display, sans-serif)",
                        fontWeight: 700,
                        fontSize: "0.78rem",
                        color: t.color,
                        flexShrink: 0,
                      }}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>{t.name}</div>
                      <div
                        style={{
                          fontSize: "0.78rem",
                          color: "rgba(226,232,240,0.45)",
                          marginTop: "1px",
                        }}
                      >
                        {t.role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ─────────────────────────────────────────────── */}
        <section style={{ padding: "4rem 2rem 7rem" }}>
          <div
            style={{
              maxWidth: "820px",
              margin: "0 auto",
              textAlign: "center",
              padding: "5rem 2rem",
              borderRadius: "28px",
              border: "1px solid rgba(45,212,191,0.2)",
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(45,212,191,0.09) 0%, transparent 65%), var(--surface)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              className="dot-grid"
              style={{
                position: "absolute",
                inset: 0,
                opacity: 0.4,
                pointerEvents: "none",
              }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>
              <p
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: "#2dd4bf",
                  textTransform: "uppercase",
                  marginBottom: "1.5rem",
                }}
              >
                Plazas limitadas
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-display, sans-serif)",
                  fontWeight: 900,
                  fontSize: "clamp(2.2rem, 5.5vw, 4rem)",
                  lineHeight: 1.0,
                  letterSpacing: "-0.035em",
                  marginBottom: "1.5rem",
                }}
              >
                Tu carrera en IA
                <br />
                empieza hoy.
              </h2>
              <p
                style={{
                  fontSize: "1.08rem",
                  color: "rgba(226,232,240,0.58)",
                  marginBottom: "2.5rem",
                  lineHeight: 1.72,
                }}
              >
                La próxima convocatoria comienza en septiembre. Quedan{" "}
                <strong style={{ color: "#f97316" }}>12 plazas disponibles</strong>.
              </p>
              <button
                className="btn-glow"
                style={{
                  padding: "18px 56px",
                  borderRadius: "100px",
                  border: "none",
                  color: "#060612",
                  fontWeight: 800,
                  fontSize: "1.1rem",
                  cursor: "pointer",
                  fontFamily: "var(--font-body, sans-serif)",
                }}
              >
                Reservar mi plaza ahora →
              </button>
              <p
                style={{
                  marginTop: "1.25rem",
                  fontSize: "0.82rem",
                  color: "rgba(226,232,240,0.3)",
                }}
              >
                Sin compromiso · Garantía de 30 días · Pago seguro
              </p>
            </div>
          </div>
        </section>

        {/* ── FOOTER ───────────────────────────────────────────────── */}
        <footer
          style={{
            borderTop: "1px solid var(--border)",
            padding: "2.5rem 2rem",
          }}
        >
          <div
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1.25rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "7px",
                  background: "linear-gradient(135deg, #2dd4bf, #818cf8)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "13px",
                }}
              >
                🧠
              </div>
              <span
                style={{
                  fontFamily: "var(--font-display, sans-serif)",
                  fontWeight: 700,
                  fontSize: "0.82rem",
                  letterSpacing: "-0.01em",
                }}
              >
                AIFormación
              </span>
            </div>

            <div style={{ display: "flex", gap: "1.75rem", flexWrap: "wrap" }}>
              {["Aviso legal", "Privacidad", "Cookies", "Contacto"].map((link) => (
                <a key={link} href="#" className="link-fade" style={{ fontSize: "0.82rem" }}>
                  {link}
                </a>
              ))}
            </div>

            <div style={{ fontSize: "0.78rem", color: "rgba(226,232,240,0.28)" }}>
              © 2026 AIFormación. Todos los derechos reservados.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
