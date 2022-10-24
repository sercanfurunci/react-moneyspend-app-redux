import { moneyFormat } from "../helpers";
import "../css/Product.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteBasket, addBasket,changeAmount } from "../stores/basket";

function Product({ product, setProducts, products }) {
  const money = useSelector((state) => state.money.money);
  const admin = useSelector((state) => state.admin.admin);
  const total = useSelector((state) => state.total.total);
  const basket = useSelector((state) => state.basket.basket);
  const basketItem = basket.find((item) => item.id === product.id);

  const dispatch = useDispatch();


const handleChange =(product,targetValue)=>{
  const id1 = product.id
  dispatch(changeAmount({id1,targetValue,money}))

}
  const removeProducts = () => {
    setProducts(
      products.filter((item) => {
        return item.id !== product.id;
      })
    );
  };

  return (
    <>
      <div className="product">
        {admin && (
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
            disabled={!basketItem || basketItem.amount === 0}
            onClick={() => dispatch(deleteBasket(product.id))}
          >
            Sell
          </button>
          <span className="amount">
            <input
              type="text"
              min="0"
              value={(basketItem && basketItem.amount) || 0}
              onChange={(e) => handleChange(product,e.target.value)}//todo
              disabled={admin}
            />
          </span>
          <button
            className="buy-btn "
            disabled={total + product.id > money || admin}
            onClick={() => dispatch(addBasket(product.id))}
          >
            Buy
          </button>
        </div>
      </div>
    </>
  );
}

export default Product;
