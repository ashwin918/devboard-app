
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ================================
// Create table if not exists
// ================================
const createTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS announcements (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Table checked/created successfully");
  } catch (err) {
    console.error("Error creating table:", err.message);
  }
};

createTable();

// ================================
// Routes
// ================================

// Health check route (VERY IMPORTANT for testing)
app.get("/", (req, res) => {
  res.send("DevBoard Backend is running 🚀");
});

// Add Announcement
app.post("/api/announcements", async (req, res) => {
  const { title, message } = req.body;

  try {
    const newPost = await pool.query(
      "INSERT INTO announcements (title, message) VALUES ($1, $2) RETURNING *",
      [title, message]
    );
    res.json(newPost.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get All Announcements
app.get("/api/announcements", async (req, res) => {
  try {
    const posts = await pool.query(
      "SELECT * FROM announcements ORDER BY created_at DESC"
    );
    res.json(posts.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ================================
// Server Listen (IMPORTANT FIX)
// ================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
