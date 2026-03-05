const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");
const subjectroute = require("./routes/subjectroute");
const app = express();

app.use(cors());
app.use(express.json());

connectDB();


app.use("/api", subjectroute);

app.get("/", (req, res) => {
  res.send("Server running");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});