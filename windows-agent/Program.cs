using System;
using System.Text.Json;
using System.Threading.Tasks;
using BlueHubAgent.API;
using BlueHubAgent.Bluetooth;

namespace BlueHubAgent
{
    class Program
    {
        private static readonly BluetoothScanner Scanner = new BluetoothScanner();
        private static readonly DeviceManager DevManager = new DeviceManager();
        private static readonly PairingManager PairManager = new PairingManager();
        private static readonly LocalWebSocketServer Server = new LocalWebSocketServer();

        static async Task Main(string[] args)
        {
            Console.WriteLine("=================================================");
            Console.WriteLine(" BlueHub Native Windows Bluetooth Agent v1.0.4");
            Console.WriteLine(" Local IPC Port: ws://localhost:8765");
            Console.WriteLine("=================================================");

            Scanner.OnDeviceDiscovered += async (id, name, rssi) =>
            {
                var evt = new
                {
                    type = "DEVICE_DISCOVERED",
                    payload = new
                    {
                        id = id,
                        originalName = name,
                        displayName = name,
                        signal = new { rssi = rssi, bars = rssi > -50 ? 4 : rssi > -70 ? 3 : 2 }
                    },
                    timestamp = DateTime.UtcNow.ToString("o")
                };
                await Server.BroadcastAsync(JsonSerializer.Serialize(evt));
            };

            Server.OnMessageReceived += async (msg) =>
            {
                try
                {
                    using var doc = JsonDocument.Parse(msg);
                    var root = doc.RootElement;
                    string type = root.GetProperty("type").GetString() ?? "";

                    if (type == "SCAN_STARTED")
                    {
                        Scanner.StartScan();
                    }
                    else if (type == "SCAN_STOPPED")
                    {
                        Scanner.StopScan();
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"[BlueHub C# Agent] Message parse error: {ex.Message}");
                }
            };

            // Start scanner by default
            Scanner.StartScan();

            // Run WebSocket Server loop
            await Server.StartAsync("http://localhost:8765/");
        }
    }
}
