import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import { trMessages } from "./tr.js";
import { enMessages } from "./en.js";

i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        fallbackLng: "en",
        resources: {
            en: { translation: { ...enMessages } },
            tr: { translation: { ...trMessages } },
        },
    });