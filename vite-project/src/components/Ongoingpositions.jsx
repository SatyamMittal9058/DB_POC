import { ShimmerTable } from "react-shimmer-effects";
import table from "../css/table.module.css"
import { useState } from "react";
import TradeCard from "./TradeCard";
import { useCookies } from "react-cookie";
import { handleOrder } from "../orderExecution";
function Ongoingpositions({ positions, loading }) {
    const [cookies]=useCookies();
    const [cardOpen, setCardOpen] = useState(false);
    const [stockVal, setStockVal] = useState(null);
    const [positionDetail, setPositionDetail] = useState(null);
    const OpenCard = () => setCardOpen(true);
    const CloseCard = () => setCardOpen(false);
    const handleTrade = (pos) => {
        if (pos.netQty == 0) return
        else if (pos.netQty > 0) {
            setStockVal({
                positionType: "SELL",
                qtyValue: pos?.netQty,
                priceValue: pos.costPrice.toFixed(2)
            })
            setPositionDetail(pos);
        } else {
            setStockVal({
                positionType: "BUY",
                qtyValue: Math.abs(pos?.netQty),
                priceValue: pos.costPrice.toFixed(2)
            })
            setPositionDetail(pos)
        }
        OpenCard();
    };
    return loading ? <ShimmerTable row={3} col={8} /> : (
        <>
            <table className={table.table}>
                <thead>
                    <tr >
                        <th>Symbol</th>
                        <th>Quantity</th>
                        <th>Buy Price</th>
                        <th>Sell Price</th>
                        <th>Order</th>
                        <th>Position</th>
                        <th>Current Price</th>
                        <th>P&L</th>
                    </tr>
                </thead>
                <tbody>
                    {positions.map((pos, idx) => (
                        <tr key={idx} className={pos.positionType == "CLOSED" ? table.positionCLOSED : table.positionOPENED}
                            onClick={() => handleTrade(pos)}>
                            <td>{pos.tradingSymbol}</td>
                            <td>{pos.netQty}</td>
                            <td>{pos?.netQty > 0 ? pos?.buyAvg?.toFixed(2) : "-"}</td>
                            <td>{pos?.netQty < 0 ? pos?.sellAvg?.toFixed(2) : "-"}</td>
                            <td>{pos.productType}</td>
                            <td>{pos.positionType}</td>
                            <td>{pos.costPrice.toFixed(2)}</td>
                            <td className={+pos.realizedProfit < 0 ? table.negVal : table.poseVal} style={{ fontWeight: "1000" }}
                            >{pos.realizedProfit.toFixed(2)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <TradeCard tradeOpen={cardOpen} tradeClose={CloseCard}>
                <div className={table.card}>
                    <span>
                        <label>Quantity</label>
                        <input
                            type="number"
                            min={0}
                            max={positionDetail?.netQty}
                            value={stockVal?.qtyValue}
                            onChange={(e) => {
                                setStockVal({ ...stockVal, qtyValue: e.target.value })
                            }}
                            className={table.inputField}
                        />
                        <label>Price</label>
                        <input
                            type="number"
                            min={0}
                            value={stockVal?.priceValue}
                            onChange={(e) => {
                                setStockVal({ ...stockVal, priceValue: e.target.value })
                            }}
                            className={table.inputField}
                        />
                    </span>
                    <button className={stockVal?.positionType === 'SELL' ? (table.sellBtn) : (table.buyBtn)} onClick={() => {
                        handleOrder(stockVal.positionType, {
                            tradingSymbol: positionDetail?.tradingSymbol,
                            securityId: positionDetail?.securityId,
                            quantity: stockVal?.qtyValue,
                            price: stockVal.priceValue,
                        }, cookies)
                        CloseCard();
                    }}>{stockVal?.positionType}</button>
                </div>
            </TradeCard>
        </>


    )
}
export default Ongoingpositions;