const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend is listening on PORT ${PORT}`);
});

app.get("/health", (req, res) => {
    res.send("OK");
});
