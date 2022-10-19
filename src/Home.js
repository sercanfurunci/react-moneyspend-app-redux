import Header from "./components/header";
import Product from "./components/product";
import Basket from "./components/basket";
import axios from "axios";
import { useEffect } from "react";
import { useSite } from "./context/SiteContext";
import AppModal from "./AppModal";

export default function Home() {
  const {
    setProducts,
    setBasket,
    setTotal,
    basket,
    products,
    total,
    money,
    admin,
      basketItem
  } = useSite();

  const getData = async () => {
    const result = await axios("https://jsonplaceholder.typicode.com/photos");
    setProducts(result.data);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setTotal(
      basket.reduce((acc, item) => {
        return (
          acc +
          item.amount * products.find((product) => product.id === item.id).id
        );
      }, 0)
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
        {products.slice(4984, 5005).map((product,index) => (
          <Product //todo context
            key={index}
            total={total}
            money={money}
            basket={basket}
            setBasket={setBasket}
            product={product}
            admin={admin}
            products={products}
            setProducts={setProducts}
          />
        ))}
      </div>

      {total > 0  && !admin && <Basket />}
    </>
  );
}
