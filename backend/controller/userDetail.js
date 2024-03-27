async function getOpenPosition(req, res) {
    try {
        const positions = await fetch("https://api.dhan.co/positions", {
            method: "GET",
            headers: {
                "access-token": req.headers["access-token"],
                "Content-Type": "application/json",
                Accept: "application/json"
            },
        })
        const positionsData = await positions.json();
        res.json({
            data: positionsData,
            message: "Successfull",
            success: true
        })
    } catch (err) {
        res.status(500).json({
            data: null,
            message: err.message,
            success: false
        })
    }
}
async function executeOrder(req,res){
    try{
        const orders=await fetch("https://api.dhan.co/orders",{
            method:"POST",
            headers:{
                "access-token": req.headers["access-token"],
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body:JSON.stringify(req.body),
        })
        const response=await orders.json();
        res.json({
            data:response,
            message:"Order Placed Successfully",
            success:true
        })
    }catch(err){
        res.status(500).json({
            data:null,
            message:err.message,
            success:false,
        })
    }
}
module.exports={getOpenPosition,executeOrder};