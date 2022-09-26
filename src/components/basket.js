import BasketItem from "./basketItem";

function Basket({basket, resetBasket, product, total}) {
    return (
        <div className="basket-container">
            {basket.map((item, id) => (
                <li key={id}>
                    <BasketItem total={total} product={product.find(p => p.id === item.id)} item={item}></BasketItem>
                </li>


            ))}
            <br/>
            <div className="total">
                Total: ${total}
            </div>
            <button className="reset" onClick={resetBasket}>Sepeti Sıfırla</button>
        </div>
    )
}

export default Basket