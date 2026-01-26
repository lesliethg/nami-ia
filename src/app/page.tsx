import Image from "next/image";
import TypewriterHeroTitle from "../components/TypewriterHeroTitle";
import WaitlistForm from "../components/WaitlistForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FFF9EC] text-slate-900">
      {/* HERO */}
      <section className="mx-auto max-w-6xl px-4 pt-20 pb-16">
        <div className="grid gap-14 md:grid-cols-2 md:items-center">
          <div>
            <div className="flex items-center gap-1 mb-4">
              <div className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center">
                <Image
                  src="/brain.svg"
                  alt="Brain logo"
                  width={80}
                  height={80}
                  className="h-16 w-16 md:h-20 md:w-20"
                />
              </div>
              <span className="text-4xl md:text-5xl font-bold tracking-tight text-[#F04E3E]">
                nami
              </span>
            </div>
            
            <span className="inline-block rounded-full bg-[#FFE3DD] px-4 py-1 text-xs font-medium text-[#B9382D]">
              Une IA conversationnelle, pensée pour la grossesse et le post-partum
            </span>

            <div className="mt-6">
              <TypewriterHeroTitle />
            </div>

            <WaitlistForm variant="hero" />

            <div className="mt-6 flex flex-wrap items-center gap-8 text-sm text-slate-600">
              <span className="flex items-center gap-1">
                <span>✔︎</span>
                <span>Privacy-first</span>
              </span>
              <span className="flex items-center gap-1">
                <span>✔︎</span>
                <span>Mémoire contrôlée</span>
              </span>
              <span className="flex items-center gap-1">
                <span>✔︎</span>
                <span>Pas un avis médical</span>
              </span>
            </div>
          </div>

          {/* HERO IMAGE */}
          <div className="relative bg-transparent">
            <Image
              src="/hero_image.png"
              alt="Femme enceinte utilisant son smartphone avec des bulles de pensées représentant ses doutes et ses espoirs"
              width={600}
              height={600}
              className="w-full h-auto rounded-3xl"
              style={{ backgroundColor: 'transparent' }}
              priority
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="mx-auto max-w-6xl px-4 pb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          <span className="relative inline-block">
            <span className="relative z-10">Comment ça marche ?</span>
            <span className="absolute inset-x-0 bottom-0.5 h-3 bg-[#F04E3E] -z-0 rounded" style={{ opacity: 0.3 }} />
          </span>
        </h2>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {[
            {
              title: "Tu poses ta question",
              desc: "Même les plus personnelles, comme tu le ferais déjà avec une IA classique.",
            },
            {
              title: "Nami utilise le contexte",
              desc: "Uniquement ce que tu as choisi de partager, pour te répondre sans que tu aies à tout répéter.",
            },
            {
              title: "Tes informations restent confidentielles",
              desc: "Parce que parler de son corps, de sa santé ou de ses examens est intime. Ce que tu partages avec Nami ne sert qu'à t'accompagner, et rien d'autre.",
            },
            {
              title: "Une réponse claire et rassurante",
              desc: "Avec pédagogie, signaux d’alerte et orientation si besoin.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-3xl bg-white p-6 border-2 border-dashed border-[#FFE3DD] shadow-sm"
            >
              <p className="font-semibold">{item.title}</p>
              <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WAITLIST */}
      <section
        id="waitlist"
      >
        <div className="mx-auto max-w-6xl px-4 pt-12 pb-20">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-3xl bg-[#FFE3DD] p-8 shadow-sm text-center">
              <h2 className="text-3xl font-bold text-[#B9382D]">
                <span className="relative inline-block">
                  <span className="relative z-10">Rejoins la liste d'attente</span>
                  <span className="absolute inset-x-0 bottom-0.5 h-3 bg-white -z-0 rounded" style={{ opacity: 0.8 }} />
                </span>
              </h2>
              <p className="mt-3 text-sm text-slate-700">
                <strong className="italic">Nami est encore en construction</strong> : on le peaufine avec soin pour offrir une expérience vraiment respectueuse et utile.
                <br />
                Laisse-nous ton email pour être prévenu(e) dès qu'il sera prêt.
              </p>

              <WaitlistForm variant="footer" />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10">
        <div className="mx-auto max-w-6xl px-4 text-sm text-slate-600">
          <p>© {new Date().getFullYear()} — nami</p>
          <p className="mt-2">Contact : hello@nami.ai</p>
        </div>
      </footer>
    </main>
  );
}
