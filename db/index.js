// ============================================================
// db/index.js
// This file sets up the connection to the PostgreSQL database.
// ============================================================
//
// ✏️  TASK (COMMENT): Add a comment above EACH of the 5 marked sections below
//     explaining what that line or block of code does.
//     Your comments should be in your own words.
//     You will NOT change any of the actual code — only add comments.
//
// ============================================================

// SECTION 1 — This imports required packages and loads environment variables from the .env file.
const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// SECTION 2 — This creates a connection pool for the PostgreSQL database using the database URL and SSL settings.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// SECTION 3 — This finds the schema.sql file and reads its contents so the database tables can be created.
const schemaPath = path.join(__dirname, "schema.sql");
const schema = fs.readFileSync(schemaPath, "utf8");

// SECTION 4 —  This runs the SQL schema file to make sure the required database tables exist and logs the result.
(async () => {
  try {
    await pool.query(schema);
    console.log("✅ Tables ensured from schema.sql");
  } catch (err) {
    console.error("❌ Failed to run schema.sql:", err);
  }
})();

// SECTION 5 — This exports the database pool so it can be used in other files in the project.
module.exports = pool;
