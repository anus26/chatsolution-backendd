
// import OpenAI from "openai";
// import ChatSolution from "../Modules/Modules.chat.js";

// // 👇 Initialize DeepSeek OpenAI Client
// const openai = new OpenAI({
//   baseURL: 'https://api.deepseek.com',
//   apiKey: 'sk-6b3021e65b8246bdb1c8611bb13d95dd', // e.g., 'your-deepseek-api-key'
// });

// const messageController = async (req, res) => {
//   const { question } = req.body;

//   if (!question) {
//     return res.status(400).json({ message: "Question is required." });
//   }

//   try {
//     // 👇 Only one DeepSeek call
//     const response = await openai.chat.completions.create({
//       model: "deepseek-chat", // Correct model for DeepSeek
//       messages: [
//         { role: "system", content: "You are a helpful assistant." },
//         { role: "user", content: question }
//       ],
//     });

//     const answer = response.choices[0]?.message?.content?.trim();

//     // 👇 Save to MongoDB
//     const newChat = new ChatSolution({
//       question,
//       message: answer,
//     });

//     const savedChat = await newChat.save();

//     res.status(201).json({
//       success: true,
//       answer,
//       savedChat,
//     });

//   } catch (error) {
//     console.error("Error saving message:", error);
//     res.status(500).json({
//       message: "Failed to save message.",
//       error: error.message,
//     });
//   }
// };

// export default messageController;














import axios from 'axios';
import ChatSolution from '../Modules/Modules.chat.js';
import dotenv from 'dotenv';
dotenv.config();

const messageController = async (req, res) => {

  const { question } = req.body;
  if (!question) {
    return res.status(400).json({ message: "question is required." });
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          { parts: [{ text: question }] }
        ]
      },
      { headers: { "Content-Type": "application/json" } }
    );

    const answer = response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    const newChat = new ChatSolution({ 
      question, 
      message: answer,
       user: req.user._id
    });
    const savedChat = await newChat.save();

    res.status(201).json({ success: true, answer, savedChat });

  } catch (error) {
    console.error("Error from Gemini API:", error.response?.data || error.message);
    res.status(500).json({
      message: "Failed to fetch from Gemini",
      error: error.response?.data || error.message
    });
  }
};



const allmessages=async(req,res)=>{
        try {
          const messages=await ChatSolution.find({user:req.user._id}).sort({createdAt:-1})
          res.status(200).json({
            success:true,
            messages
          })
        } catch (error) {
          console.error("Error fetching messages",error.message);
            res.status(500).json({
      success: false,
      message: "Something went wrong while fetching messages.",
      error: error.message
    })
          
        }
}

export  {messageController,allmessages};
