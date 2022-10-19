import { createContext, useContext, useState } from "react";

const Context = createContext();

const Provider = ({ children }) => {
  const [money, setMoney] = useState(100000);
  const [basket, setBasket] = useState([]);
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);
  const [admin, setAdmin] = useState(false);

  const data = {
    money,
    setMoney,
    basket,
    setBasket,
    total,
    setTotal,
    products,
    setProducts,
    admin,
    setAdmin,
  };

  return <Context.Provider value={data}>{children}</Context.Provider>;
};

export const useSite = () => useContext(Context);

export default Provider;
