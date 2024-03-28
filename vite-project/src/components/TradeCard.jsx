import tradecard from "../css/TradeCard.module.css"
const TradeCard = ({ tradeOpen, tradeClose,children }) => {
    const handleClose = () => {
      tradeClose();
    };
    return (
      <>
        {tradeOpen && (
          <div className={tradecard.container}>
            <div className={tradecard.innercontainer}>
              <span className={tradecard.close} onClick={handleClose}>&times;</span>
              {children}
            </div>
          </div>
        )}
      </>
    );
  };
  
  export default TradeCard;