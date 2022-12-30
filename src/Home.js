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
import { Pagination } from "antd";

export default function Home() {
  const roots = useSelector((state) => state.roots);
  const baskets = useSelector((state) => state.baskets);
  const products = useSelector((state) => state.products);
  const productList = products.productList;

  console.log(productList.length);

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(20);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = productList.slice(indexOfFirstPost, indexOfLastPost);

  const changePage = (e) => {
    setCurrentPage(e);
  };

  const basket = baskets.basket;
  const admin = roots.admin;
  const total = roots.total;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setProduct());
  }, [dispatch]);

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
        {currentPosts.map((product) => (
          <Product key={product.id} product={product} products={productList} />
        ))}
      </div>
      {total > 0 && <Basket />}
      <Pagination
        style={{ textAlign: "center", padding: "10px" }}
        defaultCurrent={1}
        pageSize={postPerPage}
        showSizeChanger={false}
        total={productList.length}
        onChange={changePage}
      />
    </React.Fragment>
  );
}
