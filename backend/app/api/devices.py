import uuid
import datetime
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.models import Device, DeviceHistory
from app.schemas.schemas import DeviceResponse, DeviceCreate, DeviceUpdate, HistoryResponse, AgentStatusResponse

router = APIRouter(prefix="/api", tags=["devices"])

# Pre-populate database with default mock devices if empty
def seed_devices_if_empty(db: Session):
    if db.query(Device).count() == 0:
        sample_devices = [
            Device(
                id="bt-001",
                device_identifier="00:1B:44:11:3A:B7",
                original_name="Sony WH-1000XM5",
                display_name="Sony Headphones",
                category="Audio",
                sub_category="Headphones",
                favorite=True,
                is_auto_reconnect=True,
                battery_level=78,
                signal_rssi=-45,
                pairing_status="paired",
                connection_status="connected",
                last_connected=datetime.datetime.utcnow(),
            ),
            Device(
                id="bt-002",
                device_identifier="F4:D4:88:52:9C:10",
                original_name="Logitech MX Master 3S",
                display_name="Work Mouse",
                category="Input",
                sub_category="Mouse",
                favorite=True,
                is_auto_reconnect=True,
                battery_level=65,
                signal_rssi=-52,
                pairing_status="paired",
                connection_status="connected",
                last_connected=datetime.datetime.utcnow(),
            ),
            Device(
                id="bt-003",
                device_identifier="7C:D1:C3:99:A2:4E",
                original_name="Keychron K2 Wireless",
                display_name="Mechanical Keyboard",
                category="Input",
                sub_category="Keyboard",
                favorite=True,
                is_auto_reconnect=True,
                battery_level=90,
                signal_rssi=-48,
                pairing_status="paired",
                connection_status="connected",
                last_connected=datetime.datetime.utcnow(),
            ),
        ]
        db.add_all(sample_devices)
        db.commit()

@router.get("/devices", response_model=List[DeviceResponse])
def get_devices(db: Session = Depends(get_db)):
    seed_devices_if_empty(db)
    return db.query(Device).all()

@router.get("/devices/connected", response_model=List[DeviceResponse])
def get_connected_devices(db: Session = Depends(get_db)):
    return db.query(Device).filter(Device.connection_status == "connected").all()

@router.get("/devices/favorites", response_model=List[DeviceResponse])
def get_favorite_devices(db: Session = Depends(get_db)):
    return db.query(Device).filter(Device.favorite == True).all()

@router.get("/devices/history", response_model=List[HistoryResponse])
def get_history(db: Session = Depends(get_db)):
    return db.query(DeviceHistory).order_by(DeviceHistory.timestamp.desc()).all()

@router.delete("/history")
def clear_history(db: Session = Depends(get_db)):
    db.query(DeviceHistory).delete()
    db.commit()
    return {"status": "cleared"}

@router.get("/devices/{device_id}", response_model=DeviceResponse)
def get_device(device_id: str, db: Session = Depends(get_db)):
    device = db.query(Device).filter(Device.id == device_id).first()
    if not device:
        raise HTTPException(status_code=404, detail="Device not found")
    return device

@router.post("/devices/scan")
def scan_devices():
    return {"status": "scan_initiated", "message": "Radar scan command sent to agent."}

@router.post("/devices/{device_id}/pair")
def pair_device(device_id: str, db: Session = Depends(get_db)):
    device = db.query(Device).filter(Device.id == device_id).first()
    if not device:
        raise HTTPException(status_code=404, detail="Device not found")
    device.pairing_status = "paired"
    db.commit()
    return {"status": "paired", "device_id": device_id}

@router.post("/devices/{device_id}/connect")
def connect_device(device_id: str, db: Session = Depends(get_db)):
    device = db.query(Device).filter(Device.id == device_id).first()
    if not device:
        raise HTTPException(status_code=404, detail="Device not found")
    device.connection_status = "connected"
    device.last_connected = datetime.datetime.utcnow()

    # Log event
    log = DeviceHistory(
        id=str(uuid.uuid4()),
        device_id=device.id,
        device_name=device.display_name,
        event_type="connected",
        details="Connected via API endpoint",
    )
    db.add(log)
    db.commit()
    return {"status": "connected", "device_id": device_id}

@router.post("/devices/{device_id}/disconnect")
def disconnect_device(device_id: str, db: Session = Depends(get_db)):
    device = db.query(Device).filter(Device.id == device_id).first()
    if not device:
        raise HTTPException(status_code=404, detail="Device not found")
    device.connection_status = "disconnected"

    log = DeviceHistory(
        id=str(uuid.uuid4()),
        device_id=device.id,
        device_name=device.display_name,
        event_type="disconnected",
        details="Disconnected via API endpoint",
    )
    db.add(log)
    db.commit()
    return {"status": "disconnected", "device_id": device_id}

@router.patch("/devices/{device_id}", response_model=DeviceResponse)
def update_device(device_id: str, payload: DeviceUpdate, db: Session = Depends(get_db)):
    device = db.query(Device).filter(Device.id == device_id).first()
    if not device:
        raise HTTPException(status_code=404, detail="Device not found")
    
    if payload.display_name is not None:
        device.display_name = payload.display_name
    if payload.favorite is not None:
        device.favorite = payload.favorite
    if payload.is_auto_reconnect is not None:
        device.is_auto_reconnect = payload.is_auto_reconnect
    if payload.connection_status is not None:
        device.connection_status = payload.connection_status

    db.commit()
    db.refresh(device)
    return device

@router.delete("/devices/{device_id}")
def forget_device(device_id: str, db: Session = Depends(get_db)):
    device = db.query(Device).filter(Device.id == device_id).first()
    if not device:
        raise HTTPException(status_code=404, detail="Device not found")
    db.delete(device)
    db.commit()
    return {"status": "forgotten", "device_id": device_id}

@router.get("/agent/status", response_model=AgentStatusResponse)
def get_agent_status():
    return {
        "state": "connected",
        "version": "1.0.4-win",
        "bluetooth_enabled": True,
        "adapter_name": "Intel(R) Wireless Bluetooth(R)",
        "connected_devices_count": 4,
    }
