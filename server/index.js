const express = require("express");
const cors = require("cors");
const rateLimit = require('express-rate-limit')
const path = require("path");
require("dotenv").config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());

// Limit API Requests
const limiter = rateLimit({
    windowMS: 10 * 60 * 1000,
    max:100,
})

app.use(limiter)
app.set('trust proxy', 1)

// Routes for my API
app.use("/weather", require("./routes"));


// Use the below functions only for production. Also change the WeatherApp name to client. 

/*
app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});
*/


app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
