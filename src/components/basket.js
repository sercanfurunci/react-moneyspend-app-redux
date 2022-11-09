import React from "react";
import BasketItem from "./basketItem";
import { moneyFormat } from "../helpers";
import { useSite } from "../context/SiteContext";
import { useSelector, useDispatch } from "react-redux";
import { resetBasket } from "../store/actions/actions";
import "../css/Basket.css";

function Basket() {
  const { products } = useSite();

  const dispatch = useDispatch();
  const roots = useSelector((state) => state.roots);
  const baskets = useSelector((state) => state.baskets);

  return (
    <React.Fragment>
      <div className="basket-container container">
        <h3>Alışveriş Detayları</h3>
        <ul>
          {baskets.basket?.map((item) => (
            <BasketItem
              key={item.id}
              item={item}
              product={products.find((p) => p.id === item.id)}
            />
          ))}
        </ul>
        <div className="total">Toplam: ${moneyFormat(roots.total)}</div>
        <button
          className="basket-reset-btn"
          onClick={() => dispatch(resetBasket())}
        >
          Sepeti Sıfırla
        </button>
      </div>
    </React.Fragment>
  );
}

export default Basket;
