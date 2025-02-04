const { StudentDetails } = require('../models');  // Sequelize model
const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken } = require('./token');

const register = async (req, res) => {
    try {
        const { gmail, password } = req.body;
        if (!gmail || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Find user by email using Sequelize
        const user = await StudentDetails.findOne({ where: { gmail } });

        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ error: 'Invalid credentials' });
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
      
        res.json({ message: 'Logged in successfully' });
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = register