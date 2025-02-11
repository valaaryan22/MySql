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
      unique: true,
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
        // Ensure it always returns an array
        const history = this.getDataValue("password_history");
        return history ? JSON.parse(history) : [];
      },
      set(value) {
        // Ensure it stores data as JSON
        this.setDataValue("password_history", JSON.stringify(value));
      },
    },
    registration_time: {
      type: DataTypes.DATE, // or DataTypes.DATEONLY if you only need the date part
      allowNull: false,
      defaultValue: DataTypes.NOW,  // Automatically sets current timestamp on user creation
    },
  },
  {
    tableName: "user",
    timestamps: false,
  }
);

// Sync with the database
User.sync({ alter: true }); // Adjust this based on your project setup

export default User;
