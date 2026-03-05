const express = require("express");
const cors = require("cors");
const { connectDB ,sequelize} = require("./config/db");
const subjectroute = require("./routes/subjectroute");
const app = express();

app.use(cors());
app.use(express.json());

connectDB();
sequelize.sync({ force: false })  // force:true drops table if it exists
  .then(() => console.log("All models were synchronized successfully"))
  .catch(err => console.error("Model sync failed:", err));

app.use("/api", subjectroute);

app.get("/", (req, res) => {
  res.send("Server running");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});