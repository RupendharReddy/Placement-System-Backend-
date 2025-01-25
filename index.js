const express = require('express');
const mysql = require('mysql2');
// const bodyparser = require('body-parser');  // used for parsing JSON means req.body it will convert the JSON data into javascript object
const bcrypt = require('bcrypt');   // used for hashing

const app = express();
// app.use(bodyparser.json());
app.use(express.json());
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
    try {
        db.query('select * from student_details',(err,result)=>{
            if(err)return res.status(500).send("Error executing the query.");
            else{
                console.log(result);
                res.json({
                    message: `Data is:`,
                    data: result,
                });
            }
        })
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.post('/register',async(req,res)=>{
    try {
        const { rollnumber, name, dob, gender, address, gmail, password, phone } = req.body;
        if (!rollnumber || !name || !dob || !gender || !address || !gmail || !password || !phone) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        // hashing the password takes time so async is used it takes 2arguments (plainText,saltRounds) 
        const hashedPassword = await bcrypt.hash(password, 10);
        const values=[rollnumber, name, dob, gender, address, gmail, hashedPassword, phone]
        const query = `INSERT INTO student_details (rollnumber, name, dob, gender, address, gmail, password, phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        db.query(query,values,(err,result)=>{
            if(err)
            {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Failed to insert data' });
            }
            else{
                console.log("Data inserted successfully");
                res.status(201).json({ message: 'Data inserted successfully', id: result.insertId});
            }
        })
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
})
app.get('/show',(req,res)=>{
    try {
        const tablename=req.body.tablename;
    if (!tablename || typeof tablename !== 'string') {
        return res.status(400).send("Invalid or missing table name.");
    }
    const query=`select * from ${tablename}`;
    db.query(query,(err,result)=>{
        if(err)return res.status(500).send("Error executing the query.");
        else{
            console.log(result);
            res.json({
                message: `${tablename} Data is:`,
                data: result,
            });
        }
    })
    } catch (error) {
        console.error('Server error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.listen(port, () => {
    // console.clear();
    console.log(`Placement System server running on port ${port}`);
});