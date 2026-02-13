import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

interface UserAttributes {
  id?: number;
  name: string;
  email: string;
  password: string;
  roleTarget?: string;
  githubUsername?: string;
  githubAccessToken?: string;
  githubConnected?: boolean;
  skillsAnalysis?: object;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public roleTarget!: string;
  public githubUsername!: string;
  public githubAccessToken!: string;
  public githubConnected!: boolean;
  public skillsAnalysis!: object;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
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
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleTarget: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    githubUsername: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    githubAccessToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    githubConnected: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    skillsAnalysis: {
      type: DataTypes.JSON,
      defaultValue: {},
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
  }
);

export default User;