
const axios = require('axios');
const cheerio = require('cheerio');

async function fetchArticleContent(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    
    const articleText = $('article').text() || $('p').text();
    
    return articleText.slice(0, 3000); 
  } catch (error) {
    console.error('Lỗi khi tải nội dung từ URL:', error.message);
    throw new Error('Không thể tải nội dung từ URL');
  }
}

module.exports = fetchArticleContent;
