const express = require("express");
const router = express.Router();
const needle = require("needle");
const url = require("url");
const apicache = require("apicache");

const API_BASE_URL = process.env.API_BASE_URL;
const API_NAME = process.env.API_NAME;
const APIKEY = process.env.APIKEY;

const API_URL = process.env.GOOGLE_URL;

// Cachcing 
let cache = apicache.middleware

router.get("/", cache('2 minutes'), async (req, res) => {
  try {
    const params = new URLSearchParams({
      [API_NAME]: APIKEY,
      ...url.parse(req.url, true).query,
    });
    const apiRes = await needle("get", `${API_BASE_URL}?${params}&aqi=no`);
    const data = apiRes.body;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/google", cache('2 minutes'), function (req, res) {
  res.send(API_URL);
}); 

module.exports = router;

/*
const GOOGLE_BASE = process.env.GOOGLE_BASE;
const GOOGLE_API_NAME = process.env.GOOGLE_API_NAME;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
*/

/*
router.get("/google", async (req, res) => {
  try {
    const params = new URLSearchParams({
      [GOOGLE_API_NAME]: GOOGLE_API_KEY,
    });
    const apiRes = await needle(
      "get",
      `${GOOGLE_BASE}?${params}&libraries=places&callback=initAutocomplete`
    );
    const data = apiRes.body;
    res.send(data)
  } catch (error) {
    res.status(500).json({ error });
  }
});
*/
