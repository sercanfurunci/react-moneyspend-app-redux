import {useState, useEffect} from "react";
import Header from "./components/header";
import products from './products.json'
import Product from "./components/product";
import Basket from "./components/basket"
import alertify from 'alertifyjs';
import "./app.css"

function App() {

    const [money, setMoney] = useState("128000000000")
    const [basket, setBasket] = useState([])
    const [total, setTotal] = useState(0)

    const resetBasket = () => {
        setBasket([])
        alertify.success("Sepet sıfırlandı.")
    }

    useEffect(() => {

            setTotal(
                basket.reduce((acc, item) => {
                    return acc + (item.amount * (products.find(product => product.id === item.id).price))
                }, 0))

        }, [basket]
    )

    return (
        <>
            <Header className="header" total={total} money={money}/>
            <div className="container products">
                {products.map(p => (
                    <Product money={money} total={total} basket={basket} setBasket={setBasket} key={p.id} product={p}/>
                ))}
            </div>
            {total > 0 && (
                <>
                    <Basket resetBasket={resetBasket} basket={basket} total={total} product={products}/><br/>
                </>

            )}


        </>
    )
}

export default App