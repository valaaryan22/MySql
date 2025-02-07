import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";


const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // REMOVE passwordHistory if it's causing errors
}, {
  tableName: 'user', 
  timestamps: false
});

export default User;
