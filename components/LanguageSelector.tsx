"use client";

import React from "react";
import { useLanguage } from "@/app/context/LanguageContext";

export default function LanguageSelector() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setLang("en")}
        className={`px-3 py-1 rounded ${
          lang === "en" ? "bg-blue-600 text-white" : "bg-gray-200"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLang("ur")}
        className={`px-3 py-1 rounded ${
          lang === "ur" ? "bg-green-600 text-white" : "bg-gray-200"
        }`}
      >
        اردو
      </button>
    </div>
  );
}
