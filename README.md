# 🐾 React Full Stack App

This is my first modern full stack web application built with React (TypeScript), .NET 9 (C#), Entity Framework Core, SQLite, TailwindCSS, and open APIs. The app allows users to create, read, update and delete (CRUD) data to SQLite database, view weather forecasts with interactive graphs, calculate Fibonacci numbers and display random dog images.

---

## 📸 Screenshots

### This is an example of Weather Forecast Page
<img src="./screenshots/forecast.png" alt="Forecast sample" width="50%" />

---

## ✨ Features

- ✅ Show hourly and 7-day weather forecasts (Open-Meteo API)
- ✅ Visualize weather data with graphs (Recharts)
- ✅ Responsive and styled UI with TailwindCSS
- ✅ Data stored locally in SQLite using Entity Framework Core
- ✅ View, add, edit, and delete facts
- ✅ Calculate Fibonacci numbers
- ✅ Display random dog images (Dog CEO API)


---

## 🛠 Technologies Used

### 🔹 Frontend
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/)

### 🔹 Backend
- [.NET 9 (C#)](https://dotnet.microsoft.com/)
- [Entity Framework Core](https://learn.microsoft.com/en-us/ef/)
- [SQLite](https://www.sqlite.org/index.html)

### 🔹 APIs
- [Dog CEO API](https://dog.ceo/dog-api/)
- [Open-Meteo API](https://open-meteo.com/)

---

## 🚀 Installation & Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/reactfullstackapp.git
cd reactfullstackapp
```
2. Install frontend dependencies
```bash
cd client
npm install
```
3. Install backend dependencies
```bash
cd ../server
dotnet restore
```
4. Set up the database
```bash
dotnet ef database update
```
5. Run the application
```bash
Backend

cd server
dotnet run

Frontend

cd client
npm run dev
```
## Project Structure
```bash
/client        # React frontend (TypeScript, Vite, TailwindCSS and Recharts)
/server        # .NET 9 backend with SQLite + EF Core
/screenshots   # App screenshots for README
```
## License
This project is licensed under the MIT License.
