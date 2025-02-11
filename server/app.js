const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
dotenv.config();
const userRoute = require("./routes/userRoute");
const notesRoute = require('./routes/notesRoute');

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/user", userRoute);
app.use("/api/notes", notesRoute);


mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    err;
  });
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
