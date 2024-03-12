import { DataTypes, Model } from "sequelize";
import sequelize from "../db";
import { JSONTask } from "../../types";

class Task extends Model<JSONTask> {}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.CHAR(20),
      allowNull: false,
    },
    description: {
      type: DataTypes.CHAR(100),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Task",
    tableName: "tasks_ts",
    timestamps: true,
  }
);

export default Task;
