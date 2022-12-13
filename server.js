const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan"); //Log api requests to console
const bodyParser = require("body-parser"); //parse json data passed from client to an object and append it to request body
const cors = require("cors"); //Avoid cors error due to server and client runnning on different ports

// Routes
const authRoutes = require("./routes/authRoutes");

const dotenv = require("dotenv");
dotenv.config();

//app
const app = express();

// database connection
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => {
    console.log(`DB connection error: ${err.message}`);
  });

//Middleware
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());

//Routes middleware
app.use("/api", authRoutes);

//Port
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
