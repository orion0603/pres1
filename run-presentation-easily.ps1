# PowerShell script to run the Badir Blockchain Presentation without admin rights
# This script will bypass the execution policy for just this script without changing system settings

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "Found Node.js: $nodeVersion" -ForegroundColor Green
}
catch {
    Write-Host "Node.js is not installed. Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    Write-Host "Press any key to exit..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit
}

# Default port
$port = 5000

# Check if port parameter is provided
$portParam = $args[0]
if ($portParam -match "^\d+$") {
    $port = [int]$portParam
}
elseif ($args.Count -gt 0 -and $args[0] -match "-p(ort)?=?(\d+)") {
    $port = [int]$Matches[2]
}

# Set environment variables
$env:PORT = $port

Write-Host "Building and starting the Badir Blockchain Presentation on port $port..." -ForegroundColor Cyan
Write-Host "Please wait - this may take a moment to complete." -ForegroundColor Yellow

# Build the client
Write-Host "`nBuilding the client application..." -ForegroundColor Cyan
npm run build

# Start the simplified server
Write-Host "`nStarting the server..." -ForegroundColor Cyan
node run-windows-simple.mjs

# Keep terminal open
Write-Host "`nPress any key to exit..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")