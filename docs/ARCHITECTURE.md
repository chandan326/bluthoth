# BlueHub Architecture & Technical Specification

BlueHub is designed as a modular, two-layer hybrid architecture combining a high-performance React 18 web dashboard with a native Windows Bluetooth Agent and Python/FastAPI backend.

---

## High-Level System Diagram

```text
┌─────────────────────────────────────────────────────────────┐
│                    Web Dashboard (UI)                       │
│           React 18 + Vite + Tailwind CSS + Zustand          │
└──────────────┬───────────────────────────────┬──────────────┘
               │                               │
    Local REST API                             │ Secure Local WebSocket IPC
    http://localhost:8000                      │ ws://localhost:8765
               │                               │
┌──────────────▼──────────────┐  ┌─────────────▼──────────────┐
│       FastAPI Backend       │  │    Windows Bluetooth Agent │
│   Python + SQLAlchemy ORM   │  │   .NET 8 C# / WinRT Python │
└──────────────┬──────────────┘  └─────────────┬──────────────┘
               │                               │
┌──────────────▼──────────────┐  ┌─────────────▼──────────────┐
│  SQLite / PostgreSQL DB     │  │  Windows Bluetooth Stack   │
└─────────────────────────────┘  └────────────────────────────┘
```

---

## 1. IPC Protocol Specifications (`ws://localhost:8765`)

Communication between the Web Dashboard and the Windows Bluetooth Agent uses JSON messages over WebSocket:

### Outbound Commands (UI -> Agent)
- `SCAN_STARTED`: Triggers `DeviceWatcher` discovery.
- `SCAN_STOPPED`: Stops active discovery.
- `PAIR_DEVICE`: Initiates pairing request.
- `CONNECT_DEVICE`: Attempts hardware connection.
- `DISCONNECT_DEVICE`: Terminates connection.

### Inbound Events (Agent -> UI)
- `DEVICE_DISCOVERED`: Discovered BLE or Classic device.
- `DEVICE_CONNECTED`: Connection status update.
- `BATTERY_UPDATED`: Real-time GATT battery telemetry update.
- `AGENT_STATUS_CHANGED`: Agent status update.

---

## 2. Hardware Profile & Audio Constraints

1. **A2DP Audio Output**: Windows standard sound driver architecture routes default audio output to one primary A2DP endpoint at a time. If multiple Bluetooth audio devices are connected, BlueHub provides clear UI guidance explaining how Windows handles audio endpoints.
2. **Bluetooth Classic Connections**: Standard Windows Bluetooth host controllers support up to 7 simultaneous Bluetooth Classic connections.
3. **BLE Telemetry**: Battery percentages are retrieved via standard GATT Battery Service UUID (`0x180F`).
