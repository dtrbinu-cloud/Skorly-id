require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./src/routes/auth');
const roomRoutes = require('./src/routes/rooms');
const attemptRoutes = require('./src/routes/attempts');
const { errorHandler, notFound } = require('./src/middleware/errors');

const app = express();
const port = Number(process.env.PORT || 5000);

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json({ limit: '2mb' }));
app.use(cookieParser());
app.use('/api/auth', rateLimit({ windowMs: 15 * 60 * 1000, limit: 100 }), authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/attempts', attemptRoutes);

app.get('/health', (_req, res) => res.json({ ok: true, service: 'skorly-api' }));
app.use(notFound);
app.use(errorHandler);

if (require.main === module) {
  app.listen(port, () => console.log(`Skorly API berjalan di http://localhost:${port}`));
}

module.exports = app;
