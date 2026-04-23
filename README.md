# 🚨 DisasterMesh

<p align="center">
  <b>Offline-First Emergency Communication & Rescue Coordination Network</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/ESP32-Hardware-EF4444?style=for-the-badge&labelColor=111827" />
  <img src="https://img.shields.io/badge/LoRa-Long_Range-3B82F6?style=for-the-badge&labelColor=111827" />
  <img src="https://img.shields.io/badge/React-Frontend-06B6D4?style=for-the-badge&labelColor=111827" />
  <img src="https://img.shields.io/badge/Node.js-Backend-22C55E?style=for-the-badge&labelColor=111827" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Flask-Ambulance_Service-F59E0B?style=for-the-badge&labelColor=111827" />
  <img src="https://img.shields.io/badge/SQLite-Database-0EA5E9?style=for-the-badge&labelColor=111827" />
  <img src="https://img.shields.io/badge/Status-Working_Prototype-A855F7?style=for-the-badge&labelColor=111827" />
</p>

---

## 🌍 Live Concept

<p align="center">
When networks fail, DisasterMesh keeps emergency coordination alive.
</p>

---

## 📌 Problem Statement

During floods, earthquakes, cyclones, fires, and large-scale emergencies:

* Mobile towers fail
* Internet becomes unreliable
* Ambulances lose dispatch visibility
* SOS requests get delayed
* Response time increases critically

Traditional systems break exactly when they are needed most.

---

## 🚀 Solution

DisasterMesh is an **offline-first emergency response platform** that combines:

* Real-time SOS intake
* Centralized command center
* Live ambulance coordination
* Long-range mesh communication via LoRa
* Hybrid backend synchronization

It enables faster rescue decisions even during infrastructure collapse.

---

## 🏗️ System Architecture

```text id="jpkq4r"
         ┌───────────────────────┐
         │     User / Survivor   │
         │      Sends SOS        │
         └──────────┬────────────┘
                    │
                    ▼
         ┌───────────────────────┐
         │   Command Center UI   │
         │   React Dashboard     │
         └──────────┬────────────┘
                    │
                    ▼
         ┌───────────────────────┐
         │ Node.js Main Backend  │
         │ SOS + Dispatch Logic  │
         └──────────┬────────────┘
                    │
          ┌─────────┴─────────┐
          ▼                   ▼
┌──────────────────┐   ┌──────────────────┐
│ SQLite Database  │   │ Flask Ambulance  │
│ Persistent Data  │   │ Driver Dashboard │
└──────────────────┘   └──────────────────┘
                               │
                               ▼
                     ┌──────────────────┐
                     │ Live Assignment  │
                     │ Route / Mission  │
                     └──────────────────┘
```

---

## ⚙️ Core Features

### 🚨 Centralized SOS Command Center

Monitor incoming emergencies and manage dispatch decisions.

### 🚑 Live Ambulance Dashboard

Drivers receive missions, destinations, and live updates.

### 📡 Offline-First Coordination

Supports disaster scenarios where traditional systems fail.

### 🔄 Unified Real-Time Sync

Backend keeps command center and ambulance data aligned.

### 🗄️ Persistent Storage

SQLite stores SOS records and assignment history.

### ⚡ Rapid Dispatch Flow

Assign ambulances instantly from dashboard.

---

## 🔄 Execution Flow

```text id="l1r17m"
Emergency Triggered
→ SOS Submitted
→ Command Center Receives Alert
→ Operator Selects Ambulance
→ Dispatch Sent Instantly
→ Driver Dashboard Updates
→ Ambulance Responds
```

---

## 🛠️ Tech Stack

| Layer             | Technology                |
| ----------------- | ------------------------- |
| Frontend          | React + TypeScript + Vite |
| UI                | Tailwind CSS + shadcn/ui  |
| Main Backend      | Node.js                   |
| Ambulance Service | Python Flask              |
| Database          | SQLite                    |
| Communication     | Proxy-based API Sync      |

---

## 📂 Repository Structure

```text id="y0a34m"
DisasterMesh/
├── server/                # Node.js backend
├── ambulance-dashboard/   # Flask ambulance backend
├── src/                   # React command center UI
├── docs/
├── README.md
```

---

## ⚙️ Quick Start

### 1️⃣ Start Main Backend

```bash id="0fvs8l"
cd server
npm install
npm start
```

### 2️⃣ Start Frontend

```bash id="6wzn4o"
npm install
npm run dev
```

### 3️⃣ Start Ambulance Service

```bash id="e2hljs"
cd ambulance-dashboard
pip install -r requirements.txt
python app.py
```

---

## 🌐 Default URLs

```text id="bb6gsd"
Frontend:   http://localhost:8080
Backend:    http://localhost:3000
Ambulance:  http://localhost:5000/dashboard
```

---

## 🎯 Why It Matters

```text id="hm43jg"
❌ Delayed dispatch costs lives
❌ Network failure blocks coordination
❌ Fragmented systems slow response

✅ DisasterMesh accelerates emergency rescue decisions
```

---

## 🧪 Demo Scenarios

* Submit SOS and dispatch ambulance live
* Multi-dashboard coordination
* Persistent emergency queue tracking
* Works as disaster-ready prototype system

---

## 🔮 Future Improvements

* GPS live ambulance tracking
* Multi-ambulance fleet optimization
* SMS fallback alerts
* AI priority scoring
* Cloud deployment with analytics
* Android responder app

---

Built to improve emergency response when seconds matter.
