
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');

router.post('/upload', async (req, res) => {
  const file = req.files?.pdf;

  if (!file) {
    return res.status(400).json({ error: 'Không tìm thấy file PDF.' });
  }

  const uploadPath = path.join(__dirname, '../uploads', file.name);

  
  file.mv(uploadPath, async (err) => {
    if (err) {
      return res.status(500).json({ error: 'Không thể tải lên file PDF.' });
    }

    try {
      const dataBuffer = fs.readFileSync(uploadPath);
      const pdfData = await pdfParse(dataBuffer);

      
      const pdfText = pdfData.text;

      res.json({ text: pdfText });
    } catch (error) {
      console.error('Lỗi khi đọc PDF:', error.message);
      res.status(500).json({ error: 'Không thể đọc nội dung file PDF.' });
    }
  });
});

router.post('/ask', async (req, res) => {
  const { question, text } = req.body;

  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

   
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Bạn là trợ lý AI giúp trả lời câu hỏi dựa trên văn bản PDF.' },
        { role: 'user', content: `Dưới đây là nội dung của file PDF. Hãy trả lời câu hỏi: ${question}\n\n${text}` }
      ]
    });

    const answer = completion.choices[0].message.content;
    res.json({ answer });
  } catch (error) {
    console.error('Lỗi khi hỏi đáp từ PDF:', error.message);
    res.status(500).json({ error: 'Không thể trả lời câu hỏi từ PDF.' });
  }
});

module.exports = router;
