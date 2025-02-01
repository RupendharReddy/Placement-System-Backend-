const { StudentDetails } = require('../models');  // Sequelize model
const bcrypt = require('bcrypt');

const register = async (req, res) => {
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
}

module.exports = register