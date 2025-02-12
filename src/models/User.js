import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true, // Ensures valid email format
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password_history: {
      type: DataTypes.JSON, // Ensure it's stored as JSON in MySQL
      allowNull: false,
      defaultValue: [], // Default empty array to avoid NULL values
      get() {
        const history = this.getDataValue("password_history");
        return history ? JSON.parse(history) : [];
      },
      set(value) {
        this.setDataValue("password_history", JSON.stringify(value));
      },
    }, isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    
    registration_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // Automatically sets current timestamp on user creation
    },
   
  },
  {
    tableName: "user",
    timestamps: false,
  }
);

User.sync({ alter: true });

export default User;
