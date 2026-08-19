export type DeviceCategory = 'Audio' | 'Input' | 'Mobile' | 'Other';

export type SubCategory =
  | 'Headphones'
  | 'Earbuds'
  | 'Speaker'
  | 'Keyboard'
  | 'Mouse'
  | 'Controller'
  | 'Smartphone'
  | 'Tablet'
  | 'Printer'
  | 'IoT'
  | 'Unknown';

export type PairingStatus = 'unpaired' | 'pairing' | 'paired';
export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'disconnecting';

export interface BatteryInfo {
  percentage: number | null; // null if unavailable
  level: 'high' | 'medium' | 'low' | 'unknown';
  isCharging?: boolean;
}

export interface SignalStrength {
  rssi: number | null; // e.g. -65 dBm
  bars: 1 | 2 | 3 | 4 | 0;
}

export interface BluetoothDevice {
  id: string; // Unique GUID or Bluetooth Address
  address: string; // Formatted MAC (e.g. 00:1B:44:11:3A:B7)
  originalName: string; // Windows reported hardware name
  displayName: string; // User's custom application nickname
  category: DeviceCategory;
  subCategory: SubCategory;
  pairingStatus: PairingStatus;
  connectionStatus: ConnectionStatus;
  battery: BatteryInfo;
  signal: SignalStrength;
  supportedProfiles: string[]; // e.g. ["A2DP", "HFP", "AVRCP", "HID"]
  isFavorite: boolean;
  isAutoReconnect: boolean;
  firstDiscovered: string; // ISO String
  lastConnected: string | null; // ISO String
  connectionDurationSeconds?: number;
  audioEndpointActive?: boolean; // For audio devices: current Windows default audio output
}

export interface ConnectionEventLog {
  id: string;
  deviceId: string;
  deviceName: string;
  eventType: 'connected' | 'disconnected' | 'paired' | 'unpaired' | 'connection_failed';
  timestamp: string;
  duration?: string;
  details?: string;
}

export type AgentState = 'connected' | 'connecting' | 'offline';

export interface AgentStatusInfo {
  state: AgentState;
  version: string;
  bluetoothEnabled: boolean;
  adapterName: string;
  connectedDevicesCount: number;
  lastPing: string;
}

export type ToastType = 'info' | 'success' | 'warning' | 'error';

export interface NotificationToast {
  id: string;
  title: string;
  message: string;
  type: ToastType;
  timestamp: string;
}

export interface UserSettings {
  appName: string;
  theme: 'dark' | 'light' | 'system';
  language: string;
  enableNotifications: boolean;
  autoStartAgent: boolean;
  autoReconnectFavorites: boolean;
  scanDurationSeconds: number;
  maxRetryAttempts: number;
  clearHistoryOnExit: boolean;
}

// IPC WebSocket Messages between Agent & UI
export type WsMessageType =
  | 'DEVICE_DISCOVERED'
  | 'DEVICE_PAIRED'
  | 'DEVICE_CONNECTED'
  | 'DEVICE_DISCONNECTED'
  | 'DEVICE_REMOVED'
  | 'BATTERY_UPDATED'
  | 'AGENT_STATUS_CHANGED'
  | 'SCAN_STARTED'
  | 'SCAN_STOPPED'
  | 'ERROR';

export interface WsMessage {
  type: WsMessageType;
  payload: any;
  timestamp: string;
}
