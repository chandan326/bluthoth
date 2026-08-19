import asyncio
import json
import datetime
import subprocess
import websockets
import sys

PORT = 8765
HOST = "localhost"

CONNECTED_CLIENTS = set()

def query_windows_pnp_hardware():
    """Queries Windows WMI Win32_PNPEntity for actual physical Bluetooth devices."""
    ps_cmd = (
        'powershell -ExecutionPolicy Bypass -Command '
        '"$bt = Get-CimInstance Win32_PNPEntity | Where-Object { $_.PNPClass -eq \'Bluetooth\' -or $_.Name -like \'*Bluetooth*\' }; '
        '$res = @(); foreach($d in $bt) { if ($d.Name -and $d.Name -notlike \'*Enumerator*\' -and $d.Name -notlike \'*Protocol*\' -and $d.Name -notlike \'*Service*\') '
        '{ $res += [PSCustomObject]@{ Id=$d.DeviceID; Name=$d.Name; Status=$d.Status; Manufacturer=$d.Manufacturer } } }; '
        '$res | ConvertTo-Json -Depth 3"'
    )
    try:
        proc = subprocess.run(ps_cmd, shell=True, capture_output=True, text=True, timeout=5)
        if proc.returncode == 0 and proc.stdout.strip():
            data = json.loads(proc.stdout.strip())
            if isinstance(data, dict):
                data = [data]
            
            devices = []
            for item in data:
                name = item.get("Name", "Bluetooth Device")
                dev_id = item.get("Id", "unknown")
                if "Intel" in name or "Adapter" in name or "Radio" in name:
                    continue
                
                category = "Audio" if any(w in name.lower() for w in ["headphone", "headset", "audio", "speaker", "airpods", "sony", "jbl"]) else "Input" if any(w in name.lower() for w in ["mouse", "keyboard", "controller", "gamepad"]) else "Other"

                devices.append({
                    "id": f"pnp-{abs(hash(dev_id))}",
                    "address": dev_id.split("\\")[-1] if "\\" in dev_id else dev_id,
                    "originalName": name,
                    "displayName": name,
                    "category": category,
                    "subCategory": "Peripheral",
                    "pairingStatus": "paired" if item.get("Status") == "OK" else "unpaired",
                    "connectionStatus": "connected" if item.get("Status") == "OK" else "disconnected",
                    "battery": {"percentage": None, "level": "unknown"}, # Honest telemetry: None if driver doesn't expose GATT
                    "signal": {"rssi": None, "bars": 0},
                    "supportedProfiles": ["Classic Bluetooth", "PnP Device"],
                    "isFavorite": False,
                    "isAutoReconnect": True,
                    "firstDiscovered": datetime.datetime.now(datetime.timezone.utc).isoformat(),
                    "lastConnected": datetime.datetime.now(datetime.timezone.utc).isoformat() if item.get("Status") == "OK" else None,
                })
            return devices
    except Exception as e:
        print(f"[BlueHub Hardware Agent] PnP exception: {e}")
    return []

async def handler(websocket):
    CONNECTED_CLIENTS.add(websocket)
    print(f"[BlueHub Hardware Agent] Client connected from {websocket.remote_address}")

    real_devices = query_windows_pnp_hardware()

    # Send agent status
    status_msg = {
        "type": "AGENT_STATUS_CHANGED",
        "payload": {
            "state": "connected",
            "version": "1.0.4-win-pnp",
            "bluetoothEnabled": True,
            "adapterName": "Intel(R) Wireless Bluetooth(R)",
            "connectedDevicesCount": len(real_devices),
            "lastPing": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        },
        "timestamp": datetime.datetime.now(datetime.timezone.utc).isoformat(),
    }
    await websocket.send(json.dumps(status_msg))

    try:
        async for message in websocket:
            try:
                data = json.loads(message)
                msg_type = data.get("type")
                print(f"[BlueHub Hardware Agent] Command: {msg_type}")

                if msg_type == "SCAN_STARTED":
                    discovered = query_windows_pnp_hardware()
                    for dev in discovered:
                        evt = {
                            "type": "DEVICE_DISCOVERED",
                            "payload": dev,
                            "timestamp": datetime.datetime.now(datetime.timezone.utc).isoformat(),
                        }
                        await websocket.send(json.dumps(evt))

                elif msg_type == "AGENT_STATUS_CHANGED":
                    await websocket.send(json.dumps(status_msg))
            except Exception as e:
                print(f"[BlueHub Hardware Agent] Error: {e}")
    except websockets.exceptions.ConnectionClosed:
        pass
    finally:
        CONNECTED_CLIENTS.remove(websocket)
        print(f"[BlueHub Hardware Agent] Client disconnected.")

async def main():
    print("=================================================")
    print(" BlueHub Native Windows Bluetooth Agent (Real Hardware)")
    print(f" Local WebSocket IPC Server: ws://{HOST}:{PORT}")
    print("=================================================")

    async with websockets.serve(handler, HOST, PORT):
        await asyncio.Future()

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\n[BlueHub Hardware Agent] Terminated.")
        sys.exit(0)
