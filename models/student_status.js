module.exports = (sequelize, DataTypes) => {
    const StudentStatus = sequelize.define('StudentStatus', {
      student_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Student_Details',
          key: 'id',
        },
      },
      status: {
        type: DataTypes.ENUM('Approved', 'Not_Approved', 'Blocklist'),
        allowNull: false,
      }
    }, {
      tableName: 'Student_Status',
      timestamps: false,
    });
  
    StudentStatus.associate = function(models) {
      StudentStatus.belongsTo(models.StudentDetails, {
        foreignKey: 'student_id',
        onDelete: 'CASCADE',
      });
    };
  
    return StudentStatus;
  };
  