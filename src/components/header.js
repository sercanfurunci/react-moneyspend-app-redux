import React from "react";
import { moneyFormat } from "../helpers/moneyHelper";
import { useDispatch, useSelector } from "react-redux";
import { setAdmin } from "../store/actions/actions";
import "../css/Header.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "antd";

function Header() {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const roots = useSelector((state) => state.roots);

  const toggleAdmin = () => {
    dispatch(setAdmin());
  };

  const leftMoney = moneyFormat(roots.money - roots.total);

  return (
    <React.Fragment>
      {roots.total > 0 && roots.money - roots.total !== 0 && (
        <div className="header">{t("header_spend", { leftMoney })}</div>
      )}
      {roots.total === 0 && (
        <div className="header">
          <div className="admin">
            {!roots.admin ? (
              <Button>
                <Link to="/login">{t("login")}</Link>
              </Button>
            ) : (
              <Button onClick={toggleAdmin}>{t("logout")}</Button>
            )}
          </div>
          {t("header_input", { leftMoney })}
        </div>
      )}
      {roots.money - roots.total === 0 && (
        <div className="header empty">{t("header_empty")}</div>
      )}
    </React.Fragment>
  );
}

export default Header;
