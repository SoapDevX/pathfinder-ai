import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || "pathfinder",
  process.env.DB_USER || "postgres",
  process.env.DB_PASS || "password",
  {
    host: "localhost",
    dialect: "postgres",
    logging: false, // Set to console.log to see SQL queries
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);
// Test connection
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully");
    
    // Sync models (creates tables if they don't exist)
    await sequelize.sync({ alter: true });
    console.log("✅ Database tables synchronized");
  } catch (error) {
    console.error("❌ Unable to connect to database:", error);
    process.exit(1);
  }
};

export default sequelize;
