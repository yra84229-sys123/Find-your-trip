# Find Your Trip (Full Stack)

This repository is organized into a clean decoupled architecture:

```
├── backend/    # Laravel API backend (Sanctum authentication, SQLite database)
├── frontend/   # React + Vite frontend application
├── postman/    # Postman API collection for testing backend endpoints
└── PP/         # Archive of legacy static HTML/CSS files
```

---

## Quick Start

### 1. Start the React Frontend
```bash
npm run dev
```
Runs at: [http://localhost:5173](http://localhost:5173)

### 2. Start the Laravel Backend
```bash
npm run backend
```
Or directly from `backend/`:
```bash
cd backend
php artisan serve
```
Runs at: [http://localhost:8000](http://localhost:8000)

### 3. API Testing with Postman
Import the collection from:
- `postman/Find_Your_Trip.postman_collection.json`

Base URL is set to `http://localhost:8000` with preconfigured routes:
- `GET /api/ping` (API Health Check)
- `GET /api/user` (Authenticated User)
