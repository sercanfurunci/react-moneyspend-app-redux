import React from "react";
import Header from "./components/header";
import Product from "./components/product";
import Basket from "./components/basket";
import AppModal from "./AppModal";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTotal } from "./store/actions/actions";
import { createSelector } from "reselect";
import { setProduct } from "./store/actions/actions";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { i18n } = useTranslation();
  const handleLangChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  const roots = useSelector((state) => state.roots);
  const baskets = useSelector((state) => state.baskets);
  const products = useSelector((state) => state.products);

  const productList = products.productList;
  const basket = baskets.basket;
  const admin = roots.admin;
  const total = roots.total;

  const dispatch = useDispatch();
  const getData = async () => {
    const result = await axios("https://jsonplaceholder.typicode.com/photos");
    dispatch(setProduct(result.data));
  };

  useEffect(() => {
    getData();
  }, []);

  const totaliHesapla = () => {
    const toplam = basket.reduce((acc, item) => {
      return (
        acc +
        item.amount * productList.find((product) => product.id === item.id).id
      );
    }, 0);

    dispatch(setTotal(toplam));
  };

  useEffect(() => {
    totaliHesapla();
  }, [basket]);

  return (
    <React.Fragment>
      <Header />
      {!admin && (
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
      {admin && <AppModal />}
      <div className="container products">
        {productList.slice(4980).map((product) => (
          <Product key={product.id} product={product} products={productList} />
        ))}
      </div>
      {total > 0 && <Basket />}
    </React.Fragment>
  );
}
