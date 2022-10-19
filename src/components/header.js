import { moneyFormat } from "../helpers";
import { useSite } from "../context/SiteContext";
import "../css/Header.css";

function Header() {
  const { total, money, setMoney, admin, setAdmin } = useSite();

  const loginHandle = () => {
    setAdmin(true);
  };
  const logoutHandle = () => {
    setAdmin(false);
  };

  const changeMoney = (moneyHeader) => {
    if (moneyHeader >= 0) {
      setMoney(+moneyHeader);
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
