import { createServer } from 'http';
import { session } from 'express-session';

const server = createServer();
const sessionMiddleware = session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
});

// تطبيق middleware على جميع الطلبات
server.on('request', (req, res) => {
  sessionMiddleware(req, res, () => {
    // معالجة الطلبات هنا
  });
});

server.listen(3000, () => {
  console.log('الخادم يعمل على http://localhost:3000');
});
