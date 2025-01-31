// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcrypt');
// const db = require('../../databaseConnection');

// router.route('/')

//     .post(async(req,res)=>{
//         try {
//             const { rollnumber, name, dob, gender, address, gmail, password, phone } = req.body;
//             if (!rollnumber || !name || !dob || !gender || !address || !gmail || !password || !phone) {
//                 return res.status(400).json({ error: 'All fields are required' });
//             }
//             // hashing the password takes time so async is used it takes 2arguments (plainText,saltRounds) 
//             const hashedPassword = await bcrypt.hash(password, 10);
//             const values=[rollnumber, name, dob, gender, address, gmail, hashedPassword, phone]
//             const query = `INSERT INTO student_details (rollnumber, name, dob, gender, address, gmail, password, phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
//             db.query(query,values,(err,result)=>{
//                 if(err)
//             {
//                 console.error('Database error:', err);
//                 return res.status(500).json({ error: 'Failed to insert data' });
//             }
//             else{
//                 console.log("Data inserted successfully");
//                 res.status(201).json({ message: 'Data inserted successfully', id: result.insertId});
//             }
//         })
//         } catch (error) {
//             res.status(500).json({ error: 'Internal server error' });
//         }
//     })
//     .get((req, res) => {
//         try {
//             const { gmail, password } = req.body;
//             if (!gmail || !password) {
//                 return res.status(400).json({ error: 'Email and password are required' });
//             }

//             console.log(gmail, password);
//             const query = `SELECT * FROM student_details WHERE gmail = ?`;

//             db.query(query, [gmail], (err, result) => {
//                 if (err) {
//                     console.error('Database error:', err);
//                     return res.status(500).send("Error executing the query.");
//                 }

//                 if (result.length === 0) {
//                     return res.status(401).json({ error: "Invalid credentials" });
//                 }

//                 const hashedPassword = result[0].password;
//                 const isMatch = bcrypt.compareSync(password, hashedPassword);

//                 if (isMatch) {
//                     console.log("Passwords match (Sync):", isMatch);
//                     return res.json({
//                         message: "Login successful",
//                         data: result[0],
//                     });
//                 } else {
//                     return res.status(401).json({ error: "Invalid credentials" });
//                 }
//             });

//         } catch (error) {
//             console.error('Server error:', error);
//             return res.status(500).json({ error: 'Internal server error' });
//         }
//     });

// module.exports=router

const express = require('express'); 
const router = express.Router();
const bcrypt = require('bcrypt');
const { StudentDetails } = require('../../models');  // Sequelize model

router.route('/')
    .post(async (req, res) => {
        try {
            const { rollnumber, name, dob, gender, address, gmail, password, phone } = req.body;
            if (!rollnumber || !name || !dob || !gender || !address || !gmail || !password || !phone) {
                return res.status(400).json({ error: 'All fields are required' });
            }

            // Hashing the password asynchronously
            const hashedPassword = await bcrypt.hash(password, 10);
            
            // Create new user using Sequelize
            const newStudent = await StudentDetails.create({
                rollnumber,
                name,
                dob,
                gender,
                address,
                gmail,
                password: hashedPassword,
                phone,
            });

            // Send success response
            res.status(201).json({ message: 'Data inserted successfully', id: newStudent.id });
        } catch (error) {
            console.error('Server error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    })
    .get(async (req, res) => {
        try {
            const { gmail, password } = req.body;
            if (!gmail || !password) {
                return res.status(400).json({ error: 'Email and password are required' });
            }

            // Find user by email using Sequelize
            const user = await StudentDetails.findOne({ where: { gmail } });

            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            // Check if passwords match
            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch) {
                res.json({
                    message: 'Login successful',
                    data: user,
                });
            } else {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
        } catch (error) {
            console.error('Server error:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    });

module.exports = router;
