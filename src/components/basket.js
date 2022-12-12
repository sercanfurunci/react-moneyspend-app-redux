import React from "react";
import BasketItem from "./basketItem";
import { moneyFormat } from "../helpers/moneyHelper";
import { useSelector, useDispatch } from "react-redux";
import { resetBasket } from "../store/actions/actions";
import "../css/Basket.css";
import {useTranslation} from "react-i18next";

function Basket() {
  const { t } = useTranslation();

  const products = useSelector(state=>state.products)
  const dispatch = useDispatch();
  const roots = useSelector((state) => state.roots);
  const baskets = useSelector((state) => state.baskets);

  return (
    <React.Fragment>
      <div className="basket-container container">
        <h3>{t("shopping_details")}</h3>
        <ul>
          {baskets.basket?.map((item) => (
            <BasketItem
              key={item.id}
              item={item}
              product={products.productList.find((p) => p.id === item.id)}
            />
          ))}
        </ul>
        <div className="total">{t("total")} ${moneyFormat(roots.total)}</div>
        <button
          className="basket-reset-btn"
          onClick={() => dispatch(resetBasket())}
        >
          {t("reset_cart")}
        </button>
      </div>
    </React.Fragment>
  );
}

export default Basket;
