const express = require("express");
const cors = require("cors");
const { connectDB, sequelize } = require("./config/db");
const subjectroute = require("./routes/subjectroute");
const videoroute = require("./routes/videoroute");
const app = express();
const path = require('path');

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
connectDB();
sequelize.sync({ force: false })
  .then(() => console.log("All models were synchronized successfully"))
  .catch(err => console.error("Model sync failed:", err));

app.use("/api", subjectroute);
app.use("/api", videoroute);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});