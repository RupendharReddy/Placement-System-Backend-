const express = require('express');
const mysql = require('mysql2');

const app = express();
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
    res.send('Hello World');
});
app.listen(port, () => {
    console.clear();
    console.log(`Placement System server running on port ${port}`);
});