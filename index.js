const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

// =========================
// CONFIG
// =========================
const BOT_TOKEN = "NX4p9AXUuGHP6ZKbfLpg1LKTFoE-NfiODcyMEgTXn7zITLG8z6VuTdPHK0FhLTXAOs47RTKabYqz42O3fpZm8HKdMLsLAEOD1n9qMh82tnKFG6bfc0B06nf7J62TQ9uGDtWwLefcbYHyLGCVm4MWIqbm4ml5CRf7L34UPTuWmJikEtG0WXEWOWiMT2ku5C5MK5fTS_rZxb81Gs5mYLRI1s50O4IGGT4RErXyN9ruyIqKMt1Gd1h73mi9PtE17x003nWN8gq5amS_DJX3iIIaPYi70pMs9OqGB24wT9umZGmr8XvzbmAmNHSI8msbK_nj8MakBOXalrS9MsaEYdN_O7zrIJt3KTzbH7Tu2_5Yn5v-9LiFs2FMG79bNZFEPufmO7mgBj0yW7PbUH0DqMV4Db0eScDwnNVc5gz8xG0";
const PORT = 3000;

// =========================
// Gửi tin nhắn về user
// =========================
async function sendMessage(userId, text) {
  try {
    await axios.post(
      "https://openapi.zalo.me/v3.0/oa/message/cs",
      {
        recipient: {
          user_id: userId
        },
        message: {
          text: text
        }
      },
      {
        headers: {
          access_token: BOT_TOKEN,
          "Content-Type": "application/json"
        }
      }
    );
  } catch (error) {
    console.log("Send error:", error.response?.data || error.message);
  }
}

// =========================
// Webhook nhận tin nhắn
// =========================
app.post("/webhook", async (req, res) => {
  const event = req.body;

  console.log("Tin nhắn:", JSON.stringify(event, null, 2));

  const userId = event.sender?.id;
  const message = event.message?.text?.toLowerCase();

  if (!userId || !message) {
    return res.sendStatus(200);
  }

  if (message === "xin chào") {
    await sendMessage(userId, "Chào bạn, mình là bot Zalo OA 👋");
  }

  res.sendStatus(200);
});

// =========================
// chạy server
// =========================
app.listen(PORT, () => {
  console.log(`Bot chạy tại port ${PORT}`);
});