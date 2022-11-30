import i18next from "i18next";

const translate = (key) => {
  return i18next.t(key);
};

const formatTranslate = (key, format) => {
  return i18next.t(key, { ...format });
};

const changeLanguage = (key) => {
  localStorage.setItem("language", key)
  i18next.changeLanguage(key);
};

const translateHelper = {
  translate,
  formatTranslate,
  changeLanguage,
};

export default translateHelper;