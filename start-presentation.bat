@echo off
echo Starting Badir Blockchain Presentation...
echo.

REM Check if Node.js is installed
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
  echo Node.js is not installed or not in your PATH.
  echo Please install Node.js from https://nodejs.org/
  echo.
  pause
  exit /b 1
)

REM Check if npm is working
where npm >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
  echo npm is not installed or not working properly.
  echo Please make sure Node.js is installed correctly.
  echo.
  pause
  exit /b 1
)

REM Check if node_modules exists, if not install dependencies
if not exist "node_modules\" (
  echo Installing dependencies...
  npm install
)

REM Set environment variables
set NODE_ENV=development
set PORT=5000

echo.
echo Starting server on port %PORT%...
echo The presentation will be available at http://localhost:%PORT%
echo.
echo Starting your web browser...
timeout /t 2 > nul
start "" http://localhost:%PORT%
echo.
echo Press Ctrl+C to stop the server when done.
echo.

REM Start the server
npx tsx server/index.ts

pause