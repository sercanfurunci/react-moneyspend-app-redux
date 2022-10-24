import Header from "./components/header";
import Product from "./components/product";
import Basket from "./components/basket";
import axios from "axios";
import { useEffect } from "react";
import { useSite } from "./context/SiteContext";
import AppModal from "./AppModal";
import { useDispatch, useSelector } from "react-redux";
import { setTotal } from "./stores/total";

export default function Home() {
  const { setProducts, products } = useSite();

  const admin = useSelector((state) => state.admin.admin);
  const total = useSelector((state) => state.total.total);
  const basket = useSelector((state) => state.basket.basket);
  const dispatch = useDispatch();

  const getData = async () => {
    const result = await axios("https://jsonplaceholder.typicode.com/photos");
    setProducts(result.data);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    dispatch(
      setTotal(
        basket.reduce((acc, item) => {
          return (
            acc +
            item.amount * products.find((product) => product.id === item.id).id
          );
        }, 0)
      )
    );
  }, [basket]);

  return (
    <>
      <Header />
      {admin && (
        <>
          <AppModal />
        </>
      )}

      <div className="container products">
        {products.slice(4984, 5005).map((product, index) => (
          <Product //todo context
            key={index}
            product={product}
            products={products}
            setProducts={setProducts}
          />
        ))}
      </div>

      {total > 0  && <Basket />}
    </>
  );
}
