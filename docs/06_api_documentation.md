# 6. API Documentation

## 6.1 Authentication API

### POST `/api/v1/auth/login`
Authenticates a user and returns a JWT token.
**Request Body**:
```json
{
  "email": "buyer@example.com",
  "password": "securepassword123"
}
```
**Response**: `200 OK`
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR...",
  "user": { "id": "1", "role": "buyer", "name": "John Doe" }
}
```

## 6.2 Reverse Auction API

### POST `/api/v1/auction/:id/bid`
Submits a new bid for a specific auction.
**Request Body**:
```json
{
  "amount": 54500
}
```
**Response**: `201 Created`
```json
{
  "message": "Bid accepted",
  "currentRank": 1,
  "antiSnipingTriggered": true,
  "newEndTime": "2026-10-12T14:32:00Z"
}
```

## 6.3 AI Copilot API

### POST `/api/v1/copilot/query`
Processes natural language queries to extract procurement insights.
**Request Body**:
```json
{
  "query": "Show me the risk profile of Tata Steel"
}
```
**Response**: `200 OK`
```json
{
  "response": "Tata Steel has a low risk profile with an ESG score of 92/100...",
  "dataContext": { "supplierId": "SUP-001" }
}
```
