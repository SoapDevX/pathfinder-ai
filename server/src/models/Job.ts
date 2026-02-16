import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface JobAttributes {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string;
  salary?: string;
  jobType: string; // full-time, part-time, contract
  remote: boolean;
  source: string; // linkedin, indeed, etc
  sourceUrl: string;
  postedDate: Date;
  expiryDate?: Date;
  skills: string[]; // array of required skills
  createdAt?: Date;
  updatedAt?: Date;
}

interface JobCreationAttributes extends Optional<JobAttributes, 'id'> {}

class Job extends Model<JobAttributes, JobCreationAttributes> implements JobAttributes {
  public id!: number;
  public title!: string;
  public company!: string;
  public location!: string;
  public description!: string;
  public requirements!: string;
  public salary?: string;
  public jobType!: string;
  public remote!: boolean;
  public source!: string;
  public sourceUrl!: string;
  public postedDate!: Date;
  public expiryDate?: Date;
  public skills!: string[];
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Job.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    requirements: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    salary: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    jobType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    remote: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    source: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sourceUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postedDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    expiryDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    skills: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
  },
  {
    sequelize,
    tableName: 'jobs',
  }
);

export default Job;