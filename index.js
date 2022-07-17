require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const videosRouter = require("./routes/videos");
const PORT = process.env.PORT || 8080;
app.use(cors());

app.use(express.json());
app.use("/videos", videosRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
});
