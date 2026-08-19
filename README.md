# BlueHub — Production-Ready Windows Bluetooth Device Management Platform

**BlueHub** is a modern, professional, user-friendly, and responsive **Bluetooth Device Management Platform** for Windows.

It enables users to discover, manage, pair, and connect multiple Bluetooth devices from a centralized interface, combining a web-based responsive dashboard with a native Windows Bluetooth companion layer.

---

## Key Features

- 🔍 **Smart Device Discovery & Radar**: High-speed scanning for nearby BLE and Classic Bluetooth peripherals with animated sonar radar and signal RSSI strength meters.
- 📱 **Categorized Device Management**: Auto-categorization into **Audio** (Headphones, Earbuds, Speakers), **Input** (Keyboard, Mouse, Controller), **Mobile** (Smartphones, Tablets), and **Other** (Printers, IoT).
- 🏷️ **Application-Level Renaming**: Custom application nicknames with clear distinction between **App Nickname** and **Windows Hardware Name**.
- 🔋 **Real-Time Battery Telemetry**: Visual gauges with High, Medium, Low, and Charging status badges.
- ⚡ **Quick Reconnect & Favorites**: Single-click connection to recently used peripherals with priority auto-reconnect preferences.
- 🎧 **Dedicated Audio Endpoint Manager**: Profile detection (A2DP, HFP, LE Audio) and simultaneous audio playback hardware restriction warnings.
- 📜 **Connection History Audit Logs**: Detailed event logs recording timestamps, duration, and pairing statuses.
- 🌙 **Dark & Light Themes**: Responsive design with system mode, dark theme, and fluid micro-animations.
- 🧪 **Interactive Demo Mode**: Built-in realistic hardware simulation engine allowing full UI exploration without needing live Bluetooth hardware.

---

## Tech Architecture Overview

| Component | Technology Stack | Description |
| :--- | :--- | :--- |
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, Zustand | Web-based responsive dashboard & UI |
| **Backend API** | FastAPI, Python, SQLAlchemy, SQLite / PostgreSQL | User preferences, REST endpoints & WebSockets |
| **Windows Agent** | .NET 8 C# / Python WinRT Companion | Low-level `Windows.Devices.Bluetooth` hardware control |

---

## Quick Start Guide

### 1. Run Web Dashboard

```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Run Backend API

```bash
cd backend
py -m pip install -r requirements.txt
py run.py
```
FastAPI runs on [http://localhost:8000](http://localhost:8000) (API Docs at `/docs`).

### 3. Run Native Windows Bluetooth Agent

#### Option A: Python WinRT Companion (Zero Compile)
```bash
py windows-agent/python_agent.py
```

#### Option B: C# .NET 8 Binary
```bash
cd windows-agent
dotnet run -c Release
```

Or double-click `windows-agent/run_agent.bat`.

---

## Project Structure

```text
bluehub/
├── frontend/             # React 18 + Vite + Tailwind CSS Web Application
│   ├── src/
│   │   ├── components/   # UI Cards, Navbar, Sidebar, Modals, Radar Scan
│   │   ├── pages/        # LandingPage, Dashboard, Devices, Audio, Settings
│   │   ├── store/        # Zustand global state store
│   │   ├── services/     # WebSocket IPC & REST API client
│   │   └── types/        # TypeScript Bluetooth schemas
├── backend/              # FastAPI Backend API & SQLAlchemy ORM
│   ├── app/
│   │   ├── api/          # REST Endpoints (/api/devices, /api/history, /api/agent)
│   │   ├── models/       # Database ORM models
│   │   └── websocket/    # WebSocket manager
├── windows-agent/        # Native Windows Bluetooth Integration Layer
│   ├── Bluetooth/        # C# BluetoothScanner, DeviceManager, PairingManager
│   ├── API/              # C# WebSocket server (ws://localhost:8765)
│   ├── python_agent.py   # Standalone Python WinRT companion
│   └── run_agent.bat     # Windows launcher batch script
├── database/             # PostgreSQL init scripts
├── docs/                 # Architecture specifications
└── README.md
```

---

## License

Created for Windows Bluetooth Device Management. Released under MIT License.
