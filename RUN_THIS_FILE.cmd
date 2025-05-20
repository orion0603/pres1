@echo off
echo ===============================================================
echo    BADIR BLOCKCHAIN PRESENTATION - WINDOWS QUICK START
echo ===============================================================
echo.
echo Starting presentation, please wait...
echo.

:: Check if Node.js is installed
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
  echo ERROR: Node.js is not installed!
  echo Please install Node.js from https://nodejs.org/
  echo.
  pause
  exit /b 1
)

:: Check for any command-line arguments for port
set PORT=5000
if not "%1"=="" (
  set PORT=%1
)

:: Run the presentation using the ES module script
node run-windows-simple.mjs

:: Keep the window open if there's an error
if %ERRORLEVEL% NEQ 0 (
  echo.
  echo Something went wrong. Please check the error message above.
  pause
)