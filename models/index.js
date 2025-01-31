const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('placementSystem', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});

const StudentDetails = require('./student_details')(sequelize, DataTypes);
const StudentSchool = require('./student_school')(sequelize, DataTypes);
const StudentAcademics = require('./student_academics')(sequelize, DataTypes);
const StudentProofs = require('./student_proofs')(sequelize, DataTypes);
const StudentStatus = require('./student_status')(sequelize, DataTypes);
const StudentPlacement = require('./student_placement')(sequelize, DataTypes);

// Define Associations
StudentProofs.belongsTo(StudentDetails, { foreignKey: 'student_id', onDelete: 'CASCADE' });
StudentStatus.belongsTo(StudentDetails, { foreignKey: 'student_id', onDelete: 'CASCADE' });
StudentPlacement.belongsTo(StudentDetails, { foreignKey: 'student_id', onDelete: 'CASCADE' });
StudentSchool.belongsTo(StudentDetails, { foreignKey: 'student_id', onDelete: 'CASCADE' });
StudentAcademics.belongsTo(StudentDetails, { foreignKey: 'student_id', onDelete: 'CASCADE' });

// StudentDetails associations
StudentDetails.hasMany(StudentProofs, { foreignKey: 'student_id' });
StudentDetails.hasOne(StudentStatus, { foreignKey: 'student_id' });
StudentDetails.hasOne(StudentPlacement, { foreignKey: 'student_id' });
StudentDetails.hasOne(StudentSchool, { foreignKey: 'student_id' });  // Assuming one school per student
StudentDetails.hasMany(StudentAcademics, { foreignKey: 'student_id' });  // Assuming multiple academic records per student

// Export models and Sequelize instance
module.exports = {
  sequelize,
  StudentDetails,
  StudentSchool,
  StudentAcademics,
  StudentProofs,
  StudentStatus,
  StudentPlacement,
};
