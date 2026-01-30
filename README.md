# RES-QUEUE

RES-QUEUE is an emergency response and ambulance dispatch system that enables real-time SOS handling, centralized command control, and live ambulance coordination.

---

## 🚀 Features

- Centralized **Command Center** for SOS management
- **Ambulance Dashboard** for drivers with live route and target updates
- Unified backend to keep SOS assignments and ambulance locations in sync
- Real-time dispatch from command center to ambulance
- SQLite-based persistent storage
- Proxy-based communication to avoid CORS issues

---

## 🛠 Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn-ui

### Backend
- Node.js (Command Center backend)
- Python Flask (Ambulance service)
- SQLite

---

## 📂 Project Structure (High Level)

```

RES-QUEUE/
├── server/                     # Node.js backend
├── ambulance login - Copy/     # Flask ambulance backend
├── src/                        # React frontend (Command Center)
├── start-ambulance.bat
├── start-ambulance.sh
└── README.md

````

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- npm
- Python 3.9+
- pip

---

## 🔧 Backend Setup (Unified Server)

### 1️⃣ Start Node.js Backend
```bash
cd server
npm install
npm start
````

Backend runs at:

```
http://localhost:3000
```

Or from project root:

```bash
npm run start:backend
```

---

### 2️⃣ Start Command Center (Frontend)

```bash
npm install
npm run dev
```

Open:

```
http://localhost:8080
```

> `/api` requests are automatically proxied to the backend.

---

## 🚑 Ambulance Dashboard Setup

### 1️⃣ Install Python Dependencies

```bash
cd "ambulance login - Copy"
pip install -r requirements.txt
```

(If `pip` fails, try `pip3` or `python -m pip`)

---

### 2️⃣ Start Flask Ambulance Backend

```bash
python app.py
```

Flask runs at:

```
http://localhost:5000
```

---

### 3️⃣ Quick Start (Recommended)

* **Windows:** Double-click `start-ambulance.bat`
* **Mac/Linux:**

  ```bash
  ./start-ambulance.sh
  ```

---

## 📡 Dispatch Flow (Command Center → Ambulance)

1. Start **ambulance backend first** (Flask must be running).
2. Start **command center frontend**.
3. Select an SOS with a pinned location.
4. Open **SOS Actions** → Click **Dispatch**.
5. The ambulance dashboard receives the mission instantly.

Ambulance dashboard:

```
http://localhost:5000/dashboard
```

---

## 🗄 Database

* SQLite database file: `sos.db`
* Stored inside backend directory
* Contains SOS records and assignment data

---

## 🌍 Environment Configuration

To change backend URLs, create a `.env` file:

```env
VITE_API_URL=http://localhost:3000
VITE_AMBULANCE_APP_URL=http://localhost:5000
```

See `.env.example` for reference.

---

## ✏️ Development Notes

* Backend and dashboards share a single data source for consistency
* Vite proxy is used to avoid CORS during dispatch
* Designed for extensibility (multiple ambulances, real-time tracking)

---

## 📌 Future Enhancements

* Live GPS tracking
* Role-based authentication
* Notification system
* Cloud database support
* Mobile-first ambulance UI

---

## 📄 License

This project is for academic and prototype purposes. Licensing can be added as required.

```

---

## ✅ What I Can Do Next (Recommended)
- 🔥 Optimize this README for **hackathons / placements**
- 📁 Suggest **best folder cleanup**
- 🧹 Add proper `.gitignore`
- 🚀 Help you **push this cleanly from VS Code**
- 🧠 Write a **project explanation** for interviews

Just tell me 👉 **what’s next** 😄
```
