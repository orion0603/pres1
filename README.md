# Badir Blockchain Donation Platform Presentation

An interactive web-based educational presentation on blockchain security and donation technologies.

## Running the Presentation Locally

### Windows

#### Using PowerShell (Recommended)

1. Make sure you have [Node.js](https://nodejs.org/) installed (version 18+ recommended)
2. Open PowerShell in the project directory
3. Run the provided PowerShell script:

```powershell
.\run-windows-local.ps1
```

You can specify a custom port if needed:

```powershell
.\run-windows-local.ps1 -Port 3000
```

#### Using Batch File

Alternatively, you can use the batch file:

```
run-windows.bat
```

### macOS and Linux

1. Make sure you have [Node.js](https://nodejs.org/) installed (version 18+ recommended)
2. Open Terminal in the project directory
3. Install dependencies (first time only):

```bash
npm install
```

4. Start the presentation:

```bash
NODE_ENV=development npx tsx server/index.ts
```

Or to specify a custom port:

```bash
PORT=3000 NODE_ENV=development npx tsx server/index.ts
```

## Accessing the Presentation

Once running, the presentation will be available at:

- Default: [http://localhost:5000](http://localhost:5000)
- Custom port: http://localhost:YOUR_PORT_NUMBER

## Presentation Navigation

- Use the navigation dots at the bottom of each slide to jump between sections
- Arrow keys (← →) can be used to navigate between slides
- Some slides have interactive elements - click buttons to see demonstrations
- For the best experience, view in a modern browser with full screen mode

## Project Structure

- `/client` - Frontend React application
  - `/src/components/slides` - Individual slide components
  - `/src/components/animations` - Interactive animations
- `/server` - Express.js backend server
- `/public` - Static assets

## Technologies Used

- React with TypeScript
- Framer Motion for animations
- TailwindCSS for styling
- Express.js for the backend server

## Troubleshooting

- If you encounter "port already in use" errors, try:
  - Windows: `netstat -ano | findstr :5000` to find the process using port 5000
  - macOS/Linux: `lsof -i :5000` to find the process using port 5000
  - Then terminate that process or use a different port

- If you have dependency issues:
  - Try `npm install --force` to resolve conflicts
  - Make sure you have the correct Node.js version

## Team

- Yara
- Afnan
- Leedia

Supervisor: Dr. Musab Al Ghadi