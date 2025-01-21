const express = require('express');
const mysql = require('mysql2');
const bodyparser = require('body-parser');

const app = express();
app.use(bodyparser.json());
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'root',
    database: 'placementSystem'
})
db.connect((err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log('Connected to database');
    }
})
const port = 3000;

app.get('/', (req, res) => {
    db.query('select * from student_details',(err,result)=>{
        if(err)console.log(err);
        if(result)console.log(result);
    })
    res.send('Hello World');
});
app.post('/student_details',(req,res)=>{
    const roll=req.body.rollnumber;
    const name=req.body.name;
    const dob=req.body.dob;
    const gender=req.body.gender;
    const Address=req.body.address;
    const gmail=req.body.gmail;
    const password=req.body.password;
    const phone = req.body.phone;
    const query=`insert into student_details(rollnumber,name,dob,gender,address,gmail,password,phone) values('${roll}','${name}','${dob}','${gender}','${Address}','${gmail}','${password}','${phone}')`;
    db.query(query,(err,result)=>{
        if(err)console.log(err);
        else console.log("Data inserted successfully");
    })
})
app.get('/show',(req,res)=>{
    const tablename=req.body.tablename;
    if (!tablename || typeof tablename !== 'string') {
        return res.status(400).send("Invalid or missing table name.");
    }
    const query=`select * from ${tablename}`;
    db.query(query,(err,result)=>{
        if(err)console.log(err);
        else res.send(tablename+" Data is: "+result);
    })
})

app.listen(port, () => {
    // console.clear();
    console.log(`Placement System server running on port ${port}`);
});