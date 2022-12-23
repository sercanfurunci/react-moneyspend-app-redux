import React, { useState } from "react";
import Header from "./components/header";
import Product from "./components/product";
import Basket from "./components/basket";
import AppModal from "./AppModal";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTotal } from "./store/actions/actions";
import { setProduct } from "./store/actions/actions";
import axios from "axios";
import ChangeLanguageButton from "./components/utils/changeLanguage";

export default function Home() {
  const roots = useSelector((state) => state.roots);
  const baskets = useSelector((state) => state.baskets);
  const products = useSelector((state) => state.products);

  const productList = products.productList;
  console.log(productList);
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
        item.amount *
          productList.find((product) => product.id === item.id).price
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
          <ChangeLanguageButton />
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
