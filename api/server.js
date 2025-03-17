const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 1337;
const dataFile = path.join(__dirname, "../assets/events/events.json"); // ✅ Updated Path

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Load events from JSON File
const loadData = () => {
    try {
        const data = fs.readFileSync(dataFile, "utf8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading events.json:", error);
        return [];
    }
};

// ✅ GET: Retrieve All Events
app.get("/api/events", (req, res) => {
    res.json(loadData());
});

// ✅ Start Server
app.listen(port, () => {
    console.log(`✅ Server running at http://localhost:${port}`);
});
