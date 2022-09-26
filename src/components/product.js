function Product({product, money, total, basket, setBasket}) {
    const basketItem = basket.find(item => item.id === product.id)


    const addBasket = () => {
        const checkBasket = basket.find(item => item.id === product.id)
        if (checkBasket) {
            checkBasket.amount += 1
            setBasket([...basket.filter(item => item.id !== product.id), checkBasket])
        } else {
            setBasket([...basket, {
                name: product.title,
                id: product.id,
                amount: 1
            }])
        }

    }


    const removeBasket = () => {
        const currentBasket = basket.find(item => item.id === product.id)
        const basketWithoutCurrent = basket.filter(item => item.id !== product.id)

        currentBasket.amount -= 1
        if (currentBasket.amount === 0) {
            setBasket([...basketWithoutCurrent])
        } else {
            setBasket([...basketWithoutCurrent, currentBasket])
        }
    }


    return (


        <>
            <div className="product">
                <h3>{product.title}<img width="50" src={product.image} alt=""/></h3>
                <div className="price">
                    ${product.price}
                </div>
                <div className="actions">
                    <button className="removeItem" disabled={!basketItem} onClick={removeBasket}>-</button>
                    <span className="amount">{basketItem && basketItem.amount || 0}
                    </span>


                    <button className="addItem" disabled={total + product.price > money} onClick={addBasket}>+</button>
                </div>
                <style jsx="true">{`
                  .product {
                    padding: 10px;
                    background: #fff;
                    border: 1px solid #ddd;
                    margin-bottom: 20px;
                  }
                `}

                </style>
            </div>

        </>
    )
}

export default Product