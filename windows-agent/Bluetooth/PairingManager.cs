using System;
using System.Threading.Tasks;
using Windows.Devices.Enumeration;

namespace BlueHubAgent.Bluetooth
{
    public class PairingManager
    {
        public async Task<bool> PairDeviceAsync(string deviceId)
        {
            try
            {
                var deviceInfo = await DeviceInformation.CreateFromIdAsync(deviceId);
                if (deviceInfo != null && deviceInfo.Pairing.CanPair)
                {
                    deviceInfo.Pairing.Custom.PairingRequested += (customPairing, args) =>
                    {
                        args.Accept();
                    };

                    var result = await deviceInfo.Pairing.Custom.PairAsync(DevicePairingKinds.ConfirmOnly);
                    return result.Status == DevicePairingResultStatus.Paired;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[BlueHub C# Agent] Pairing exception: {ex.Message}");
            }
            return false;
        }
    }
}
