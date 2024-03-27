import { ShimmerTable } from "react-shimmer-effects";
import table from "../css/table.module.css"
function Ongoingpositions({ positions, loading }) {

    return loading ? <ShimmerTable row={3} col={8} /> : (
        <>
            <table className={table.table}>
                <thead>
                    <tr>
                        <th className={table.heading}>Symbol</th>
                        <th className={table.heading}>Quantity</th>
                        <th className={table.heading}>Buy Price</th>
                        <th className={table.heading}>Sell Price</th>
                        <th className={table.heading}>Order</th>
                        <th className={table.heading}>Position</th>
                        <th className={table.heading}>Current Price</th>
                        <th className={table.heading}>P&L</th>
                    </tr>
                </thead>
                <tbody>
                    {positions.map((pos, idx) => (
                        <tr key={idx}>
                            <td>{pos.tradingSymbol}</td>
                            <td>{pos.netQty}</td>
                            <td>{pos.productType}</td>
                            <td>{pos.positionType}</td>
                            <td>{pos?.netQty > 0 ? pos?.buyAvg?.toFixed(2) : "-"}</td>
                            <td>{pos?.netQty < 0 ? pos?.sellAvg?.toFixed(2) : "-"}</td>
                            <td>{pos?.costPrice?.toFixed(2)}</td>
                            <td className={+pos.realizedProfit < 0? table.negVal: table.poseVal} style={{ fontWeight: "1000" }}
                            >{pos.realizedProfit.toFixed(2)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </>


    )
}
export default Ongoingpositions;