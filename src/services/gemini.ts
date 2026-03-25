import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const getHealthAdvice = async (prompt: string) => {
  try {
    const model = genAI.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [{ role: "user", parts: [{ text: `Bạn là một chuyên gia tư vấn sức khỏe. Hãy trả lời câu hỏi sau bằng tiếng Việt một cách ngắn gọn, tích cực và hữu ích: ${prompt}` }] }],
    });
    const response = await model;
    return response.text || "Xin lỗi, tôi không thể trả lời lúc này.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Chào bạn! Tôi là trợ lý sức khỏe. Hiện tại tôi đang gặp chút vấn đề kỹ thuật, nhưng bạn có thể hỏi tôi về BMI, TDEE hoặc các bài tập nhé!";
  }
};
