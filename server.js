const express = require("express");
const app = express();

// Allow JSON
app.use(express.json());

// Basic route
// app.get("/", (req, res) => {
//   res.send("Hello Express!");
// });
app.get("/", (req, res) => {
  res.send("Home page updated! 🚀");
});

app.get("/hello", (req, res) => {
  res.send("Hello from GET");
});

app.post("/login", (req, res) => {
  res.send("POST login route");
});

app.put("/update", (req, res) => {
  res.send("PUT update route");
});

app.delete("/remove", (req, res) => {
  res.send("DELETE remove route");
});


// Start server
app.listen(5000, () => console.log("Server running on port 5000"));
