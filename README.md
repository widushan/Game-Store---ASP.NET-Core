# 🎮 Game Store |  ASP.NET Core

Welcome to the **Game Store** repository! This is a modern full-stack web application built to manage a digital game storefront. It provides a robust backend API and a dynamic frontend UI to browse, add, and manage your favorite games.

## ✨ Features

- **Game Management**: Create, read, update, and delete (CRUD) games.
- **Genre Classification**: Categorize games by genres.
- **Responsive UI**: A clean, responsive interface powered by React and Bootstrap.
- **RESTful API**: Fast and reliable backend endpoints built with ASP.NET Core.
- **Cross-Origin Resource Sharing (CORS)**: Smooth integration between the React frontend and .NET backend.

## 🛠️ Technology Stack

### Backend
- **ASP.NET Core**: High-performance RESTful API.
- **Entity Framework Core**: ORM for seamless data access.
- **SQLite**: Lightweight database for development.

### Frontend
- **React (v19)**: Modern UI library for building dynamic user interfaces.
- **Vite**: Next-generation frontend tooling for lightning-fast builds.
- **Bootstrap 5**: Styling framework for responsive design.
- **React Router Dom**: Client-side routing.

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
- [.NET SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) (v18 or higher)

### 1. Clone the repository
```bash
git clone https://github.com/widushan/Game-Store---ASP.NET-Core.git
cd "ASP.NET - Game Store"
```

### 2. Run the Backend (API)
Navigate to the API directory and start the server:
```bash
cd GameStore/GameStore.Api
dotnet run
```
The API will be available at `http://localhost:5294` (and `https://localhost:7174`).

### 3. Run the Frontend (React App)
Open a new terminal window, navigate to the React app directory, install dependencies, and start the development server:
```bash
cd GameStore/GameStore.React/GameStore
npm install
npm run dev
```
The frontend will be accessible at `http://localhost:5173`.

<img width="1912" height="910" alt="Image" src="https://github.com/user-attachments/assets/713d2180-0011-4f1c-aa7d-2fdfcb2cb27f" />

<img width="1912" height="882" alt="Image" src="https://github.com/user-attachments/assets/f870f4cd-6657-45f7-a33a-84e7d5ddb7a1" />

## 📂 Project Structure

```text
ASP.NET - Game Store/
├── GameStore/
│   ├── GameStore.Api/          # Backend ASP.NET Core API project
│   └── GameStore.React/        # Frontend React + Vite project
├── README.md                   # This documentation file
└── ...
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](https://github.com/widushan/Game-Store---ASP.NET-Core/issues) if you want to contribute.

## 📝 License

This project is licensed under the MIT License.
