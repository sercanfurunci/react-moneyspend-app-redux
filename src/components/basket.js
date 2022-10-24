import BasketItem from "./basketItem";
import { moneyFormat } from "../helpers";
import { useSite } from "../context/SiteContext";
import "../css/Basket.css";
import { useSelector, useDispatch } from "react-redux";
import { resetBasket } from "../stores/basket";

function Basket() {
  const { products } = useSite();

  const dispatch = useDispatch();
  const basket = useSelector((state) => state.basket.basket);
  const total = useSelector((state) => state.total.total);
  return (
    <>
      <div className="basket-container container">
        <h3>Alışveriş Detayları</h3>
        <ul>
          {basket.map((item) => (
            <BasketItem
              key={item.id}
              item={item}
              product={products.find((p) => p.id === item.id)}
            />
          ))}
        </ul>
        <div className="total">Toplam: ${moneyFormat(total)}</div>
        <button
          className="basket-reset-btn"
          onClick={() => dispatch(resetBasket())}
        >
          Sepeti Sıfırla
        </button>
      </div>
    </>
  );
}

export default Basket;
