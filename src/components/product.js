import React from "react";
import { moneyFormat } from "../helpers/moneyHelper";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBasket,
  addBasket,
  changeAmount,
} from "../store/actions/actions";
import "../css/Product.css";
import { setProduct } from "../store/actions/actions";
import { Popconfirm } from "antd";
import { DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import EditModal from "../EditModal";

function Product({ product, products }) {
  const { t } = useTranslation();

  const roots = useSelector((state) => state.roots);
  const baskets = useSelector((state) => state.baskets);
  const basketItem = baskets?.basket?.find((item) => item.id === product.id);

  const dispatch = useDispatch();

  const handleChange = (product, targetValue) => {
    const id = product.id;
    const money = roots.money;
    const total = roots.total;
    if (targetValue !== "-" && targetValue !== "" && targetValue >= 0) {
      dispatch(changeAmount({ id, targetValue, money, total }));
    } else {
      //kontrol yapılacak
      alert("Giremezsin");
      return false;
    }
  };

  const removeProducts = () => {
    dispatch(
      setProduct(
        products.filter((item) => {
          return item.id !== product.id;
        })
      )
    );
  };

  return (
    <React.Fragment>
      <div className="product">
        {roots.admin && (
          <>
            <Popconfirm
              title={t("delete")}
              okText={t("yes")}
              cancelText={t("no")}
              onConfirm={removeProducts}
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            >
              <DeleteOutlined style={{ color: "red", fontSize: "20px" }} />
            </Popconfirm>
            <EditModal oldPhoto={product} />
          </>
        )}

        <img src={product.url} alt="photo" />
        <div className="itemName">{product.title.slice(0, 12)}</div>
        <div className="price">$ {moneyFormat(product?.price)}</div>

        <div className="actions">
          <button
            className="sell-btn"
            disabled={!basketItem || basketItem.amount === 0}
            onClick={() => dispatch(deleteBasket(product.id))}
          >
            {t("sell")}
          </button>
          <span className="amount">
            <input
              type="text"
              min="0"
              value={(basketItem && basketItem.amount) || 0}
              onChange={(e) => handleChange(product, e.target.value)}
              disabled={roots.admin}
            />
          </span>
          <button
            className="buy-btn "
            disabled={roots.total + product.price > roots.money || roots.admin}
            onClick={() => dispatch(addBasket(product.id))}
          >
            {t("buy")}
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Product;
