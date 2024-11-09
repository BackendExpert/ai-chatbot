// api/chatbot.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { message } = req.body;

    try {
      const response = await fetch(
        `https://api.wit.ai/message?v=20211106&q=${encodeURIComponent(message)}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.WIT_AI_ACCESS_TOKEN}`,
          },
        }
      );
      const data = await response.json();
      const botMessage = data.text || "Sorry, I didn’t get that.";
      res.status(200).json({ reply: botMessage });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Error with Wit.ai API");
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
}
