import { getLocales } from 'expo-localization';
import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources } from './locales/resources';

const fallbackLanguage = 'en';
const languages = Object.keys(resources);

const locales = getLocales();
const currentLanguage = locales.length > 0 ? locales[0].languageCode : fallbackLanguage;

const i18nInstance = createInstance();

i18nInstance.use(initReactI18next).init(
  {
    resources,
    lng: currentLanguage || fallbackLanguage,
    fallbackLng: fallbackLanguage,
    interpolation: {
      escapeValue: false,
    },
  },
  (err) => {
    err && console.error('failed init i18next:', err);
  },
);

export { languages, currentLanguage, i18nInstance };
