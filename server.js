const express = require('express');
const bcrypt = require('bcrypt'); // Used for hashing passwords
const { sequelize, StudentDetails } = require('./models'); // Import Sequelize instance and models

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = 3000;

app.use('/register', require('./routes/Authentication'));
app.use('/', require('./routes/testingAPIs'));

// **Start the Server After Database Sync**
sequelize.sync()
    .then(() => {
        console.log("Database connected & models synchronized.");
        app.listen(port, () => {
            console.log(`Placement System server running on port ${port}`);
        });
    })
    .catch(err => {
        console.error("Failed to sync database:", err);
    });






// const express = require('express');
// // const bodyparser = require('body-parser');  // used for parsing JSON means req.body it will convert the JSON data into javascript object
// const bcrypt = require('bcrypt');   // used for hashing
// const db = require('./databaseConnection');
// const app = express();
// // app.use(bodyparser.json());
// // built-in middleware for json 
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// const port = 3000;

// app.use('/register',require('./routes/Authentication/register'));

// app.get('/', (req, res) => {
//     try {
//         db.query('select * from student_details',(err,result)=>{
//             if(err)return res.status(500).send("Error executing the query.");
//             else{
//                 console.log(result);
//                 res.json({
//                     message: `Data is:`,
//                     data: result,
//                 });
//             }
//         })
//     } catch (error) {
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });
// app.delete('/',(req,res)=>{
//     const id=req.body.id;
//     db.query(`delete from student_details where id=${id}`,(err,result)=>{
//         if(err)return res.status(500).send("Error executing the query.");
//         else{
//             console.log(result);
//             res.json({
//                 message: `Data is:`,
//                 data: result,
//             });
//         }
//     })
// })

// app.listen(port, () => {
//     // console.clear();
//     console.log(`Placement System server running on port ${port}`);
// });