using System;
using System.Threading.Tasks;
using Windows.Devices.Bluetooth;
using Windows.Devices.Radios;

namespace BlueHubAgent.Bluetooth
{
    public class DeviceManager
    {
        public async Task<bool> IsBluetoothEnabledAsync()
        {
            try
            {
                var radios = await Radio.GetRadiosAsync();
                foreach (var radio in radios)
                {
                    if (radio.Kind == RadioKind.Bluetooth)
                    {
                        return radio.State == RadioState.On;
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[BlueHub C# Agent] Error checking radio state: {ex.Message}");
            }
            return true;
        }

        public async Task<bool> ConnectDeviceAsync(string deviceId)
        {
            try
            {
                var device = await BluetoothLEDevice.FromIdAsync(deviceId);
                if (device != null)
                {
                    // Accessing GATT services initiates low-level BLE connection
                    var gattResult = await device.GetGattServicesAsync();
                    return gattResult.Status == Windows.Devices.Bluetooth.GenericAttributeProfile.GattCommunicationStatus.Success;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[BlueHub C# Agent] Connect error for {deviceId}: {ex.Message}");
            }
            return false;
        }
    }
}
