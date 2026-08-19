from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class DeviceBase(BaseModel):
    device_identifier: str
    original_name: str
    display_name: str
    category: str = "Other"
    sub_category: str = "Unknown"
    favorite: bool = False
    is_auto_reconnect: bool = False
    battery_level: Optional[int] = None
    signal_rssi: Optional[int] = None
    pairing_status: str = "unpaired"
    connection_status: str = "disconnected"

class DeviceCreate(DeviceBase):
    pass

class DeviceUpdate(BaseModel):
    display_name: Optional[str] = None
    favorite: Optional[bool] = None
    is_auto_reconnect: Optional[bool] = None
    connection_status: Optional[str] = None

class DeviceResponse(DeviceBase):
    id: str
    first_discovered: datetime
    last_connected: Optional[datetime] = None

    class Config:
        from_attributes = True

class HistoryResponse(BaseModel):
    id: str
    device_id: Optional[str] = None
    device_name: str
    event_type: str
    details: Optional[str] = None
    timestamp: datetime

    class Config:
        from_attributes = True

class AgentStatusResponse(BaseModel):
    state: str
    version: str
    bluetooth_enabled: bool
    adapter_name: str
    connected_devices_count: int
