import { useBluetoothStore } from '../store/bluetoothStore';
import { WsMessage } from '../types/bluetooth';

class AgentSocketService {
  private ws: WebSocket | null = null;
  private reconnectInterval: any = null;
  private url = 'ws://localhost:8765';

  connect() {
    if (this.ws && (this.ws.readyState === WebSocket.CONNECTING || this.ws.readyState === WebSocket.OPEN)) {
      return;
    }

    try {
      this.ws = new WebSocket(this.url);

      this.ws.onopen = () => {
        console.log('[BlueHub Agent Socket] Connected to native Windows Bluetooth Agent.');
        const store = useBluetoothStore.getState();
        store.setAgentStatus({ state: 'connected' });
        store.addToast('Agent Connected', 'Live Windows Bluetooth Agent is online.', 'success');

        if (this.reconnectInterval) {
          clearInterval(this.reconnectInterval);
          this.reconnectInterval = null;
        }

        // Send ping/handshake
        this.send({ type: 'AGENT_STATUS_CHANGED', payload: {}, timestamp: new Date().toISOString() });
      };

      this.ws.onmessage = (event) => {
        try {
          const msg: WsMessage = JSON.parse(event.data);
          this.handleIncomingMessage(msg);
        } catch (e) {
          console.error('[BlueHub Agent Socket] Failed to parse message:', e);
        }
      };

      this.ws.onerror = () => {
        console.log('[BlueHub Agent Socket] Agent offline. Falling back to Demo Mode.');
      };

      this.ws.onclose = () => {
        const store = useBluetoothStore.getState();
        if (store.agentStatus.state === 'connected') {
          store.setAgentStatus({ state: 'offline' });
          store.addToast('Agent Offline', 'Windows Bluetooth Agent disconnected. Demo Mode active.', 'warning');
        }
        this.scheduleReconnect();
      };
    } catch (e) {
      this.scheduleReconnect();
    }
  }

  private scheduleReconnect() {
    if (!this.reconnectInterval) {
      this.reconnectInterval = setInterval(() => {
        const store = useBluetoothStore.getState();
        if (!store.isDemoMode) {
          this.connect();
        }
      }, 5000);
    }
  }

  send(msg: WsMessage) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(msg));
    }
  }

  private handleIncomingMessage(msg: WsMessage) {
    const store = useBluetoothStore.getState();
    switch (msg.type) {
      case 'DEVICE_DISCOVERED':
        // Update device in store
        break;
      case 'BATTERY_UPDATED':
        // Update battery info
        break;
      case 'AGENT_STATUS_CHANGED':
        store.setAgentStatus(msg.payload);
        break;
      default:
        break;
    }
  }
}

export const agentSocket = new AgentSocketService();
