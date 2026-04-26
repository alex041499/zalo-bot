const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

// =========================
// CONFIG
// =========================
const BOT_TOKEN = "NsoOAGfstpbOPvue1tJKE5HWb2uS1PrY7n3V3mXYo1ma7yXfTd7p2oPaxqLrVzOIIclYP1m4qW5A4ineOM3r6c4jo5vWEVmmV2F8RYDH_74dIyKc8ZlWSH1Konmc9-825t_X53WLe5ywVU1E1XxP0Krmn1Tp7lL7KmopL5vyzmDjEFLgMo-r7ty_f4fxBBaaSKkhKMujhXvhN9fHPJ-kJcPwlnfbR_i5KGkvI6KQf00kTe1bVX-YUaq5XWjDOPTcI1U5UNHZpoLBTeqxOnYoKqPAh1iJ7-e4HtdkHMvfqo9oUvLjPYoC64StkqeHM_0k04lEV087-oWILBjTFpgm3IreinaKVx1d5WIBAK9hkpfxUlblHmt9EqDNr4qGFEOHB6dUTW1wp0C10T1g7tRt6m41mserCcrc8dCc3M3JFG";

// ⚠️ QUAN TRỌNG: dùng PORT của Render
const PORT = process.env.PORT || 3000;

// =========================
// ROUTE TEST (trang chủ)
// =========================
app.get("/", (req, res) => {
  res.send("OK");
});

// =========================
// Gửi tin nhắn về user
// =========================
async function sendMessage(userId, text) {
  try {
    await axios.post(
      "https://openapi.zalo.me/v3.0/oa/message/cs",
      {
        recipient: {
          user_id: userId,
        },
        message: {
          text: text,
        },
      },
      {
        headers: {
          access_token: BOT_TOKEN,
          "Content-Type": "application/json",
        },
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
  try {
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

    // luôn trả 200 cho Zalo
    res.sendStatus(200);
  } catch (err) {
    console.log("Webhook error:", err.message);
    res.sendStatus(200);
  }
});

// =========================
// CHẠY SERVER
// =========================
app.listen(PORT, () => {
  console.log("Bot chạy tại port " + PORT);
});