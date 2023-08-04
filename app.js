const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const initRoutes = require("./src/app/router");

const app = express();

const corsOptions = {
    origin: "*"
};

// app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("dist"));


app.use(cors(corsOptions));

// content-type：application/json
app.use(bodyParser.json());

// content-type：application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));


// Set the listening port
const PORT = process.env.PORT || 8080;

initRoutes(app);

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "../Recipe", "dist", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Backend interface address： http://localhost:${PORT}`);
});
