# 1. Enterprise Architecture

## 1.1 System Overview
PMBIDMATRIX is a next-generation Smart Procurement Intelligence & Auction Platform. It streamlines the source-to-pay process with AI-driven insights, real-time reverse auctions, and seamless ERP integration.

## 1.2 High-Level Design (HLD)
The system follows a microservices-inspired architecture with a centralized API gateway.
- **Frontend**: React SPA with Vite, TailwindCSS, and Recharts.
- **Backend**: Node.js Express server with Socket.IO for real-time events.
- **Database**: MongoDB Atlas for persistence, Redis for caching and pub/sub.
- **Integrations**: Oracle Fusion Cloud Procurement for ERP sync.

## 1.3 Technology Stack
- **Node.js & Express**: High-performance async processing.
- **React**: Dynamic component-based UI.
- **MongoDB**: Flexible document schema for varying procurement data.
- **Redis**: Low-latency caching and real-time state management.
- **Socket.IO**: Bi-directional communication for live auctions.

## 1.4 Communication Patterns
- **Sync REST**: Standard CRUD operations (RFQ, PO, PR management).
- **Async WebSocket**: Live auction bidding, real-time notifications.
- **Event-Driven**: Background jobs for ERP sync and AI model training (using Redis queues).
