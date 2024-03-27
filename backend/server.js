const express=require('express');
const cors=require('cors');
const server=express();
server.use(express.json());
server.use(cors({
    origin:'*',
}))


const dhanRoute=require('./routes/dataRoute');
server.use("/api",dhanRoute);


const port=8000;
server.get('/',(req,res)=>{
    res.send('running')
})
server.listen(port,()=>{
    console.log("Running Successfully");
})