# 7. UI Wireframes & Layout Structures

## 7.1 Global Layout Shell
All dashboards share a consistent layout structure featuring:
- **Top Navbar**: Search bar, AI Copilot quick toggle, Notifications bell, Profile dropdown.
- **Left Sidebar**: Collapsible navigation menu mapping to modules (Dashboard, RFQs, Auctions, Suppliers, Analytics, Digital Twin).

## 7.2 Executive Dashboard Wireframe
- **Header**: Greeting and current date.
- **Row 1 (KPIs)**: Total Spend | Active Auctions | Projected Savings | Supplier Count. (Implemented via `KPICard.tsx`)
- **Row 2**: Large `Recharts` Line chart mapping Spend vs Budget.
- **Row 3**: AI Copilot Insights Panel showing actionable recommendations.

## 7.3 Real-time Auction Room Wireframe
- **Header**: Auction Title, ID, and bold red Countdown Timer.
- **Left Panel (70%)**: 
  - Current Lowest Bid (Large green text).
  - Target Price.
  - Input field for new bid amount.
  - "Submit Bid" CTA.
- **Right Panel (30%)**:
  - Live Bid Feed (WebSocket streaming).
  - Auto-scrolling list of competing bids with timestamps.
