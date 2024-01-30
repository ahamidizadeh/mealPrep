import axios from "axios";
import OpenAI from "openai";

// const openAiURL = "	https://api.openai.com/v1/chat/completions";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getAnswerFromAi(req, res) {
  const data = {
    messages: [{ role: "user", content: req.body }],
    model: "gpt-3.5-turbo",
  };

  try {
    const response = await openai.chat.completions.create(data);

    console.log("here it isS", response.choices[0]);
    res.status(200).json(response.choices[0].message);
  } catch (error) {
    console.log("cant get info from ai", error);
  }
}
