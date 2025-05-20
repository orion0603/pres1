@echo off
echo ===============================================================
echo    BADIR BLOCKCHAIN PRESENTATION - CLIENT ONLY
echo ===============================================================
echo.
echo Starting the presentation client, please wait...
echo.

:: Change to the client directory
cd client

:: Check if Node.js is installed
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
  echo ERROR: Node.js is not installed!
  echo Please install Node.js from https://nodejs.org/
  echo.
  pause
  exit /b 1
)

:: Run the development server with Vite
npm run dev

:: Keep the window open if there's an error
if %ERRORLEVEL% NEQ 0 (
  echo.
  echo Something went wrong. Please check the error message above.
  pause
)