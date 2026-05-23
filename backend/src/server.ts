import express from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import dotenv from 'dotenv';

// Config
import { connectDatabase } from './config/database';
// Assuming initSocket is exported from somewhere, otherwise we use the setupAuctionSockets
import { setupAuctionSockets } from './sockets/auction.socket';
import { Server } from 'socket.io';

// Middleware
import { errorHandler, notFoundHandler, rateLimiter } from './middleware/errorHandler';

// Routes
import authRoutes from './routes/auth.routes';
import rfqRoutes from './routes/rfq.routes';
import auctionRoutes from './routes/auction.routes';
import supplierRoutes from './routes/supplier.routes';
import prRoutes from './routes/pr.routes';
import piRoutes from './routes/pi.routes';
import poRoutes from './routes/purchaseOrder.routes';
import commodityRoutes from './routes/commodity.routes';
import notificationRoutes from './routes/notification.routes';
import digitalTwinRoutes from './routes/digitalTwin.routes';
import copilotRoutes from './routes/copilot.routes';
import contractRoutes from './routes/contract.routes';
import bidRoutes from './routes/bid.routes';
import dashboardRoutes from './routes/dashboard.routes';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDatabase();

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Setup WebSockets
setupAuctionSockets(io);

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000' }));
app.use(helmet());
app.use(morgan('dev'));
app.use(compression());
app.use(express.json());
app.use(rateLimiter(200, 60000));

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/rfq', rfqRoutes);
app.use('/api/v1/auction', auctionRoutes);
app.use('/api/v1/supplier', supplierRoutes);
app.use('/api/v1/pr', prRoutes);
app.use('/api/v1/pi', piRoutes);
app.use('/api/v1/po', poRoutes);
app.use('/api/v1/commodity', commodityRoutes);
app.use('/api/v1/notification', notificationRoutes);
app.use('/api/v1/digital-twin', digitalTwinRoutes);
app.use('/api/v1/copilot', copilotRoutes);
app.use('/api/v1/contract', contractRoutes);
app.use('/api/v1/bid', bidRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);

// Health check endpoint
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Base route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to PMBIDMATRIX Smart Procurement API' });
});

// Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
