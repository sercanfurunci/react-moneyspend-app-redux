import Header from "./components/header";
import Product from "./components/product";
import Basket from "./components/basket";
import axios from "axios";
import { useEffect } from "react";
import { useSite } from "./context/SiteContext";
import AppModal from "./AppModal";
import { useDispatch, useSelector } from "react-redux";
import { setTotal } from "./store/actions/actions";
import React from "react";

export default function Home() {
  const { setProducts, products } = useSite();

  const roots = useSelector((state) => state.roots);
  const dispatch = useDispatch();

  const getData = async () => {
    const result = await axios("https://jsonplaceholder.typicode.com/photos");
    setProducts(result.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const totaliHesapla = () => {
    const toplam = roots.basket.reduce((acc, item) => {
      return (
        acc +
        item.amount * products.find((product) => product.id === item.id).id
      );
    }, 0);

    dispatch(setTotal(toplam));
  };

  useEffect(() => {
    totaliHesapla();
  }, [roots.basket]);
  return (
    <React.Fragment>
      <Header />
      {roots.admin && <AppModal />}
      <div className="container products">
        {products.slice(4984, 5005).map((product, index) => (
          <Product
            key={index}
            product={product}
            products={products}
            setProducts={setProducts}
          />
        ))}
      </div>
      {roots.total > 0 && <Basket />}
    </React.Fragment>
  );
}
