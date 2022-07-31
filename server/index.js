const express = require("express");
const cors = require("cors");
const axios = require('axios')
require("dotenv").config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());

app.use("/weather", require("./routes"));

app.use('/google', (req, res) =>{
    const options = {
      method: "GET",
      url: `https://maps.googleapis.com/maps/api/js?key=AIzaSyAPhHj2Y_iCyBjBxIzIvriQYmksH8On4YU&libraries=places&callback=initAutocomplete`,
    };
    axios.request(options).then((response)=>{
        res.json(response.data)
    }).catch((error)=>{
        console.error(error)
    })
})

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
