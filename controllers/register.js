const { StudentDetails } = require('../models');  // Sequelize model
const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken } = require('./token');
const register = async (req, res) => {
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
        
        const user = {
            rollnumber:rollnumber,
            gmail:gmail,
        }
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
      
        res.cookie('accessToken', accessToken, {
          httpOnly: true,
          maxAge: 3600000, // 1 hour
        });
      
        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          maxAge: 2592000000, // 30 days
        });
      
        // Send success response
        res.status(201).json({ message: 'Data inserted successfully', id: newStudent.id });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = register