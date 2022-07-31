const express = require("express");
const router = express.Router();
const needle = require("needle");
const url = require("url");

const API_BASE_URL = process.env.API_BASE_URL;
const API_NAME = process.env.API_NAME;
const APIKEY = process.env.APIKEY;

router.get("/", async (req, res) => {
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

module.exports = router;
