# Windows PowerShell script for running the Badir Blockchain Presentation locally
# Save this file as run-windows-local.ps1

Write-Host "Setting up Badir Blockchain Presentation for local Windows development..." -ForegroundColor Cyan

# Check if Node.js is installed
try {
    $nodeVersion = node -v
    Write-Host "Node.js version $nodeVersion detected" -ForegroundColor Green
} catch {
    Write-Host "Node.js is not installed or not in your PATH. Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    exit
}

# Check if npm is working properly
try {
    $npmVersion = npm -v
    Write-Host "npm version $npmVersion detected" -ForegroundColor Green
} catch {
    Write-Host "npm is not installed or not working properly" -ForegroundColor Red
    exit
}

# Install dependencies if node_modules doesn't exist
if (-not (Test-Path ".\node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
} else {
    Write-Host "Dependencies already installed" -ForegroundColor Green
}

# Set environment variables
$env:NODE_ENV = "development"

# Start the application
Write-Host "Starting Badir Blockchain Presentation..." -ForegroundColor Cyan
Write-Host "The application will be available at http://localhost:5000" -ForegroundColor Magenta
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow

# Run the server
npx tsx server/index.ts