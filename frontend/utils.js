const fetch = require('node-fetch');

// Hàm tìm kiếm sự kiện mới nhất
async function getLatestNews(query) {
  const apiKey = '60b14504340849eeb16cd4b62ede455e'; // Thay thế bằng API key của bạn
  const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return data.articles.map(article => article.title).join('\n');
  } catch (error) {
    console.error('Lỗi tìm kiếm sự kiện:', error);
    throw new Error('Không thể tìm kiếm sự kiện');
  }
}
