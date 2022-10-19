import { moneyFormat } from "../helpers";
import alertify from "alertifyjs";
import "../css/Product.css";

function Product({
  product,
  total,
  money,
  basket,
  setBasket,
  admin,
  setProducts,
  products,
}) {
  const basketItem = basket.find((item) => item.id === product.id);

  const changeAmount = (targetValue) => {
    const checkBasket = basket.find((item) => item.id === product.id);

    if (targetValue * product.id > money) {
      alert("Paranız yetmiyor.");
    } else {
      if (targetValue > 0) {
        if (checkBasket) {
          checkBasket.amount = +targetValue;
          setBasket([
            ...basket.filter((item) => item.id !== product.id),
            checkBasket,
          ]);
        } else {
          setBasket([
            ...basket,
            {
              id: product.id,
              amount: +targetValue,
            },
          ]);
        }
      } else return false;
    }
  };

  const addBasket = () => {
    const checkBasket = basket.find((item) => item.id === product.id);

    // ürün daha önce eklenmiş
    if (checkBasket) {
      checkBasket.amount += 1;
      setBasket([
        ...basket.filter((item) => item.id !== product.id),
        checkBasket,
      ]);
    } else {
      setBasket([
        ...basket,
        {
          id: product.id,
          amount: 1,
        },
      ]);
    }
    alertify.success("Sepete eklendi");
  };

  const removeBasket = () => {
    const currentBasket = basket.find((item) => item.id === product.id);
    const basketWithoutCurrent = basket.filter(
      (item) => item.id !== product.id
    );
    currentBasket.amount -= 1;
    if (currentBasket.amount === 0) {
      setBasket([...basketWithoutCurrent]);
    } else {
      setBasket([...basketWithoutCurrent, currentBasket]);
    }
    alertify.error("Sepetten çıkarıldı");
  };

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
            onClick={removeBasket}
          >
            Sell
          </button>
          <span className="amount">
            <input
              type="text"
              min="0"
              value={(basketItem && basketItem.amount) || 0}
              onChange={(e) => changeAmount(e.target.value)}
              disabled={admin}
            />
          </span>
          <button
            className="buy-btn"
            disabled={total + product.id > money || admin}
            onClick={addBasket}
          >
            Buy
          </button>
        </div>
      </div>
    </>
  );
}

export default Product;
