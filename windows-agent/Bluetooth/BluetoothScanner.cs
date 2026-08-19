using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Windows.Devices.Enumeration;
using Windows.Devices.Bluetooth;

namespace BlueHubAgent.Bluetooth
{
    public class BluetoothScanner
    {
        private DeviceWatcher? _deviceWatcher;
        public event Action<string, string, int>? OnDeviceDiscovered;

        public void StartScan()
        {
            if (_deviceWatcher != null)
            {
                _deviceWatcher.Stop();
            }

            // Query selector for Bluetooth LE and Classic devices
            string selector = "(System.Devices.Aep.ProtocolId:=\"{bb42670d-4a23-4e58-8541-998923b3853d}\") OR (System.Devices.Aep.ProtocolId:=\"{e0cbf06c-cd8b-4647-bb8a-263b43f0f974}\")";
            string[] requestedProperties = { "System.Devices.Aep.DeviceAddress", "System.Devices.Aep.IsConnected", "System.Devices.Aep.Bluetooth.IssueInquiry", "System.Devices.Aep.SignalStrength" };

            _deviceWatcher = DeviceInformation.CreateWatcher(
                selector,
                requestedProperties,
                DeviceInformationKind.AssociationEndpoint
            );

            _deviceWatcher.Added += (watcher, deviceInfo) =>
            {
                int rssi = deviceInfo.Properties.ContainsKey("System.Devices.Aep.SignalStrength") && deviceInfo.Properties["System.Devices.Aep.SignalStrength"] != null
                    ? Convert.ToInt32(deviceInfo.Properties["System.Devices.Aep.SignalStrength"])
                    : -60;

                string name = string.IsNullOrEmpty(deviceInfo.Name) ? "Unknown Bluetooth Device" : deviceInfo.Name;
                OnDeviceDiscovered?.Invoke(deviceInfo.Id, name, rssi);
            };

            _deviceWatcher.Start();
            Console.WriteLine("[BlueHub C# Agent] Bluetooth DeviceWatcher started scanning...");
        }

        public void StopScan()
        {
            if (_deviceWatcher != null)
            {
                _deviceWatcher.Stop();
                _deviceWatcher = null;
                Console.WriteLine("[BlueHub C# Agent] Bluetooth DeviceWatcher stopped.");
            }
        }
    }
}
