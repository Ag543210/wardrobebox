import React, { useState, useEffect, useRef } from "react";

export default function App() {
  // steg & routing
  const [step, setStep] = useState("home");

  // quiz
  const [quizStep, setQuizStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const quiz = [
    { q: "Vilken stil beskriver dig bäst?", options: ["Casual", "Business", "Trendig", "Sportig"] },
    { q: "Vilka färger föredrar du?", options: ["Neutrala", "Färgglada", "Mörka", "Blandat"] },
    { q: "Vilken budget passar dig bäst?", options: ["Under 30€", "30–60€", "60–100€", "100€+"] }
  ];
  function handleAnswer(option) {
    setAnswers({ ...answers, [quizStep]: option });
    if (quizStep < quiz.length - 1) setQuizStep(quizStep + 1);
    else setStep("quiz-result");
  }

  // prenumerationsplaner
  const plans = [
    { name: "Basic", price: "29 €/månad", desc: "3 plagg – enkel och personlig stil" },
    { name: "Standard", price: "49 €/månad", desc: "5 plagg – mix av nya & pre-loved" },
    { name: "Premium", price: "79 €/månad", desc: "Lyxigare val och exklusiva märken" }
  ];

  const [selectedPlan, setSelectedPlan] = useState(null);

  // komponent för navigationsknappar
  const NavButton = ({ id, label }) => (
    <button
      onClick={() => setStep(id)}
      className={`hover:text-lux-gold transition ${
        step === id ? "text-lux-gold font-semibold" : ""
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-lux-dark text-lux-light">
      {/* HEADER */}
      <header className="flex justify-between items-center p-6 shadow-md bg-black/40 backdrop-blur-md sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <img src="/WardrobeBox Logo Design.png" alt="WardrobeBox" className="h-10 w-auto" />
          <h1 className="text-2xl font-bold tracking-wide text-lux-light">WardrobeBox</h1>
        </div>
        <nav className="hidden md:flex gap-6 text-lg">
          <NavButton id="home" label="Hem" />
          <NavButton id="about" label="Hur det fungerar" />
          <NavButton id="quiz" label="AI-Stylist" />
          <NavButton id="subscribe" label="Prenumeration" />
        </nav>
      </header>

      {/* INNEHÅLL */}
      <main className="p-6 md:p-10 max-w-5xl mx-auto space-y-12">
        {/* STARTSIDA */}
        {step === "home" && (
          <section className="text-center mt-8 md:mt-16">
            <h2 className="text-4xl font-bold mb-4 text-lux-gold">
              Din personliga garderob – utan krångel
            </h2>
            <p className="text-lg mb-8 text-lux-light/90 max-w-3xl mx-auto">
              WardrobeBox är en månatlig surprise-box med både nya och pre-loved plagg,
              utvalda av vår AI-stylist + mänsklig stylist. Prova hemma, behåll det du älskar
              och returnera resten – cirkulärt och hållbart.
            </p>
            <img
              src="/WardrobeBox Packaging Close-Up (1).png"
              alt="WardrobeBox"
              className="mx-auto rounded-2xl shadow-xl mb-8 w-full max-w-md"
            />
            <div className="flex gap-3 justify-center">
              <button
                className="px-5 py-3 rounded-xl bg-lux-gold text-lux-dark hover:bg-lux-light transition"
                onClick={() => setStep("quiz")}
              >
                Starta stilquiz
              </button>
              <button
                className="px-5 py-3 rounded-xl border border-lux-gold text-lux-light hover:bg-lux-gold/10"
                onClick={() => setStep("subscribe")}
              >
                Se planer
              </button>
            </div>
          </section>
        )}

        {/* HUR DET FUNGERAR */}
        {step === "about" && (
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-lux-gold mb-4">Hur det fungerar</h2>
            <ol className="list-decimal list-inside space-y-2 text-lux-light/90">
              <li>Fyll i stilquiz så vår AI lär känna din smak, storlek och budget.</li>
              <li>Få en månadsbox med nya och begagnade kläder, noga utvalt för dig.</li>
              <li>Prova hemma. Behåll det du älskar, returnera resten gratis.</li>
              <li>Cirkulera – plaggen tvättas och går vidare till nästa kund ♻️.</li>
            </ol>
          </section>
        )}

        {/* QUIZ */}
        {step === "quiz" && (
          <section className="text-center">
            {quizStep < quiz.length ? (
              <>
                <h2 className="text-2xl font-semibold mb-6 text-lux-gold">{quiz[quizStep].q}</h2>
                <div className="flex flex-col md:flex-row justify-center gap-3">
                  {quiz[quizStep].options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleAnswer(opt)}
                      className="px-5 py-3 rounded-xl border border-lux-gold text-lux-light hover:bg-lux-gold/20"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </>
            ) : null}
          </section>
        )}

        {/* QUIZ RESULT */}
        {step === "quiz-result" && (
          <section className="text-center">
            <h2 className="text-3xl font-bold mb-4 text-lux-gold">Din stilprofil är klar!</h2>
            <p className="mb-6 text-lux-light/90">
              Vi rekommenderar en mix av{" "}
              <strong>{answers[1] || "valda"}</strong> plagg med en{" "}
              <strong>{answers[0] || "personlig"}</strong> stil i prisklassen{" "}
              <strong>{answers[2] || "30–60 €"}</strong>.
            </p>
            <button
              className="px-5 py-3 rounded-xl bg-lux-gold text-lux-dark hover:bg-lux-light"
              onClick={() => setStep("subscribe")}
            >
              Välj prenumeration
            </button>
          </section>
        )}

        {/* PRENUMERATION */}
        {step === "subscribe" && (
          <section>
            <h2 className="text-3xl font-bold mb-4 text-lux-gold">Prenumerera på din stil</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {plans.map((p) => (
                <div
                  key={p.name}
                  className="bg-black/40 border border-lux-gold/50 rounded-2xl p-6 text-center hover:shadow-lg transition"
                >
                  <h3 className="text-2xl font-semibold mb-2 text-lux-light">{p.name}</h3>
                  <div className="text-lux-gold font-bold mb-2">{p.price}</div>
                  <p className="text-lux-light/80 mb-4">{p.desc}</p>
                  <button
                    className="px-4 py-2 rounded-xl border border-lux-gold text-lux-light hover:bg-lux-gold/20"
                    onClick={() => setSelectedPlan(p)}
                  >
                    Välj plan
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
// --- SLUT DEL 1 ---
