const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");


const app = express();
app.use(cors());
app.use(bodyParser.json());


// 🚀 1. Receive message → Send to n8n POST webhook
app.post("/send", async (req, res) => {
 const { message } = req.body;


 try {
   await axios.post(
     "https://rohankr1.app.n8n.cloud/webhook/4329c6a7-873e-4d92-a054-8ffe7468ecf7",
     { message }
   );


   res.json({ status: "Message sent", data: { message } });
 } catch (err) {
   console.error("❌ Failed to send to n8n:", err.message);
   console.error("Full error:", err.response?.data || err);
   res.status(500).json({ error: "n8n POST failed" });
 }
});


// 📤 2. Frontend will call this to fetch all messages
app.get("/all-messages", async (req, res) => {
 try {
   const response = await axios.get(
     "https://rohankr1.app.n8n.cloud/webhook/25a344db-4b3a-4f1f-94ce-c63d7b5eee09"
   );
   res.json({ messages: response.data });
 } catch (err) {
   console.error("❌ Failed to fetch messages:", err.message);
   res.status(500).json({ error: "n8n GET failed" });
 }
});


// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
 console.log(`🚀 Server running at http://localhost:${PORT}`);
});


