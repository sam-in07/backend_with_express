const express = require("express");
const app = express();

// Allow JSON
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.send("Hello Express!");
});

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));
