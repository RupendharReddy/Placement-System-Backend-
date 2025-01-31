module.exports = (sequelize, DataTypes) => {
    const StudentPlacement = sequelize.define('StudentPlacement', {
      student_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Student_Details',
          key: 'id',
        },
      },
      placement_status: {
        type: DataTypes.ENUM('Placed', 'Not placed'),
        allowNull: false,
      },
      applied_companies: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      rejected_companies: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      placed_company: {
        type: DataTypes.STRING(255),
        allowNull: true,
      }
    }, {
      tableName: 'Student_Placement',
      timestamps: false,
    });
  
    StudentPlacement.associate = function(models) {
      StudentPlacement.belongsTo(models.StudentDetails, {
        foreignKey: 'student_id',
        onDelete: 'CASCADE',
      });
    };
  
    return StudentPlacement;
  };
  