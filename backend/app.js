const express = require("express")
const app = express()
require("dotenv").config({path:"/backend/config/config.env"})
const mongoose = require("mongoose");
const universityRoutes = require("./routes/university");
const cors = require("cors");
const cookieParser = require("cookie-parser");
app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );

mongoose.connect("mongodb://127.0.0.1:27017/University").then(con => console.log("Database Connected:"+con.connection.host)).catch(e => console.log(e))


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//routers
app.use('/api/v1',universityRoutes)

module.exports = app