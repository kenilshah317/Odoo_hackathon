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
console.log("MySQL connection failed");
}else{
console.log("MySQL Connected");
}

});


/* GET ALL PRODUCTS */

app.get("/products",(req,res)=>{

const sql="SELECT * FROM products";

db.query(sql,(err,result)=>{

if(err) return res.json(err);

res.json(result);

});

});


/* ADD STOCK */

app.post("/addStock",(req,res)=>{

const {id}=req.body;

const sql="UPDATE products SET stock = stock + 10 WHERE id=?";

db.query(sql,[id],(err,result)=>{

if(err) return res.json(err);

res.json("Stock Added");

});

});


/* REMOVE STOCK */

app.post("/removeStock",(req,res)=>{

const {id}=req.body;

const sql="UPDATE products SET stock = stock - 10 WHERE id=?";

db.query(sql,[id],(err,result)=>{

if(err) return res.json(err);

res.json("Stock Removed");

});

});


/* START SERVER */

app.listen(5000,()=>{

console.log("Server running on port 5000");

});