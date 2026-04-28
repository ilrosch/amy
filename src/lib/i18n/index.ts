/* eslint-disable prettier/prettier */
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next";
import { getLocales } from "expo-localization";

import ru from "./locales/ru/index";
import en from "./locales/en/index";

export const currentLng = getLocales()[0].languageCode;

export const resources = {
  en: { translation: en },
  ru: { translation: ru },
};

export const i18nextInstance = createInstance();

i18nextInstance
  .use(initReactI18next)
  .init(
    {
      resources,
      lng: currentLng ?? "en",
      fallbackLng: "en",
    },
    (err) => err && console.error(err)
  );
