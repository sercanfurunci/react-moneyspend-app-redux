import React, { useState } from "react";
import Header from "./components/header";
import Product from "./components/product";
import Basket from "./components/basket";
import AppModal from "./AppModal";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTotal } from "./store/actions/actions";
import { createSelector } from "reselect";
import {setProduct} from "./store/actions/actions";
import axios from "axios";

export default function Home() {
  const roots = useSelector((state) => state.roots);
  const baskets = useSelector((state) => state.baskets);
  const products = useSelector((state) => state.products);

  const dispatch = useDispatch();
  console.log(products)
  const getData = async () => {
    const result = await axios("https://jsonplaceholder.typicode.com/photos");
    dispatch(setProduct(result.data));
  };

  useEffect(() => {
    getData();
  }, []);

  const totaliHesapla = () => {
    const toplam = baskets.basket?.reduce((acc, item) => {
      return (
        acc +
        item.amount * products.productList.find((product) => product.id === item.id).id
      );
    }, 0);

    dispatch(setTotal(toplam));
  };
console.log(products)
  useEffect(() => {
    totaliHesapla();
  }, [baskets.basket]);
  return (
    <React.Fragment>
      <Header />

      {roots.admin && <AppModal />}
      <div className="container products">
        {

            products.productList.slice(4980).map((product) => (
          <Product
            key={product.id}
            product={product}
            products={products.productList}
          />
        ))}
      </div>
      {roots.total > 0 && <Basket />}
    </React.Fragment>
  );
}
