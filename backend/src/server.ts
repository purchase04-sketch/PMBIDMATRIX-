import express from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database';
import { initSocket } from './config/socket';
import { errorHandler, notFound, rateLimiter } from './middleware/errorHandler';
import authRoutes from './routes/auth.routes';
import rfqRoutes from './routes/rfq.routes';
import auctionRoutes from './routes/auction.routes';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDatabase();

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
initSocket(server);

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(compression());
app.use(express.json());
app.use(rateLimiter(200, 60000));

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/rfq', rfqRoutes);
app.use('/api/v1/auction', auctionRoutes);

// Base route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to PMBIDMATRIX Smart Procurement API' });
});

// Error Handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
