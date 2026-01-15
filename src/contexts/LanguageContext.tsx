"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "cz" | "ru" | "en";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>("cz");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (typeof window !== "undefined") {
            const savedLang = localStorage.getItem("language") as Language;
            if (savedLang && (savedLang === "cz" || savedLang === "ru" || savedLang === "en")) {
                setLanguageState(savedLang);
            }
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        if (typeof window !== "undefined") {
            localStorage.setItem("language", lang);
        }
    };

    const t = (key: string): string => {
        try {
            // Dynamic import for translations
            let translations: Record<string, string> = {};
            if (language === "cz") {
                translations = require("../translations/cz.json");
            } else if (language === "ru") {
                translations = require("../translations/ru.json");
            } else if (language === "en") {
                translations = require("../translations/en.json");
            }
            
            // Support nested keys like "header.home"
            const keys = key.split(".");
            let value: any = translations;
            for (const k of keys) {
                value = value?.[k];
                if (value === undefined) break;
            }
            return typeof value === "string" ? value : key;
        } catch (error) {
            return key;
        }
    };

    // Always provide context, even before mounting
    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
