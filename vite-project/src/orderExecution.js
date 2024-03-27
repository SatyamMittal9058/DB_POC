import { toast } from "react-toastify";
export const handleOrder = async (orderType, stockDetail, cookies) => {
    if (!stockDetail?.tradingSymbol || !stockDetail.securityId || !stockDetail.price) {
        if (!stockDetail?.tradingSymbol) toast.error("Please Enter Stock Symbol");
        if (!stockDetail.securityId) toast.error("Please Enter Security Id");
        if (!stockDetail.price) toast.error("Please Enter Price");
        return
    }
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/order`;
    const TradeDetail = {
        "dhanClientId": "1000475514",
        "correlationId": "NA",
        "transactionType": orderType,
        "exchangeSegment": "NSE_EQ",
        "productType": "INTRADAY",
        "orderType": "LIMIT",
        "validity": "DAY",
        "tradingSymbol": stockDetail.tradingSymbol,
        "securityId": stockDetail.securityId,
        "quantity": 1,
        "disclosedQuantity": 0,
        "price": -stockDetail.price,
    }
    const options={
        method:"POST",
        headers:{
            "access-token":cookies.token,
            "Content-Type": "application/json",
            Accept:"application/json",
        },
        body:JSON.stringify(TradeDetail)
    }
    try{
        const response=await fetch(url,options);
        const data=response.json();
        if(data.success) toast.success(data.message);
        else toast.error(data.message);
    }catch(err){
        toast.error(err.message);
    }
}