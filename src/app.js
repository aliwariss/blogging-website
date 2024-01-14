const express = require("express")
const app = express();

const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");

app.use(express.json())

app.use("/",adminRoutes)
app.use("/",userRoutes)
app.use("/",authRoutes)

module.exports = app;