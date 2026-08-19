const API_BASE = '/api';

export const apiService = {
  async getDevices() {
    try {
      const res = await fetch(`${API_BASE}/devices`);
      if (!res.ok) throw new Error('Failed to fetch devices');
      return await res.json();
    } catch (err) {
      console.warn('[API Service] Backend unavailable, using local store data:', err);
      return null;
    }
  },

  async scanDevices() {
    try {
      const res = await fetch(`${API_BASE}/devices/scan`, { method: 'POST' });
      return await res.json();
    } catch (err) {
      return { status: 'mock_scan' };
    }
  },

  async pairDevice(id: string) {
    try {
      const res = await fetch(`${API_BASE}/devices/${id}/pair`, { method: 'POST' });
      return await res.json();
    } catch (err) {
      return { status: 'mock_paired' };
    }
  },

  async connectDevice(id: string) {
    try {
      const res = await fetch(`${API_BASE}/devices/${id}/connect`, { method: 'POST' });
      return await res.json();
    } catch (err) {
      return { status: 'mock_connected' };
    }
  },

  async disconnectDevice(id: string) {
    try {
      const res = await fetch(`${API_BASE}/devices/${id}/disconnect`, { method: 'POST' });
      return await res.json();
    } catch (err) {
      return { status: 'mock_disconnected' };
    }
  },

  async renameDevice(id: string, displayName: string) {
    try {
      const res = await fetch(`${API_BASE}/devices/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ display_name: displayName }),
      });
      return await res.json();
    } catch (err) {
      return { status: 'mock_renamed' };
    }
  },

  async getHistory() {
    try {
      const res = await fetch(`${API_BASE}/devices/history`);
      if (!res.ok) throw new Error('Failed to fetch history');
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  async getAgentStatus() {
    try {
      const res = await fetch(`${API_BASE}/agent/status`);
      if (!res.ok) throw new Error('Failed to fetch agent status');
      return await res.json();
    } catch (err) {
      return null;
    }
  },
};
