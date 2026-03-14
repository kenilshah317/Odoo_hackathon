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


/* GET DELIVERIES */

app.get("/deliveries",(req,res)=>{

const sql="SELECT * FROM deliveries";

db.query(sql,(err,result)=>{

if(err){
res.json(err);
}else{
res.json(result);
}

});

});


/* ADD DELIVERY */

app.post("/addDelivery",(req,res)=>{

const {customer,product,quantity,date}=req.body;

const sql="INSERT INTO deliveries (customer,product,quantity,date) VALUES (?,?,?,?)";

db.query(sql,[customer,product,quantity,date],(err,result)=>{

if(err){
res.json(err);
}else{
res.json("Delivery Added");
}

});

});


/* START SERVER */

app.listen(5000,()=>{

console.log("Server running on port 5000");

});