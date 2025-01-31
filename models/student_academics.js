// models/student_academics.js
module.exports = (sequelize, DataTypes) => {
    const StudentAcademics = sequelize.define('StudentAcademics', {
      student_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'Student_Details',
          key: 'id',
        },
      },
      branch: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      ssc: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
      },
      hsc: {
        type: DataTypes.DECIMAL(5, 2),
      },
      diploma: {
        type: DataTypes.DECIMAL(5, 2),
      },
      sem1: {
        type: DataTypes.DECIMAL(5, 2),
      },
      sem2: {
        type: DataTypes.DECIMAL(5, 2),
      },
      sem3: {
        type: DataTypes.DECIMAL(5, 2),
      },
      sem4: {
        type: DataTypes.DECIMAL(5, 2),
      },
      sem5: {
        type: DataTypes.DECIMAL(5, 2),
      },
      sem6: {
        type: DataTypes.DECIMAL(5, 2),
      },
      sem7: {
        type: DataTypes.DECIMAL(5, 2),
      },
      sem8: {
        type: DataTypes.DECIMAL(5, 2),
      },
      cgpa: {
        type: DataTypes.DECIMAL(5, 2),
      },
    }, {
      tableName: 'Student_Academics',
      timestamps: false,
    });
  
    return StudentAcademics;
  };
  