const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

/* MySQL Connection */

const db = mysql.createConnection({
host:"localhost",
user:"root",
password:"",
database:"coreinventory"
});

db.connect(err=>{
if(err){
console.log("Database Error");
}else{
console.log("MySQL Connected");
}
});


/* SAVE SETTINGS */

app.post("/saveSettings",(req,res)=>{

const {warehouse_name,email,password}=req.body;

const sql="INSERT INTO settings (warehouse_name,email,password) VALUES (?,?,?)";

db.query(sql,[warehouse_name,email,password],(err,result)=>{

if(err){
res.json(err);
}else{
res.json("Settings Saved");
}

});

});


app.listen(5000,()=>{

console.log("Server running on port 5000");

});