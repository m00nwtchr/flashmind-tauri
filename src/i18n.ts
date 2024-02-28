import i18n from "i18next";
import Backend from "i18next-fluent-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import Fluent from "i18next-fluent";
void i18n
	.use(Fluent)
	.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: "pl",

		// have a common namespace used around the full app
		ns: ["translations"],
		defaultNS: "translations",

		// debug: true,

		interpolation: {
			escapeValue: false, // not needed for react!!
		},
	});

export default i18n;
