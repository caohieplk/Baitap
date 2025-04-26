// backend/utils/openai.js
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getSummaryFromText(text) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Bạn là một trợ lý AI giúp tóm tắt văn bản.' },
        { role: 'user', content: `Hãy tóm tắt nội dung sau: ${text}` }
      ]
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Lỗi khi tóm tắt văn bản:', error.message);
    throw new Error('Không thể tóm tắt văn bản.');
  }
}

async function getAnswerFromText(text, question) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Bạn là trợ lý AI giúp trả lời câu hỏi từ văn bản.' },
        { role: 'user', content: `Dưới đây là nội dung của văn bản. Hãy trả lời câu hỏi: ${question}\n\n${text}` }
      ]
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Lỗi khi trả lời câu hỏi từ văn bản:', error.message);
    throw new Error('Không thể trả lời câu hỏi từ văn bản.');
  }
}

module.exports = { getSummaryFromText, getAnswerFromText };
