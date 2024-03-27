import { useState } from "react";
import { useCookies } from "react-cookie";
import card from "../css/Card.module.css";
import { handleOrder } from "../orderExecution";
function BuySellCard() {
    const [stockDetail, setStockDetail] = useState({
        tradingSymbol: "",
        securityId:"",
        price: "",
    });
    const handleInput = (e) => {
        setStockDetail({ ...stockDetail, [e.target.name]: e.target.value });
    }
    const [cookies] = useCookies('token');
    return (
        <div className={card.container}>
            <h2>Buy/Sell Card</h2>
            <input className={card.symbol} type="text" placeholder="Enter Trading Symbol" name="tradingSymbol" value={stockDetail?.tradingSymbol} onChange={(e) => { handleInput(e) }} />
            <input className={card.securityId} type="text" placeholder="Enter Security_Id" name="securityId" value={stockDetail?.securityId} onChange={(e) => { handleInput(e) }} />
            <input className={card.price} type="number" placeholder="Enter Price" name="price" value={stockDetail?.price} onChange={(e) => { handleInput(e) }} />
            <div className={card.btncontainer}>
                <button className={card.buybtn} onClick={() => {
                    handleOrder("BUY",stockDetail,cookies);
                    setStockDetail({ tradingSymbol: "", price: "" });
                }}>Buy</button>
                <button className={card.sellbtn} onClick={() => {
                    handleOrder("Sell",stockDetail,cookies);
                    setStockDetail({ tradingSymbol: "", price: "" })
                }}>Sell</button>
            </div>
        </div>
    )
}
export default BuySellCard;