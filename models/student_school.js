// models/student_school.js
module.exports = (sequelize, DataTypes) => {
    const StudentSchool = sequelize.define('StudentSchool', {
      student_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'Student_Details', 
          key: 'id'
        }
      },
      ssc_school: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      ssc_year_of_passing: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      hsc_or_diploma_school: {
        type: DataTypes.STRING(255),
      },
      hsc_or_diploma_year_of_passing: {
        type: DataTypes.INTEGER,
      },
      college_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      college_year_of_passing: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, {
      tableName: 'Student_School',
      timestamps: false,
    });
  
    return StudentSchool;
  };
  