module.exports = (sequelize, DataTypes) => {
    const StudentProofs = sequelize.define('StudentProofs', {
      student_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Student_Details',
          key: 'id',
        },
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        primaryKey: true,
      },
      link: {
        type: DataTypes.STRING(255),
        allowNull: false,
      }
    }, {
      tableName: 'Student_Proofs',
      timestamps: false,
    });
  
    StudentProofs.associate = function(models) {
      StudentProofs.belongsTo(models.StudentDetails, {
        foreignKey: 'student_id',
        onDelete: 'CASCADE',
      });
    };
  
    return StudentProofs;
  };
  