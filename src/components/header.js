import React from "react";
import { moneyFormat } from "../helpers";
import { useDispatch, useSelector } from "react-redux";
import { setAdmin, setMoney } from "../store/actions/actions";
import "../css/Header.css";

function Header() {
  const dispatch = useDispatch();

  const roots = useSelector((state) => state.roots);

  const toggleAdmin = () => {
    dispatch(setAdmin());
  };

  const changeMoney = (moneyHeader) => {
    if (moneyHeader >= 0) {
      dispatch(setMoney(+moneyHeader));
    } else return false;
  };

  return (
    <React.Fragment>
      {roots.total > 0 && roots.money - roots.total !== 0 && (
        <div className="header">
          Harcayacak <span>$ {moneyFormat(roots.money - roots.total)}</span>{" "}
          paranız kaldı!
        </div>
      )}
      {roots.total === 0 && (
        <div className="header">
          <div className="admin">
            {(roots.admin && (
              <button onClick={toggleAdmin}>Çıkış yap</button>
            )) || <button onClick={toggleAdmin}> Giriş yap</button>}
          </div>
          Harcamak için $
          <span>
            <input
              className="header-input"
              type="text"
              min="0"
              onChange={(e) => changeMoney(e.target.value)}
              value={roots.money}
            />
          </span>
          paranız var!
        </div>
      )}
      {roots.money - roots.total === 0 && (
        <div className="header empty">Paran bitti!</div>
      )}
    </React.Fragment>
  );
}

export default Header;
