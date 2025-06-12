const express = require("express");
const fs = require("fs");
const Papa = require("papaparse");
const cors = require("cors");


const app = express();
app.use(cors());



const PORT = 5000;
let earthquakeData = [];

fs.readFile("./data/all_month.csv", "utf8", (err, csvData) => {
  if (err) {
    console.error("Error reading CSV:", err);
    return;
  }

  const parsed = Papa.parse(csvData, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true,
  });

  earthquakeData = parsed.data;
});

app.get("/getdata", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const entries = parseInt(req.query.entries) || 10;

  const startIndex = (page - 1) * entries;
  const endIndex = startIndex + entries;

  const paginatedData = earthquakeData.slice(startIndex, endIndex);

  res.json({
    data: paginatedData,
    totalEntries: earthquakeData.length,
    page,
    entries,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
