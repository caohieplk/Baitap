
const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/', async (req, res) => {
  const { messages } = req.body;

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    const stream = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      res.write(`data: ${content}\n\n`);
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error) {
    console.error('OpenAI Error:', error.message);
    res.write(`data: Lỗi: ${error.message}\n\n`);
    res.write('data: [DONE]\n\n');
    res.end();
  }
});

module.exports = router;
