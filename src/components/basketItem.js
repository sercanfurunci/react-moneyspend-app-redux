import React from "react";
import "../css/BasketItem.css";

function BasketItem({ item, product }) {
  return (
    <React.Fragment>
      <li className="basket-item">
        {product.title} <span>x {item.amount}</span>
      </li>
    </React.Fragment>
  );
}

export default BasketItem;