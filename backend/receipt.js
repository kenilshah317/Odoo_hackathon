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


/* GET RECEIPTS */

app.get("/receipts",(req,res)=>{

const sql="SELECT * FROM receipts";

db.query(sql,(err,result)=>{

if(err) return res.json(err);

res.json(result);

});

});


/* ADD RECEIPT */

app.post("/addReceipt",(req,res)=>{

const {supplier,product,quantity,date}=req.body;

const sql="INSERT INTO receipts (supplier,product,quantity,date) VALUES (?,?,?,?)";

db.query(sql,[supplier,product,quantity,date],(err,result)=>{

if(err) return res.json(err);

res.json("Receipt Added");

});

});


/* START SERVER */

app.listen(5000,()=>{

console.log("Server running on port 5000");

});