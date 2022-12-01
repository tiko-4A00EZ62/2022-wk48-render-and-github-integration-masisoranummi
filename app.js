const express = require("express");
const electricityRouter = require("./routes/electricity");

const app = express();
app.use(express.json());

app.use("/api/electricity", electricityRouter);

module.exports = app;
