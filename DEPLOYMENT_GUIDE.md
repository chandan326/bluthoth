# BlueHub Enterprise Windows Deployment Guide

This guide outlines step-by-step instructions for IT administrators to deploy **BlueHub** as a live, production-grade Bluetooth management platform across company Windows workstations.

---

## 🏗️ Enterprise Architecture Setup

```text
┌──────────────────────────────────────────────────────────────┐
│                    Company Workstation                       │
│                                                              │
│  ┌────────────────────────┐      ┌────────────────────────┐  │
│  │   BlueHub Web UI       │      │  FastAPI Backend API   │  │
│  │ http://localhost:3000  ├─────►│ http://localhost:8000  │  │
│  └───────────┬────────────┘      └────────────────────────┘  │
│              │                                               │
│              │ Secure Local IPC                              │
│              ▼ ws://localhost:8765                           │
│  ┌────────────────────────────────────────────────────────┐  │
│  │   BlueHub Native Windows Bluetooth Agent (Service)     │  │
│  └───────────────────────────┬────────────────────────────┘  │
│                              │ WinRT / PnP Driver            │
│                              ▼                               │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Physical Windows Adapter: Intel(R) Wireless Bluetooth │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

---

## 1. Environment Requirements

- **Operating System**: Windows 10 (Version 19041+) or Windows 11
- **Hardware**: Built-in or USB Bluetooth Adapter (Intel, Realtek, Qualcomm, Broadcom)
- **Runtime**: Python 3.10+ (or .NET 8 SDK for compiled C# binary)

---

## 2. Live Hardware Agent Installation

Run the PowerShell installer to verify hardware radios and register auto-start:

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force
.\windows-agent\setup.ps1
```

To start the real hardware agent immediately in background:
```powershell
py windows-agent\python_agent.py
```

The agent binds strictly to `ws://localhost:8765` for zero zero-trust internal network exposure.

---

## 3. Registering Agent as an Automatic Windows Service

To ensure the Windows Bluetooth Agent starts automatically when employees log in:

```powershell
$action = New-ScheduledTaskAction -Execute "py" -Argument "C:\Users\chand\Desktop\mini project\bluthoth\windows-agent\python_agent.py"
$trigger = New-ScheduledTaskTrigger -AtLogOn
Register-ScheduledTask -TaskName "BlueHubAgent" -Action $action -Trigger $trigger -RunLevel Highest
```

---

## 4. Production Web Dashboard Deployment

### Option A: Node Dev/Local Host (Port 3000)
```bash
cd frontend
npm run dev -- --host 0.0.0.0 --port 3000
```

### Option B: IIS / Nginx Production Build
The optimized production bundle is located in `frontend/dist`. Point your internal IIS or Nginx site root to `frontend/dist`.

---

## 5. Security & Data Isolation Policy

- **Zero External Telemetry**: All Bluetooth MAC addresses, PIN authentication, and RSSI metrics remain strictly inside the local machine memory.
- **Local IPC Isolation**: WebSockets listen exclusively on loopback interfaces (`127.0.0.1` / `localhost`).
