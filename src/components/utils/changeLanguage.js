import React from "react";
import { useTranslation } from "react-i18next";
import "../../css/changeLanguage.css";

const languages = {
  en: { nativeName: "English", flag: "https://flagcdn.com/w320/gb.png" },
  tr: { nativeName: "Turkish", flag: "https://flagcdn.com/w320/tr.png" },
};

function ChangeLanguageButton() {
  const { i18n } = useTranslation();

  return (
    <div className="buttons">
      {Object.keys(languages).map((language) => (
        <button
          className="change_button"
          type="submit"
          key={language}
          onClick={() => i18n.changeLanguage(language)}
          disabled={i18n.resolvedLanguage === language}
        >
          <img
            src={languages[language].flag}
            alt={languages[language].nativeName}
          />
        </button>
      ))}
    </div>
  );
}

export default ChangeLanguageButton;
