const { StudentDetails } = require('../models');  // Sequelize model
const bcrypt = require('bcrypt');


const showdata=async (req, res) => {
    try {
        const students = await StudentDetails.findAll(); // Sequelize method to get all student details
        res.json({
            message: 'Data retrieved successfully',
            data: students,
        });
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const deletedata=async (req, res) => {
    const { id } = req.body;

    try {
        const deletedRows = await StudentDetails.destroy({
            where: { id },
        });

        if (deletedRows === 0) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.json({
            message: `Student with ID ${id} deleted successfully`,
        });
    } catch (error) {
        console.error("Error deleting student:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports={
    showdata,
    deletedata
}