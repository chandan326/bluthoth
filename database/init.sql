-- BlueHub PostgreSQL Database Initialization DDL

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS devices (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
    device_identifier VARCHAR(128) UNIQUE NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    display_name VARCHAR(255) NOT NULL,
    category VARCHAR(64) DEFAULT 'Other',
    sub_category VARCHAR(64) DEFAULT 'Unknown',
    favorite BOOLEAN DEFAULT FALSE,
    is_auto_reconnect BOOLEAN DEFAULT FALSE,
    battery_level INT NULL,
    signal_rssi INT NULL,
    pairing_status VARCHAR(32) DEFAULT 'unpaired',
    connection_status VARCHAR(32) DEFAULT 'disconnected',
    first_discovered TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_connected TIMESTAMP NULL
);

CREATE TABLE IF NOT EXISTS device_history (
    id VARCHAR(64) PRIMARY KEY,
    device_id VARCHAR(64) REFERENCES devices(id) ON DELETE CASCADE,
    device_name VARCHAR(255) NOT NULL,
    event_type VARCHAR(64) NOT NULL,
    details TEXT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_settings (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
    app_name VARCHAR(255) DEFAULT 'BlueHub',
    theme VARCHAR(32) DEFAULT 'dark',
    notifications BOOLEAN DEFAULT TRUE,
    auto_reconnect BOOLEAN DEFAULT TRUE
);
