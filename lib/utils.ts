import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { voices, subjectsColors } from "@/constants";
import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";


// ✅ utility to merge Tailwind + classnames
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getSubjectColor = (subject: string) => {
  return subjectsColors[subject as keyof typeof subjectsColors];
};

// ✅ main assistant configuration function
export const configureAssistant = (voice: string, style: string, lang: "en" | "ur" = "en") => {
  const voiceId =
    voices[voice as keyof typeof voices][style as keyof (typeof voices)[keyof typeof voices]] ||
    "sarah";

  const vapiAssistant: CreateAssistantDTO = {
    name: "Companion",
    firstMessage:
      lang === "ur"
        ? "السلام علیکم! آج ہم ${topic} کے بارے میں بات کریں گے۔"
        : "Hello, let's start the session. Today we'll be talking about ${topic}.",

    transcriber: {
      provider: "deepgram",
      model: "nova-3",
      language: lang === "ur" ? "ur" : "en",   // ✅ correct Deepgram code
    },

    voice: {
      provider: "11labs",
      voiceId:
        lang === "ur"
          ? voices.female.casual // ✅ fallback to English voice for now
          : voiceId,
      stability: 0.4,
      similarityBoost: 0.8,
      speed: 1,
      style: 0.5,
      useSpeakerBoost: true,
    },

    model: {
      provider: "openai",
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            lang === "ur"
              ? `آپ ایک دوستانہ استاد ہیں جو حقیقی وقت میں سبق پڑھاتے ہیں۔
موضوع {{topic}} اور مضمون {{subject}} ہے۔ سادہ اردو استعمال کریں اور آہستہ بولیں۔`
              : `You are a knowledgeable tutor teaching a real-time voice session.
Stick to topic {{topic}} and subject {{subject}}.`,
        },
      ],
    },
  };

  return vapiAssistant;
};
