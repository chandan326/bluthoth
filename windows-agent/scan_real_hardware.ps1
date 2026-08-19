# Real Windows Bluetooth Hardware Scanner Script
[void][System.Reflection.Assembly]::LoadWithPartialName("System.Runtime.WindowsRuntime")

$winrtTypes = @(
    "Windows.Devices.Enumeration.DeviceInformation, Windows.Foundation.UniversalApiContract, ContentType = WindowsRuntime",
    "Windows.Devices.Bluetooth.BluetoothDevice, Windows.Foundation.UniversalApiContract, ContentType = WindowsRuntime",
    "Windows.Devices.Bluetooth.BluetoothLEDevice, Windows.Foundation.UniversalApiContract, ContentType = WindowsRuntime"
)

foreach ($type in $winrtTypes) {
    [void][Type]::GetType($type)
}

Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "   BlueHub Real Windows Bluetooth Scanner" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan

try {
    $selector = [Windows.Devices.Bluetooth.BluetoothDevice]::GetDeviceSelector()
    $asyncOp = [Windows.Devices.Enumeration.DeviceInformation]::FindAllAsync($selector)

    # Await WinRT Async Operation
    while ($asyncOp.Status -eq "Started") {
        Start-Sleep -Milliseconds 100
    }

    $devices = $asyncOp.GetResults()

    Write-Host "`nFound $($devices.Count) Real Physical Bluetooth Devices on this Windows PC:" -ForegroundColor Green
    
    $resultList = @()
    foreach ($d in $devices) {
        $devObj = [PSCustomObject]@{
            Id = $d.Id
            Name = if ([string]::IsNullOrWhiteSpace($d.Name)) { "Unnamed Bluetooth Device" } else { $d.Name }
            IsPaired = $d.Pairing.IsPaired
            CanPair = $d.Pairing.CanPair
        }
        $resultList += $devObj
        Write-Host " -> Name: $($devObj.Name) | Paired: $($devObj.IsPaired) | ID: $($devObj.Id)" -ForegroundColor White
    }

    $resultList | ConvertToJson -Depth 3 | Out-File -FilePath "$PSScriptRoot\real_devices.json" -Encoding utf8
    Write-Host "`nSaved real device hardware cache to real_devices.json" -ForegroundColor Green

} catch {
    Write-Host "Error scanning Bluetooth hardware: $_" -ForegroundColor Red
}
