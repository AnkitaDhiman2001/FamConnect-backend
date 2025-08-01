import sequelizeDb from "../db/database";
import { DataTypes, Model } from "sequelize";

const Users = sequelizeDb.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },        
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
  },
    {
        timestamps: true
    }
);
export default Users;

    