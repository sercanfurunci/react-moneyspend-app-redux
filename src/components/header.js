import { moneyFormat } from "../helpers";
import "../css/Header.css";
import { setMoney } from "../stores/money";
import { useDispatch, useSelector } from "react-redux";
import { setAdmin } from "../stores/admin";

function Header() {
  const dispatch = useDispatch();

  const money = useSelector((state) => state.money.money);
  const admin = useSelector((state) => state.admin.admin);
  const total = useSelector((state) => state.total.total);

  const loginHandle = () => {
    dispatch(setAdmin(true));
  };
  const logoutHandle = () => {
    dispatch(setAdmin(false));
  };

  const changeMoney = (moneyHeader) => {
    if (moneyHeader >= 0) {
      dispatch(setMoney(+moneyHeader));
    } else return false;
  };

  return (
    <>
      {total > 0 && money - total !== 0 && (
        <div className="header">
          Harcayacak <span>$ {moneyFormat(money - total)}</span> paranız kaldı!
        </div>
      )}
      {total === 0 && (
        <div className="header">
          <div className="admin">
            {(admin && <button onClick={logoutHandle}>Çıkış yap</button>) || (
              <button onClick={loginHandle}> Giriş yap</button>
            )}
          </div>
          Harcamak için $
          <span>
            <input
              className="header-input"
              type="text"
              min="0"
              onChange={(e) => changeMoney(e.target.value)}
              value={money}
            />
          </span>
          paranız var!
        </div>
      )}
      {money - total === 0 && <div className="header empty">Paran bitti!</div>}
    </>
  );
}

export default Header;
