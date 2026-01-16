const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/sensordata", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Model
const Sensor = mongoose.model("Sensor", {
  value: Number,
  deviceName: String,
  timestamp: { type: Date, default: Date.now }
});

// POST /api/data → add sensor value
app.post("/api/data", async (req, res) => {
  console.log("Received data from ChirpStack:");
  //console.log(req.body);

  const deviceName = req.body.deviceInfo?.deviceName || "unknown";
  const payloadBase64 = req.body.data;
  if (!payloadBase64) return res.status(400).send("Missing data");

  const decoded = Buffer.from(payloadBase64, "base64").toString("utf8").trim();
  //decoded=payloadBase64;
  console.log("Decoded payload:", decoded);

  let value;

  // Check if the decoded string matches pattern like "random(3,40)"
  const randomMatch = decoded.match(/^random\((\d+),\s*(\d+)\)$/i);
  if (randomMatch) {
    const min = parseInt(randomMatch[1], 10);
    const max = parseInt(randomMatch[2], 10);
    value = Math.floor(Math.random() * (max - min + 1)) + min;
  } else {
    // Try to parse a normal number
    value = parseFloat(decoded);
    if (isNaN(value)) return res.status(400).send("Invalid sensor value");
  }

  const s = new Sensor({ value ,deviceName });
  await s.save();
  res.send("Saved from ChirpStack");
});



// GET /api/data → get recent values
app.get("/api/data", async (req, res) => {
    const devices = await Sensor.distinct("deviceName");
    const data = {};
    for (const name of devices) {
    data[name] = await Sensor.find({ deviceName: name })
                                .sort({ timestamp: -1 })
                                .limit(10);
    }
    res.json(data);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
