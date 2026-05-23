# PMBIDMATRIX - Smart Procurement Intelligence Platform

> AI-Powered Procurement, RFQ, Reverse Auction & Oracle ERP Integration Platform

## 🚀 Overview

PMBIDMATRIX is a next-generation, enterprise-grade procurement automation platform designed for manufacturing organizations. It combines AI intelligence with real-time auction capabilities and Oracle ERP integration.

### Key Features

- **AI-Powered Procurement Intelligence** - Supplier recommendations, risk scoring, commodity forecasting
- **Real-Time Auction Engine** - Reverse/Forward/Multi-lot auctions with WebSocket bidding
- **Complete RFQ Workflow** - PR → PI → RFQ → Auction → PO lifecycle
- **Oracle ERP Integration** - Bi-directional sync with Oracle Procurement Cloud
- **Commodity Hedging** - AI-driven hedging recommendations for raw materials
- **Digital Twin Simulation** - What-if scenarios for supply chain disruptions
- **AI Copilot** - Natural language procurement commands
- **Multi-Channel Notifications** - Email, SMS, WhatsApp, Push, In-app

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript, Tailwind CSS, Vite, Recharts, Framer Motion |
| Backend | Node.js, Express.js, TypeScript, Socket.IO |
| Database | MongoDB Atlas |
| Auth | JWT, bcrypt, RBAC |
| Real-time | WebSocket (Socket.IO) |
| AI/ML | OpenAI API, Time-series forecasting |

## 📁 Project Structure

```
PMBIDMATRIX/
├── backend/          # Express.js API server
│   ├── src/
│   │   ├── config/       # Database & socket config
│   │   ├── controllers/  # Route handlers
│   │   ├── middleware/   # Auth, error handling, rate limiting
│   │   ├── models/       # Mongoose schemas
│   │   ├── routes/       # API routes
│   │   ├── services/     # Business logic & AI services
│   │   ├── sockets/      # WebSocket handlers
│   │   └── utils/        # Helpers & seed data
│   └── server.ts
├── frontend/         # React SPA
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── store/        # State management
│   │   └── hooks/        # Custom hooks
│   └── index.html
├── docs/             # Architecture documentation
├── docker-compose.yml
└── README.md
```

## 🔧 Setup & Installation

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Git

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env  # Configure your environment
npm run seed          # Seed demo data
npm run dev           # Start dev server on port 5000
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev           # Start dev server on port 5173
```

## 🌐 Environment Variables

```env
MONGO_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
PORT=5000
NODE_ENV=development
```

## 📊 Modules

1. **Dashboard** - Executive, Buyer, Supplier, Analytics views
2. **Supplier Management** - Onboarding, KYC, ratings, risk tracking
3. **Purchase Requisitions** - Create, approve, track PRs
4. **Purchase Indents** - Indent management linked to PRs
5. **RFQ Management** - Create, publish, evaluate, award RFQs
6. **Auction Engine** - Real-time reverse/forward auctions
7. **Purchase Orders** - Auto-generated POs from auctions
8. **Contracts** - Contract lifecycle management
9. **Commodity Intelligence** - Price tracking, hedging, risk scores
10. **AI Copilot** - Natural language procurement assistant
11. **Digital Twin** - Supply chain simulation
12. **Notifications** - Multi-channel alert system

## 📜 License

Proprietary - All rights reserved.
