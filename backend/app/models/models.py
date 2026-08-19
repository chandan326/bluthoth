import datetime
from sqlalchemy import Column, String, Integer, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    devices = relationship("Device", back_populates="user", cascade="all, delete-orphan")
    settings = relationship("UserSetting", back_populates="user", uselist=False, cascade="all, delete-orphan")

class Device(Base):
    __tablename__ = "devices"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"), nullable=True)
    device_identifier = Column(String, unique=True, index=True, nullable=False)
    original_name = Column(String, nullable=False)
    display_name = Column(String, nullable=False)
    category = Column(String, default="Other")
    sub_category = Column(String, default="Unknown")
    favorite = Column(Boolean, default=False)
    is_auto_reconnect = Column(Boolean, default=False)
    battery_level = Column(Integer, nullable=True)
    signal_rssi = Column(Integer, nullable=True)
    pairing_status = Column(String, default="unpaired")
    connection_status = Column(String, default="disconnected")
    first_discovered = Column(DateTime, default=datetime.datetime.utcnow)
    last_connected = Column(DateTime, nullable=True)

    user = relationship("User", back_populates="devices")
    history = relationship("DeviceHistory", back_populates="device", cascade="all, delete-orphan")

class DeviceHistory(Base):
    __tablename__ = "device_history"

    id = Column(String, primary_key=True, index=True)
    device_id = Column(String, ForeignKey("devices.id"), nullable=True)
    device_name = Column(String, nullable=False)
    event_type = Column(String, nullable=False)
    details = Column(Text, nullable=True)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

    device = relationship("Device", back_populates="history")

class UserSetting(Base):
    __tablename__ = "user_settings"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"), nullable=True)
    app_name = Column(String, default="BlueHub")
    theme = Column(String, default="dark")
    notifications = Column(Boolean, default=True)
    auto_reconnect = Column(Boolean, default=True)

    user = relationship("User", back_populates="settings")
