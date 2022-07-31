const express = require("express");
const cors = require("cors");
const needle = require("needle");
require("dotenv").config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());

app.use("/weather", require("./routes"));


app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
