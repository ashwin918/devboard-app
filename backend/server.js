import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Create table if not exists
const createTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS announcements (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255),
      message TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

createTable();

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
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
