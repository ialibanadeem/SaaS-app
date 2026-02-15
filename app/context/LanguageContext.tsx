"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Lang = "en" | "ur";

const LanguageContext = createContext({
  lang: "en" as Lang,
  setLang: (l: Lang) => {},
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("en");

  // ✅ only read from localStorage on the client
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("lang") as Lang | null;
      if (stored) setLang(stored);
    }
  }, []);

  const setLangAndStore = (l: Lang) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", l);
    }
    setLang(l);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: setLangAndStore }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
