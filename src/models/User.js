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
        try {
          // Safely parse the password_history
          return history ? JSON.parse(history) : [];
        } catch (error) {
          console.error('Error parsing password history:', error);
          return [];  // return an empty array in case of parsing failure
        }
      },
      set(value) {
        this.setDataValue("password_history", JSON.stringify(value));
      },
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    registration_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // Automatically sets current timestamp on user creation
    },
    payment_status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    payment_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    payment_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "user",
    timestamps: false, // If you don't want Sequelize to handle timestamps
  }
);

// Synchronize the model with the database
User.sync({ alter: true });

export default User;
