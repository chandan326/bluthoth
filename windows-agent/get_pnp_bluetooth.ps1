$btDevices = Get-CimInstance Win32_PNPEntity | Where-Object { $_.PNPClass -eq "Bluetooth" -or $_.Name -like "*Bluetooth*" }
$list = @()

foreach ($dev in $btDevices) {
    if ($dev.Name -and $dev.Name -notlike "*Enumerator*" -and $dev.Name -notlike "*Adapter*" -and $dev.Name -notlike "*Radio*" -and $dev.Name -notlike "*Protocol*") {
        $list += [PSCustomObject]@{
            Id = $dev.DeviceID
            Name = $dev.Name
            Status = $dev.Status
            Manufacturer = $dev.Manufacturer
        }
    }
}

$list | ConvertTo-Json -Depth 3 | Out-File -FilePath "$PSScriptRoot\pnp_bluetooth_devices.json" -Encoding utf8
Write-Host "Found $($list.Count) paired Bluetooth devices on system!"
