@echo off
color 0A
echo ===============================================================
echo    BADIR BLOCKCHAIN PRESENTATION - WINDOWS LAUNCHER
echo ===============================================================
echo.
echo This launcher is designed specifically for Windows systems.
echo.

:: Detect Node.js
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
  echo [ERROR] Node.js is not installed!
  echo Please install Node.js from https://nodejs.org/
  echo.
  pause
  exit /b 1
)

:: Check if Vite is available
where npx >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
  echo [ERROR] NPX is not available. Your Node.js installation may be incomplete.
  pause
  exit /b 1
)

echo [INFO] First, we'll install all required dependencies...
npm install
if %ERRORLEVEL% NEQ 0 (
  echo [WARNING] There were some issues with dependency installation.
  echo The presentation may still work, so we'll continue.
)

echo.
echo [INFO] Starting the presentation in development mode...
echo.
echo When the server starts, open your browser and visit:
echo http://localhost:5173
echo.
echo Press Ctrl+C to stop the server when you're finished.
echo.
echo Starting...

:: Change directory to client folder
cd client

:: Set environment variables Windows-style
set NODE_ENV=development

:: Run Vite directly (bypassing the npm script)
npx vite --port 5173

:: If the server exits with an error
if %ERRORLEVEL% NEQ 0 (
  echo.
  echo [ERROR] The server encountered an error.
  echo.
  echo You can try the following:
  echo 1. Make sure no other application is using port 5173
  echo 2. Try running with a different port: npx vite --port 8080
  echo.
)

pause