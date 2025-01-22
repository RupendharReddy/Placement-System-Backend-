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
    db.query('select * from student_details',(err,result)=>{
        if(err)console.log(err);
        if(result)console.log(result);
    })
    res.send('Hello World');
});
app.post('/student_detail',(req,res)=>{
    const roll=req.body.rollnumber;
    const name=req.body.name;
    const dob=req.body.dob;
    const gender=req.body.gender;
    const Address=req.body.address;
    const gmail=req.body.gmail;
    const password=req.body.password;
    const phone = req.body.phone;
    const query=`insert into student_details(rollnumber,name,dob,gender,address,gmail,password,phone) values('${roll}','${name}','${dob}','${gender}','${Address}','${gmail}','${password}','${phone}')`;
    db.query(query,(err)=>{
        if(err)console.log(err);
        else{
            res.send('Data Inserted');
            console.log("Data inserted successfully");
        }
    })
})

// Route to insert student details
app.post('/student_details', async (req, res) => {
    try {
        const { rollnumber, name, dob, gender, address, gmail, password, phone } = req.body;

        // Input validation
        if (!rollnumber || !name || !dob || !gender || !address || !gmail || !password || !phone) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // SQL query using parameterized statements to prevent SQL injection
        const query = `INSERT INTO student_details (rollnumber, name, dob, gender, address, gmail, password, phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [rollnumber, name, dob, gender, address, gmail, hashedPassword, phone];

        // Execute the query
        db.query(query, values, (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Failed to insert data' });
            }
            res.status(201).json({ message: 'Data inserted successfully', id: result.insertId });
        });
    } catch (err) {
        console.error('Server error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/show',(req,res)=>{
    const tablename=req.body.tablename;
    if (!tablename || typeof tablename !== 'string') {
        return res.status(400).send("Invalid or missing table name.");
    }
    const query=`select * from ${tablename}`;
    db.query(query,(err,result)=>{
        if(err)console.log(err);
        else{
            console.log(result);
            res.send(tablename+" Data is: "+result);
        }
    })
})

app.listen(port, () => {
    // console.clear();
    console.log(`Placement System server running on port ${port}`);
});