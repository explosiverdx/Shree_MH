# SHREE Ortho & Multispeciality Hospital MERN Website

Full-stack hospital website built with React, Node.js, Express, MongoDB, and JWT authentication.

## Folder Structure

```text
Hospital/
  backend/
    src/
      config/
      controllers/
      middleware/
      models/
      routes/
      utils/
    .env.example
    package.json
    server.js
  frontend/
    src/
      api/
      components/
      context/
      pages/
    package.json
    vite.config.js
```

## Setup Commands

```powershell
cd C:\Users\RDX\Desktop\Hospital\backend
npm install
Copy-Item .env.example .env
```

Edit `backend\.env` and add your MongoDB connection string.

```powershell
cd C:\Users\RDX\Desktop\Hospital\frontend
npm install
```

## Run Commands

Start backend:

```powershell
cd C:\Users\RDX\Desktop\Hospital\backend
npm run dev
```

Start frontend:

```powershell
cd C:\Users\RDX\Desktop\Hospital\frontend
npm run dev
```

Frontend: `http://localhost:5173`

Backend API: `http://localhost:5000/api`

## Default Admin

Set these in `backend\.env` before starting the backend:

```env
ADMIN_NAME=SHREE Ortho & Multispeciality Hospital Admin
ADMIN_EMAIL=admin@hospital.com
ADMIN_PASSWORD=Admin@12345
```

The backend creates this admin automatically if it does not exist.
