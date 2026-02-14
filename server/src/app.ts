import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import githubRoutes from "./routes/githubRoutes";
import { connectDB } from "./config/database";
import aiRoutes from './routes/aiRoutes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "PathFinder AI API Running" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/github", githubRoutes);
app.use('/api/ai', aiRoutes);

const PORT = process.env.PORT || 5000;

// Connect to database
connectDB().then(() => {
  console.log("✅ Database ready");
  
  const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📡 Test: curl http://localhost:${PORT}/health`);
  });

  // Explicitly keep the event loop alive
  const keepAlive = setInterval(() => {
    // This keeps Node.js from exiting
  }, 1000 * 60 * 60); // Check every hour

  // Graceful shutdown
  const shutdown = () => {
    console.log('\n🛑 Shutting down gracefully...');
    clearInterval(keepAlive);
    server.close(() => {
      console.log('✅ Server closed');
      process.exit(0);
    });
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);

}).catch((error) => {
  console.error("❌ Database connection failed:", error);
  process.exit(1);
});