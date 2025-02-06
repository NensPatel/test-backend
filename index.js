const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const app = express();
app.use("/public", express.static("public"));

const cors = require("cors");

require("./config/connection");


app.use(bodyParser.json({ limit: "100mb" }));
app.use(
    bodyParser.urlencoded({
        extended: true,
        limit: "100mb",
        parameterLimit: 100000,
    })
);

app.use(
    cors({
        origin: "*",
    })
);

app.use("/api", require("./routes/index.route"));


app.get("/", (req, res) => {
    res.send("Hello World");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }
    console.log(`Server is running on port ${PORT}`);
});
