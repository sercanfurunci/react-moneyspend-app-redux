import { moneyFormat } from "../helpers";
import "../css/Product.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteBasket, addBasket,changeAmount } from "../store/actions/actions"
import React from "react";

function Product({ product, setProducts, products }) {
  const roots = useSelector((state) => state.roots);

  const basketItem = roots?.basket?.find((item) => item.id === product.id);

  const dispatch = useDispatch();


const handleChange =(product,targetValue)=>{
  const id1 = product.id
  const money = roots.money
  const total = roots.total
  dispatch(changeAmount({id1,targetValue,money,total}))

}


  const removeProducts = () => {
    setProducts(
      products.filter((item) => {
        return item.id !== product.id;
      })
    );
  };

  return (
    <React.Fragment>
      <div className="product">
        {roots.admin && (
          <button
            style={{
              backgroundColor: "red",
              width: "10px",
              float: "right",
              cursor: "pointer",
            }}
            onClick={removeProducts}
          >
            X
          </button>
        )}

        <img src={product?.url} alt="photo" />
        <div className="itemName">{product?.title.slice(0, 12)}</div>
        <div className="price">$ {moneyFormat(product?.id)}</div>

        <div className="actions">
          <button
            className="sell-btn"
            /*disabled={!basketItem || basketItem.amount === 0}*/
            onClick={() => dispatch(deleteBasket(product.id))}
          >
            Sell
          </button>
          <span className="amount">
            <input
              type="text"
              min="0"
              value={(basketItem && basketItem.amount) || 0}
              onChange={(e) => handleChange(product,e.target.value)}
              disabled={roots.admin}
            />
          </span>
          <button
            className="buy-btn "
            disabled={roots.total + product.id > roots.money || roots.admin}
            onClick={() => dispatch(addBasket(product.id))}
          >
            Buy
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Product;
