$env:NODE_ENV = "development"

# Create a temporary modified version of the server file
$serverContent = Get-Content -Path "server/index.ts" -Raw
$modifiedContent = $serverContent -replace 'host: "0.0.0.0"', 'host: "localhost"'
$modifiedContent | Out-File -FilePath "server/index.temp.ts" -Encoding utf8

# Run the server with the modified file
try {
    Write-Host "Starting server on localhost:5000..."
    npx tsx server/index.temp.ts
} finally {
    # Clean up temporary file
    if (Test-Path "server/index.temp.ts") {
        Remove-Item "server/index.temp.ts"
    }
}