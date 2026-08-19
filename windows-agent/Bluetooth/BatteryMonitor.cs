using System;
using System.Threading.Tasks;
using Windows.Devices.Bluetooth;
using Windows.Devices.Bluetooth.GenericAttributeProfile;

namespace BlueHubAgent.Bluetooth
{
    public class BatteryMonitor
    {
        // Standard Bluetooth SIG GATT Battery Service UUID
        private static readonly Guid BatteryServiceUuid = Guid.Parse("0000180f-0000-1000-8000-00805f9b34fb");
        private static readonly Guid BatteryLevelCharUuid = Guid.Parse("00002a19-0000-1000-8000-00805f9b34fb");

        public async Task<int?> ReadBatteryLevelAsync(BluetoothLEDevice device)
        {
            try
            {
                var servicesResult = await device.GetGattServicesForUuidAsync(BatteryServiceUuid);
                if (servicesResult.Status == GattCommunicationStatus.Success && servicesResult.Services.Count > 0)
                {
                    var service = servicesResult.Services[0];
                    var charResult = await service.GetCharacteristicsForUuidAsync(BatteryLevelCharUuid);
                    if (charResult.Status == GattCommunicationStatus.Success && charResult.Characteristics.Count > 0)
                    {
                        var characteristic = charResult.Characteristics[0];
                        var readResult = await characteristic.ReadValueAsync();
                        if (readResult.Status == GattCommunicationStatus.Success)
                        {
                            var reader = Windows.Storage.Streams.DataReader.FromBuffer(readResult.Value);
                            return reader.ReadByte();
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[BlueHub C# Agent] Battery read error: {ex.Message}");
            }
            return null;
        }
    }
}
