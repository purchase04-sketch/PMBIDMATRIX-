# 3. Database Design

## 3.1 MongoDB Atlas Architecture
A replica set ensures high availability. Sharding is planned for future scaling of Bid history and Notifications collections.

## 3.2 Collections
- **Users**: RBAC info, profiles.
- **Suppliers**: KYC, metrics, risk scores.
- **RFQs & Auctions**: Procurement events, rules, and rulesets.
- **Bids**: Append-only collection for auditability.
- **PurchaseOrders & Contracts**: Post-auction artifacts.
- **CommodityRisk**: Time-series data for pricing.

## 3.3 Indexes
- Compound indexes on (auctionId, timestamp) for fast bid retrieval.
- Text indexes on Supplier names and categories for search.

## 3.4 WebSocket State
Active auction state (current best bid, timer) is maintained in Redis to reduce MongoDB load during high-frequency bidding, flushing to MongoDB periodically.
