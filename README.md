Chatbot LLM Application

Giới thiệu
-Ứng dụng Chatbot sử dụng OpenAI API để trả lời câu hỏi của người dùng theo dạng streaming.
Yêu cầu
- Node.js (>= v14.x)
- ReactJS
- OpenAI API Key
Cài đặt Backend
1. Cài đặt các phụ thuộc:
   bash
    cd backend
    npm install
2. Tạo tệp `.env` trong thư mục `backend` và thêm API Key của bạn:
    env
    OPENAI_API_KEY=your_api_key_her
3. Khởi động server backend:
    bash
    node server.js
Cài đặt Frontend
1. Cài đặt các phụ thuộc:
bash
    cd frontend
    npm install
2. Khởi động ứng dụng frontend:
   bash
    npm start
Hướng dẫn sử dụng
- Truy cập `http://localhost:3000` trên trình duyệt để bắt đầu trò chuyện với chatbot.
- Nhập tin nhắn vào ô chat và nhấn Enter để gửi tin nhắn.


