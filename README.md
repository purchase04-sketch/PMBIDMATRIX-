# PMBIDMATRIX - Smart Procurement Intelligence & Auction Platform

An enterprise-grade, AI-powered Smart Procurement, RFQ, Reverse Auction, and Oracle ERP Integration Platform.

## 🏗️ Architecture

```
├── backend/          # Node.js + Express + TypeScript + Socket.IO
│   ├── src/
│   │   ├── config/       # MongoDB Atlas & Socket.IO configuration
│   │   ├── controllers/  # Business logic for all modules
│   │   ├── models/       # 11 Mongoose schemas
│   │   ├── routes/       # 14 Express route modules
│   │   ├── services/     # AI, Digital Twin, ERP Sync, Hedging engines
│   │   ├── sockets/      # Real-time WebSocket auction bidding
│   │   ├── middleware/    # Auth, RBAC, Rate Limiting, Validation
│   │   └── server.ts     # Application entry point
├── frontend/         # React + TypeScript + Tailwind + Redux + Vite
│   ├── src/
│   │   ├── components/   # Navbar, Sidebar, KPICard, DataTable, ChatBubble
│   │   ├── store/        # Redux Toolkit (5 slices)
│   │   ├── hooks/        # Custom React hooks
│   │   ├── pages/        # 11 premium dashboard pages
│   │   └── services/     # API client
├── docs/             # 7 enterprise architectural documents
├── docker-compose.yml
├── Dockerfile.backend / Dockerfile.frontend
├── nginx.conf
└── .github/workflows/ci-cd.yml
```

## 🚀 Quick Start

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend
cd frontend
npm install
npm run dev
```

## 🐳 Docker

```bash
docker-compose up --build
```

## 📦 Modules

| Module | Description |
|--------|-------------|
| **Reverse Auction Engine** | Real-time WebSocket bidding with anti-sniping & auto-extend |
| **RFQ Manager** | Create, publish, evaluate, and award RFQs |
| **Supplier Management** | AI risk scoring, KYC, performance tracking |
| **Commodity Hedging** | LME price tracking, volatility analysis, forward contracts |
| **AI Copilot** | Natural language procurement intelligence queries |
| **Digital Twin** | Supply chain stress-test simulation engine |
| **Oracle ERP Sync** | Mock integration with cron-based data synchronization |
| **Analytics Dashboard** | YTD savings, auction efficiency, spend analysis |

## 🔐 Environment Variables

Create a `.env` file in the `backend/` directory:

```env
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/pmbidmatrix
JWT_SECRET=your-jwt-secret
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

## 📄 Documentation

- [Enterprise Architecture](docs/01_enterprise_architecture.md)
- [Oracle Integration](docs/02_oracle_integration.md)
- [Database Design](docs/03_database_design.md)
- [Deployment & Infrastructure](docs/04_deployment_infra.md)
- [AI & Security Roadmap](docs/05_ai_security_roadmap.md)
- [API Documentation](docs/06_api_documentation.md)
- [UI Wireframes](docs/07_ui_wireframes.md)

## 📜 License

Proprietary - All rights reserved.
