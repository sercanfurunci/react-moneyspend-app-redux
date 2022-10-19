import BasketItem from "./basketItem";
import { moneyFormat } from "../helpers";
import { useSite } from "../context/SiteContext";
import alertify from "alertifyjs";
import "../css/Basket.css";

function Basket() {
  const { basket, total, products, setBasket } = useSite();
  const resetBasket = () => {
    setBasket([]);
    alertify.success("Sepet Sıfırlandı");
  };
  return (
    <>
      <div className="basket-container container">
        <h3>Alışveriş Detayları</h3>
        <ul>
          {basket.map((item) => (
            <BasketItem //todo context
              key={item.id}
              item={item}
              product={products.find((p) => p.id === item.id)}
            />
          ))}
        </ul>
        <div className="total">Toplam: ${moneyFormat(total)}</div>
        <button className="basket-reset-btn" onClick={resetBasket}>
          Sepeti Sıfırla
        </button>
      </div>
    </>
  );
}

export default Basket;
