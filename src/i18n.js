import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../public/locales/en.json';
import tw from '../public/locales/zh-tw.json';

const resources = {
  en: {
    translation: en,
  },
  tw: {
    translation: tw,
  },
};

i18n
.use(initReactI18next)
.init({
  resources,
  lng: 'tw',
  fallbackLng: 'tw',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;