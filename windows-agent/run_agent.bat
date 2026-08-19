@echo off
title BlueHub Windows Bluetooth Agent Launcher
cls
echo =======================================================
echo          BlueHub Windows Bluetooth Agent Launcher
echo =======================================================
echo.

:: Check if python is available
where py >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [Launcher] Found Python launcher. Starting Python WinRT Agent...
    py windows-agent\python_agent.py
    goto end
)

where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [Launcher] Found Python executable. Starting Python WinRT Agent...
    python windows-agent\python_agent.py
    goto end
)

:: Check if dotnet CLI is available
where dotnet >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [Launcher] Found .NET SDK. Building & Running C# BlueHubAgent...
    cd windows-agent
    dotnet run -c Release
    goto end
)

echo [Error] Neither Python nor .NET SDK found in system PATH.
echo Please install Python 3.10+ or .NET 8.0 SDK to run the Windows Bluetooth Agent.
pause

:end
