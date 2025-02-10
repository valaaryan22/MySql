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
  },
  {
    tableName: "user",
    timestamps: false,
  }
);

export default User;
