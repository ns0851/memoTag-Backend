import express from "express";
import cors from "cors";
import pool from "./db.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/users", async (req, res) => {
  const { username, email, phonenumber } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO Users (username, email, phonenumber) VALUES ($1, $2, $3) RETURNING *",
      [username, email, phonenumber]
    );
    res.status(201).json({ message: "User inserted", user: result.rows[0] });
  } catch (error) {
    console.error("Insert Error:", error.message);
    res.status(500).json({ error: "Insert failed" });
  }
});

app.post("/api/waitlist", async (req, res) => {
  const { username, email, phonenumber } = req.body;

  console.log("Received waitlist data:", req.body);
  try {
    const result = await pool.query(
      "INSERT INTO waitlist (username, email, phonenumber) VALUES ($1, $2, $3) RETURNING *",
      [username, email, phonenumber]
    );
    res
      .status(201)
      .json({ message: "User inserted to waitlist", user: result.rows[0] });
  } catch (error) {
    console.error("Insert Error:", error.message);
    res.status(500).json({ error: "Insert failed" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
