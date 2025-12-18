const express = require('express');
const cors=require('cors');
const app = express();
app.use(cors());
app.use(express.json());
let fans=[
{
device_id: "fan_001",
device_name: "Living Room Fan",
power: "OFF",
speed: 1
},
{
device_id: "fan_002",
device_name: "Bedroom Fan",
power: "ON",
speed: 3
}
];


// ==============================
// MOCK: GET ACCESS TOKEN
// ==============================
app.get('/v1/get_access_token', (req, res) => {
const apiKey = req.headers['x-api-key'];
const auth = req.headers['authorization'];


if (!apiKey || !auth) {
return res.status(401).json({ error: 'Invalid credentials' });
}


res.json({
access_token: "mock_access_token_123",
expires_in: 86400
});
});


// ==============================
// MOCK: GET LIST OF DEVICES
// ==============================
app.get('/v1/get_list_of_devices', (req, res) => {
const apiKey = req.headers['x-api-key'];
const auth = req.headers['authorization'];


if (!apiKey || !auth) {
return res.status(401).json({ error: 'Unauthorized' });
}


res.json(fans);
});


// ==============================
// MOCK: SEND COMMAND
// ==============================
app.post('/v1/send_command', (req, res) => {
const { device_id, command, value } = req.body;


fans = fans.map(fan => {
if (fan.device_id === device_id) {
if (command === 'power') fan.power = value;
if (command === 'speed') fan.speed = value;
}
return fan;
});


res.json({ success: true });
});


app.listen(3000, () => {
console.log('Mock Atomberg API running on http://localhost:3000');
});