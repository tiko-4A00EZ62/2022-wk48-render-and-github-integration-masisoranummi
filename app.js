const express = require("express");
const cors = require("cors");
const electricityRouter = require("./routes/electricity");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/electricity", electricityRouter);

app.get("/health", (req, res) => {
    res.send("OK");
});

module.exports = app;
