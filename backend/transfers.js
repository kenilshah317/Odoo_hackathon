const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

/* MySQL Connection */

const db = mysql.createConnection({
host: "localhost",
user: "root",
password: "",
database: "coreinventory"
});

db.connect(err => {

if(err){
console.log("Database connection failed");
}else{
console.log("MySQL Connected");
}

});


/* GET TRANSFERS */

app.get("/transfers",(req,res)=>{

const sql="SELECT * FROM transfers";

db.query(sql,(err,result)=>{

if(err){
res.json(err);
}else{
res.json(result);
}

});

});


/* ADD TRANSFER */

app.post("/addTransfer",(req,res)=>{

const {product,fromWarehouse,toWarehouse,quantity}=req.body;

const sql="INSERT INTO transfers (product,fromWarehouse,toWarehouse,quantity) VALUES (?,?,?,?)";

db.query(sql,[product,fromWarehouse,toWarehouse,quantity],(err,result)=>{

if(err){
res.json(err);
}else{
res.json("Transfer Added");
}

});

});


/* START SERVER */

app.listen(5000,()=>{

console.log("Server running on port 5000");

});