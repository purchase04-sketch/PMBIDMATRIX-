# Implementation Plan - Smart Procurement Intelligence & Auction Platform

Building a next-generation, enterprise-grade, AI-powered Smart Procurement, RFQ, Reverse Auction, and Oracle ERP Integration Platform.

## User Review Required

> [!IMPORTANT]
> **Environment Prerequisites:**
> - Node.js and Git are not currently installed on the host system. We will install Git (v2.45.1) and Node.js (v22.2.0) using the host's `winget` tool.
> - The MongoDB connection string provided is: `mongodb+srv://himanshu12mathpal_db_user:R1fqso3X4mdgZLYR@cluster0.wr0jj0l.mongodb.net/pmbidmatrix` (updated username/password format to Atlas SRV).
> - We will create a `/docs` directory in the repository containing detailed markdown documentation for the 28 specific enterprise deliverables requested (Enterprise Architecture, LLD, HLD, Kubernetes, Security, etc.).
> - Git authentication: We will set up the local git repository in `z:\PRACHI\ANTIGRAVITY` and link it to the remote `https://github.com/purchase04-sketch/PMBIDMATRIX-.git`. We will ask the user to verify authentication/credentials if git push requires interactive login.

## Proposed System Directory Layout

We will create a monorepo-style structure inside `z:\PRACHI\ANTIGRAVITY`:

```text
├── docs/                      # 28 Enterprise Architectural Deliverables (HLD, LLD, Schemas, etc.)
├── backend/                   # Node.js + Express + TypeScript + Socket.IO Server
│   ├── src/
│   │   ├── config/            # DB, Redis Mock, Socket.IO setup
│   │   ├── controllers/       # Business logic (RFQ, Auction, Supplier, Hedging)
│   │   ├── models/            # Mongoose schemas for MongoDB Atlas
│   │   ├── routes/            # Express router bindings
│   │   ├── services/          # ERP Mock sync, AI recommendation & forecasting engines
│   │   ├── sockets/           # Real-time bidding & auction state engine
│   │   └── server.ts          # Server entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/                  # React + TypeScript + Tailwind + Redux + Vite
│   ├── src/
│   │   ├── components/        # Layout, Shared components, Charts, AI Widgets
│   │   ├── store/             # Redux toolkit slices (Auction, RFQ, Commodity)
│   │   ├── hooks/             # React Query hooks for API integrations
│   │   ├── pages/             # Dashboards (Executive, Buyer, Supplier, Hedging, twins)
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── tailwind.config.js
│   └── tsconfig.json
├── docker-compose.yml         # Dev environment composition
├── Dockerfile.backend
└── Dockerfile.frontend
```

---

## Proposed Changes

### Component 1: Enterprise Deliverables Documentation (`/docs`)
We will write comprehensive architectural specifications representing the 28 required enterprise deliverables.

- [NEW] `/docs/01_enterprise_architecture.md` (Enterprise Architecture, HLD, LLD, Microservices)
- [NEW] `/docs/02_oracle_integration.md` (Oracle Integration Flow, DTOs, Middlewares, OAuth)
- [NEW] `/docs/03_database_design.md` (Database Schema, MongoDB Collections, WebSocket Design)
- [NEW] `/docs/04_deployment_infra.md` (Docker, Kubernetes, Helm, Terraform, CI/CD, DR, Scalability)
- [NEW] `/docs/05_ai_security_roadmap.md` (AI Agent Architecture, Security, Event-Driven Architecture, Future Roadmap)

---

### Component 2: Backend API & Real-time Auction Engine (`/backend`)
Build an Express app in TypeScript handling:
- **MongoDB Models**: `User`, `PurchaseRequisition`, `PurchaseIndent`, `RFQ`, `Auction`, `Bid`, `Supplier`, `CommodityRisk`, `Contract`.
- **WebSocket Gateway (`/sockets`)**: Handle real-time bidding, anti-sniping (extend end time by 2 mins if bid placed in last 1 min), live rankings, auto-bidding limits, min decrement validations.
- **Oracle ERP Sync Mock**: Schedules cron tasks mimicking synchronization of Item Master, Supplier Master, historical PO data, and pushing finalized Auction results to ERP.
- **AI Analytics Services**: Commodity price forecasting simulations, supplier risk profiling (KYC + history), RFQ negotiation range suggestions, and Digital Twin disruption scenarios.

---

### Component 3: Premium Frontend Application (`/frontend`)
React + Tailwind SPA featuring:
1. **Executive / Buyer Dashboards**: Recharts/D3-driven visuals for procurement spend, commodity price fluctuations, supply chain risk heatmap, and AI action items.
2. **Real-time Auction Room**: WebSocket-driven bidding interface showing current bids, runner-up rankings, competitor pricing models (hedged/hidden as per rules), remaining time, auto-bid activation, and live audit log.
3. **AI Copilot & Twin Simulator**: Interface to run "What if" commodity simulations (e.g. "Steel increases 15%") and trigger Digital Twin disruptions (e.g. "Supplier failure in Raw Metal category").

---

## Verification Plan

### Automated Verification
- Run TypeScript compiler checks in both `backend` and `frontend` folders.
- Validate MongoDB Atlas connection by writing a diagnostic script checking CRUD operations against the provided URI.
- Validate Express start-up and Socket.io handshake.

### Manual Verification
- Verify the real-time bid engine by opening two browser windows (Buyer and Supplier view) and bidding on an active auction to watch live rank changes and time extension triggers.
- Run Digital Twin simulation scenarios on the UI and observe immediate risk recalculations.
- Test LLM Copilot prompts to verify parsing and responses.
