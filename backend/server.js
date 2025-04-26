// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const chatRoutes = require('./routes/chat');
const summarizeRoutes = require('./routes/summarize');
const pdfRoutes = require('./routes/pdf');
const fileUpload = require('express-fileupload');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use('/uploads', express.static('uploads')); // serve files

// Mount các router
app.use('/chat', chatRoutes);
app.use('/summarize', summarizeRoutes);
app.use('/pdf', pdfRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
