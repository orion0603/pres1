@echo off
echo ===============================================================
echo    BADIR BLOCKCHAIN PRESENTATION - WINDOWS DIRECT START
echo ===============================================================
echo.
echo Starting the Vite development server directly...
echo.

:: Set environment variables for Windows
SET NODE_ENV=development

:: Run the Vite dev server directly
cd client
npx vite

:: Keep the window open if there's an error
if %ERRORLEVEL% NEQ 0 (
  echo.
  echo Something went wrong. Please check the error message above.
  pause
)