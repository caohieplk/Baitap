
const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');
const axios = require('axios');
const cheerio = require('cheerio');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/', async (req, res) => {
  const { url } = req.body;

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    
    
    const article = $('article').text() || $('p').text();
    const content = article.slice(0, 3000); 

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Bạn là một trợ lý AI giúp tóm tắt văn bản.' },
        { role: 'user', content: `Hãy tóm tắt nội dung sau: ${content}` }
      ]
    });

    const summary = completion.choices[0].message.content;
    res.json({ summary });
  } catch (error) {
    console.error('Tóm tắt lỗi:', error.message);
    res.status(500).json({ error: 'Không thể tóm tắt nội dung từ URL.' });
  }
});

module.exports = router;
