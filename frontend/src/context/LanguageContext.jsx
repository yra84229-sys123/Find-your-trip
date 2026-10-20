import React, { createContext, useContext, useState, useEffect } from 'react';
import translations from '../data/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [lang, setLangState] = useState(() => {
        return localStorage.getItem('fyt-lang') || 'en';
    });

    useEffect(() => {
        localStorage.setItem('fyt-lang', lang);
    }, [lang]);

    const changeLanguage = (newLang) => {
        setLangState(newLang);
    };

    const t = (key) => {
        if (translations[lang] && translations[lang][key]) {
            return translations[lang][key];
        }
        if (translations.en && translations.en[key]) {
            return translations.en[key];
        }
        return key;
    };

    return (
        <LanguageContext.Provider value={{ lang, changeLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => useContext(LanguageContext);
