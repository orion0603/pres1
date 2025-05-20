# How to Run the Badir Blockchain Presentation on Windows

## Prerequisites

1. Install Node.js (version 18 or higher recommended)
   - Download from [https://nodejs.org/](https://nodejs.org/)
   - Choose the "LTS" (Long Term Support) version
   - Follow the installation wizard instructions

2. Make sure npm is installed (comes with Node.js)

## Running the Presentation

### Option 1: Using PowerShell (Recommended)

1. Extract the project files to a folder of your choice
2. Open PowerShell as Administrator:
   - Right-click on the Start menu and select "Windows PowerShell (Admin)" or "Windows Terminal (Admin)"
   - Or press `Win + X` and select PowerShell/Terminal with Admin rights
3. Navigate to the project folder:
   ```
   cd "path\to\project\folder"
   ```
4. Set the execution policy to allow the script to run (one-time setting):
   ```
   Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
   ```
5. Run the presentation using the provided script:
   ```
   .\run-windows-local.ps1
   ```
6. If you want to use a custom port (e.g., 3000 instead of the default 5000):
   ```
   .\run-windows-local.ps1 -Port 3000
   ```

### Option 2: Using Batch File

1. Extract the project files to a folder of your choice
2. Double-click the `run-windows.bat` file
   - This will open a command prompt window where you can see the server logs
   - The presentation will automatically open in your default browser

## Accessing the Presentation

Once the script has run successfully, you'll see a message like:
```
Starting Badir Blockchain Presentation...
The application will be available at http://localhost:5000
```

1. Open your web browser (Chrome, Edge, or Firefox recommended)
2. Navigate to:
   - http://localhost:5000 (or your custom port if specified)

## Stopping the Presentation

To stop the presentation server:
1. Go back to the PowerShell/Command Prompt window
2. Press `Ctrl + C`
3. Confirm by typing `Y` and pressing Enter if prompted

## Troubleshooting

### "Port already in use" error

If you see an error that port 5000 (or your custom port) is already in use:

1. Open Command Prompt as Administrator
2. Find the process using the port:
   ```
   netstat -ano | findstr :5000
   ```
3. Note the PID (Process ID) in the last column
4. Kill the process:
   ```
   taskkill /PID <PID> /F
   ```
5. Try running the presentation again

### Node.js or npm not recognized

If you get an error that Node.js or npm is not recognized:

1. Make sure Node.js is installed properly
2. Restart your computer (sometimes needed to update PATH variables)
3. If still not working, you may need to add Node.js to your PATH manually:
   - Search for "Environment Variables" in Windows search
   - Edit the PATH variable and add the path to your Node.js installation folder

### Dependencies installation fails

If you see errors during dependency installation:

1. Try running as Administrator
2. Check your internet connection
3. Try installing with force:
   ```
   npm install --force
   ```

For any other issues, please contact the development team.