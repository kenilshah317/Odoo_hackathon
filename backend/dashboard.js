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

db.connect((err)=>{

if(err){
console.log("Database connection failed");
}else{
console.log("MySQL Connected");
}

});


/* API: Get Dashboard Stats */

app.get("/dashboard",(req,res)=>{

let dashboardData = {};

db.query("SELECT COUNT(*) AS totalProducts FROM products",(err,result)=>{

dashboardData.totalProducts = result[0].totalProducts;

db.query("SELECT COUNT(*) AS lowStock FROM products WHERE stock < 20",(err,result)=>{

dashboardData.lowStock = result[0].lowStock;

db.query("SELECT COUNT(*) AS pendingReceipts FROM receipts",(err,result)=>{

dashboardData.pendingReceipts = result[0].pendingReceipts;

db.query("SELECT COUNT(*) AS pendingDeliveries FROM deliveries",(err,result)=>{

dashboardData.pendingDeliveries = result[0].pendingDeliveries;

res.json(dashboardData);

});

});

});

});

});


/* API: Get Products */

app.get("/products",(req,res)=>{

db.query("SELECT * FROM products",(err,result)=>{

if(err){
res.json(err);
}else{
res.json(result);
}

});

});


/* API: Add Product */

app.post("/addProduct",(req,res)=>{

const {name,sku,stock} = req.body;

const sql = "INSERT INTO products (name,sku,stock) VALUES (?,?,?)";

db.query(sql,[name,sku,stock],(err,result)=>{

if(err){
res.json(err);
}else{
res.json("Product Added");
}

});

});


/* Start Server */

app.listen(5000,()=>{

console.log("Server running on port 5000");

});