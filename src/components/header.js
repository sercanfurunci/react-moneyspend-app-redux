import React from "react";
import { moneyFormat } from "../helpers/moneyHelper";
import { useDispatch, useSelector } from "react-redux";
import { setAdmin } from "../store/actions/actions";
import "../css/Header.css";
import TranslateHelper from "../helpers/translateHelper";


function Header() {
  const dispatch = useDispatch();

  const roots = useSelector((state) => state.roots);

  const toggleAdmin = () => {
    dispatch(setAdmin());
  };

  const leftMoney = moneyFormat(roots.money - roots.total);

  const handleLangChange = (lang) => {
    TranslateHelper.changeLanguage(lang);
  };

  return (
    <React.Fragment>
      {roots.total > 0 && roots.money - roots.total !== 0 && (
        <div className="header">
          {TranslateHelper.formatTranslate("header_spend", { leftMoney })}
        </div>
      )}
      {roots.total === 0 && (
        <div className="header">
          <div className="admin">
            {(roots.admin && (
              <button onClick={toggleAdmin}>
                {TranslateHelper.translate("logout")}
              </button>
            )) || (
              <button onClick={toggleAdmin}>
                {TranslateHelper.translate("login")}
              </button>
            )}
          </div>
          {TranslateHelper.formatTranslate("header_input", { leftMoney })}
        </div>
      )}
      {roots.money - roots.total === 0 && (
        <div className="header empty">
          {TranslateHelper.translate("header_empty")}
        </div>
      )}
      {!roots.admin && (
        <>
          <button
            className="langChangeButton"
            onClick={() => handleLangChange("tr")}
          >
            TR
          </button>
          <button
            className="langChangeButton"
            onClick={() => handleLangChange("en")}
          >
            EN
          </button>
        </>
      )}
    </React.Fragment>
  );
}

export default Header;
