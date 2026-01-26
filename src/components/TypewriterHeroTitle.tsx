"use client";

import { useState, useEffect, useRef } from "react";

// Constantes d'animation (modifiables)
const TYPING_SPEED = 40; // ms par caractère
const DELETING_SPEED = 25; // ms par caractère
const PAUSE_AFTER_COMPLETE = 900; // ms après phrase complète
const PAUSE_AFTER_DELETE = 250; // ms après effacement complet

const QUESTIONS = [
  "Je suis à 32SA, est-ce que mes douleurs sont normales ?",
  "Quels sont les achats à faire avant l'arrivée de bébé ?",
  "A combien de semaines bébé reconnait ma voix ?",
  "Compare ce modèle de poussette avec...",
];

const FINAL_HEADLINE = "On pose déjà tous nos questions à une IA.";
const FINAL_SUBHEADLINE_PART1 =
  "Comme beaucoup de futurs parents, on l'utilise pour se rassurer (parfois avec des doutes, souvent avec des craintes).";
const FINAL_SUBHEADLINE_PART2 =
  "Nami comprend ton parcours de grossesse, se souvient de là où tu en es, et t'accompagne sans jamais compromettre ta vie privée.";

type AnimationState = "typing" | "deleting" | "paused" | "final";

export default function TypewriterHeroTitle() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [animationState, setAnimationState] = useState<AnimationState>("typing");
  const [showFinal, setShowFinal] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const finalTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const cursorIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Détecter prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Animation du curseur clignotant
  useEffect(() => {
    if (showFinal) {
      // Arrêter le curseur après la phase finale
      if (cursorIntervalRef.current) {
        clearInterval(cursorIntervalRef.current);
      }
      setShowCursor(false);
      return;
    }

    cursorIntervalRef.current = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530); // Fréquence de clignotement

    return () => {
      if (cursorIntervalRef.current) {
        clearInterval(cursorIntervalRef.current);
      }
    };
  }, [showFinal]);

  // Animation principale
  useEffect(() => {
    // Si reduced motion, afficher directement le final
    if (prefersReducedMotion) {
      setShowFinal(true);
      setShowCursor(false);
      return;
    }

    const currentQuestion = QUESTIONS[currentQuestionIndex];

    if (animationState === "typing") {
      if (displayedText.length < currentQuestion.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayedText(currentQuestion.slice(0, displayedText.length + 1));
        }, TYPING_SPEED);
      } else {
        // Phrase complète
        if (currentQuestionIndex === QUESTIONS.length - 1) {
          // Dernière question : passer directement au final après pause
          timeoutRef.current = setTimeout(() => {
            setShowFinal(true);
            setShowCursor(false);
          }, PAUSE_AFTER_COMPLETE);
        } else {
          // Pas la dernière : pause puis effacement
          timeoutRef.current = setTimeout(() => {
            setAnimationState("paused");
          }, PAUSE_AFTER_COMPLETE);
        }
      }
    } else if (animationState === "paused") {
      // Commencer l'effacement (seulement si pas la dernière question)
      timeoutRef.current = setTimeout(() => {
        setAnimationState("deleting");
      }, 100);
    } else if (animationState === "deleting") {
      if (displayedText.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, DELETING_SPEED);
      } else {
        // Effacement complet, pause puis question suivante ou final
        timeoutRef.current = setTimeout(() => {
          if (currentQuestionIndex < QUESTIONS.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setAnimationState("typing");
          } else {
            // Dernière question effacée, afficher le final après pause
            finalTimeoutRef.current = setTimeout(() => {
              setShowFinal(true);
              setShowCursor(false);
            }, PAUSE_AFTER_DELETE);
          }
        }, PAUSE_AFTER_DELETE);
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (finalTimeoutRef.current) {
        clearTimeout(finalTimeoutRef.current);
      }
    };
  }, [
    displayedText,
    animationState,
    currentQuestionIndex,
    prefersReducedMotion,
  ]);

  // Réinitialiser displayedText quand on change de question
  useEffect(() => {
    if (animationState === "typing" && currentQuestionIndex > 0) {
      setDisplayedText("");
    }
  }, [currentQuestionIndex]);

  return (
    <div className="space-y-6">
      <div className="min-h-[4rem] md:min-h-[5rem] flex items-start">
        {showFinal ? (
          <h1 className="text-2xl font-extrabold leading-tight md:text-3xl opacity-0 animate-[fadeIn_0.5s_ease-in_0.1s_forwards]">
            On pose déjà tous nos{" "}
            <span className="relative">
              <span className="relative z-10">questions</span>
              <span className="absolute inset-x-0 bottom-0.5 h-3 bg-[#F04E3E] -z-0 rounded" style={{ opacity: 0.3 }} />
            </span>{" "}
            à une{" "}
            <span className="relative">
              <span className="relative z-10">IA</span>
              <span className="absolute inset-x-0 bottom-0.5 h-3 bg-[#F04E3E] -z-0 rounded" style={{ opacity: 0.3 }} />
            </span>.
          </h1>
        ) : (
          <h1 className="text-2xl font-extrabold leading-tight md:text-3xl">
            {displayedText}
            {showCursor && (
              <span className="ml-1 text-[#F04E3E] animate-pulse">|</span>
            )}
          </h1>
        )}
      </div>
      
      <p className="mt-6 max-w-prose text-lg text-slate-700">
        {FINAL_SUBHEADLINE_PART1}
        <br />
        {FINAL_SUBHEADLINE_PART2}
      </p>
    </div>
  );
}
