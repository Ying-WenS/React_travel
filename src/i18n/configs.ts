import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translation_en from "./en.json";
import translation_zh from "./zh.json";

const resources = {
    en: {
      translation: translation_en,},
    zh: {
      translation: translation_zh,
    }
  };

  i18n
  .use(initReactI18next) //通過react i18的框架
  .init({
    resources, //使用的檔案
    lng: "zh", 
    interpolation: {
      escapeValue: false //防止xss攻擊
    }
  });

  export default i18n;