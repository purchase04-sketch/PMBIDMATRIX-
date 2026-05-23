# 2. Oracle Integration Strategy

## 2.1 Overview
The platform synchronizes data with Oracle Fusion Cloud Procurement to ensure consistent Item Masters, Supplier Masters, and Purchase Orders.

## 2.2 Data Transfer Objects (DTOs)
- **SupplierDTO**: Maps PMBIDMATRIX supplier schema to Oracle Supplier standard.
- **PurchaseOrderDTO**: Transforms auction results into Oracle PO format.

## 2.3 Authentication
OAuth2 flow with client credentials grant is used to authenticate backend services against Oracle API Gateway.

## 2.4 Sync Mechanisms
- **Batch Sync**: Nightly cron jobs sync Item and Supplier masters.
- **Event-Triggered Sync**: Approved POs are immediately pushed to Oracle via webhooks.
- **Retry Strategy**: Exponential backoff with dead-letter queues for failed syncs.
