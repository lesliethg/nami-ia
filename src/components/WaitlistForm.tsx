"use client";

import { useState, FormEvent } from "react";
import { supabase } from "../lib/supabase/client";

type WaitlistFormProps = {
  variant?: "hero" | "footer";
};

type FormState = "idle" | "loading" | "success" | "error";

export default function WaitlistForm({ variant = "hero" }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Nettoyer l'email
    const cleanedEmail = email.trim().toLowerCase();

    // Validation basique
    if (!cleanedEmail || !cleanedEmail.includes("@")) {
      setState("error");
      setMessage("Veuillez entrer une adresse email valide.");
      return;
    }

    setState("loading");
    setMessage("");

    try {
      const { error } = await supabase.from("waitlist").insert({
        email: cleanedEmail,
      });

      if (error) {
        // Erreur 23505 = violation de contrainte unique (email déjà existant)
        if (error.code === "23505") {
          setState("success");
          setMessage("Tu es déjà inscrit(e) ! On te préviendra dès le lancement.");
        } else {
          setState("error");
          setMessage("Une erreur est survenue. Réessaie dans quelques instants.");
        }
      } else {
        setState("success");
        setMessage("Merci ! On te préviendra dès que Nami sera prêt.");
        setEmail("");
      }
    } catch (err) {
      setState("error");
      setMessage("Une erreur est survenue. Réessaie dans quelques instants.");
    }
  };

  const isHero = variant === "hero";

  return (
    <div className={isHero ? "mt-8" : ""}>
      <form onSubmit={handleSubmit} className={isHero ? "flex flex-col gap-3 sm:flex-row sm:items-stretch" : "mt-6"}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Votre adresse e-mail"
          disabled={state === "loading"}
          required
          className={
            isHero
              ? "flex-1 rounded-full border border-slate-300 px-5 py-3 text-sm outline-none focus:border-[#F04E3E] focus:ring-2 focus:ring-[#F04E3E]/20 disabled:opacity-50 disabled:cursor-not-allowed"
              : "w-full rounded-xl border px-4 py-3 text-sm outline-none focus:border-[#F04E3E] disabled:opacity-50 disabled:cursor-not-allowed"
          }
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className={
            isHero
              ? "rounded-full bg-[#F04E3E] px-6 py-3 text-sm font-medium text-white hover:opacity-90 transition whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              : "mt-4 w-full rounded-xl bg-[#F04E3E] px-4 py-3 text-sm font-medium text-white hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          }
        >
          {state === "loading" ? "Envoi..." : isHero ? "Être prévenu du lancement" : "M'inscrire"}
        </button>
      </form>

      {/* Messages de statut */}
      {state === "success" && (
        <div className={isHero ? "mt-2" : "mt-4"}>
          <p className="text-sm text-green-600 font-medium">{message}</p>
        </div>
      )}

      {state === "error" && (
        <div className={isHero ? "mt-2" : "mt-4"}>
          <p className="text-sm text-red-600 font-medium">{message}</p>
        </div>
      )}

      {/* Micro-copy rassurante */}
      {state === "idle" && (
        <p className={isHero ? "mt-2 text-xs text-slate-500" : "mt-4 text-xs text-slate-500"}>
          Un seul email au lancement. Aucun spam.
        </p>
      )}
    </div>
  );
}
