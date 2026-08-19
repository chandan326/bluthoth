# BlueHub Windows Agent Setup & Verification Script
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host " BlueHub Windows Bluetooth Agent Setup & Verification" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan

# Check Bluetooth Service
$btService = Get-Service -Name "bthserv" -ErrorAction SilentlyContinue

if ($btService) {
    Write-Host "[Check] Windows Bluetooth Service (bthserv) Status: $($btService.Status)" -ForegroundColor Green
    if ($btService.Status -ne "Running") {
        Write-Host "[Action] Starting Windows Bluetooth Service..." -ForegroundColor Yellow
        Start-Service -Name "bthserv"
    }
} else {
    Write-Host "[Warning] Could not locate Windows Bluetooth Service (bthserv)." -ForegroundColor Red
}

# Check Python environment
if (Get-Command py -ErrorAction SilentlyContinue) {
    Write-Host "[Check] Python Launcher available: $(py --version)" -ForegroundColor Green
} elseif (Get-Command python -ErrorAction SilentlyContinue) {
    Write-Host "[Check] Python available: $(python --version)" -ForegroundColor Green
} else {
    Write-Host "[Notice] Python executable not found on PATH." -ForegroundColor Yellow
}

# Check .NET SDK environment
if (Get-Command dotnet -ErrorAction SilentlyContinue) {
    Write-Host "[Check] .NET SDK available: $(dotnet --version)" -ForegroundColor Green
} else {
    Write-Host "[Notice] .NET SDK executable not found on PATH." -ForegroundColor Yellow
}

Write-Host "`nSetup verification complete! To start the agent, run:" -ForegroundColor Cyan
Write-Host "  .\windows-agent\run_agent.bat" -ForegroundColor White
