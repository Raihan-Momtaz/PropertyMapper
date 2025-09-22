
# Property Mapper

A full-stack application to normalize and manage property details.  
The project contains a **.NET 9 API** backend and a **React + TypeScript** frontend.

---

## 📂 Project Structure



Property Mapper/
├── PropertyNormalizerApi/ # Backend API (C# .NET 9)
├── PropertyNormalizer.Tests/ # Unit tests for backend
└── frontend/ # Frontend (React + TypeScript)


---

## ⚙️ Backend (API)

### Requirements
- [.NET 9 SDK](https://dotnet.microsoft.com/en-us/download)

### Run API
```bash
cd PropertyNormalizerApi
dotnet run


API will run at:
👉 http://localhost:5070

Run Backend Tests
cd PropertyNormalizer.Tests
dotnet test

💻 Frontend (React)
Requirements

Node.js
 v18+

npm (or yarn)

Install & Start
cd frontend
npm install
npm start


Frontend will run at:
👉 http://localhost:5173

✅ Running Frontend Tests

Frontend uses Jest + React Testing Library.

cd frontend
npm test


Example test cases:

Component renders property details

Modal opens/closes correctly

Form validates inputs

API calls handled correctly

🚀 Features

Normalize external property data into internal format

REST API for property normalization

React UI for viewing/editing property details

Input validation (volume/folio)

Unit tests for both backend and frontend
