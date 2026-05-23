# 4. Deployment Infrastructure

## 4.1 Containerization
- **Backend**: Node Alpine image, multi-stage build.
- **Frontend**: Nginx serving static Vite build.

## 4.2 Kubernetes (K8s)
- Deployments for frontend and backend.
- Horizontal Pod Autoscaler (HPA) triggers on CPU/Memory for backend pods during active auctions.
- Ingress controller manages external traffic routing.

## 4.3 CI/CD Pipeline
GitHub Actions flow:
1. Linting & Testing.
2. Docker build and push to GHCR.
3. Automated deployment to Staging K8s cluster.

## 4.4 Monitoring
- Prometheus scrapes Node.js metrics.
- Grafana visualizes API latency, active WebSockets, and database performance.
