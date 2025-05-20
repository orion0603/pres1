// Simple Express server script for Windows compatibility
import express from 'express';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check if client/dist exists, if not, build it
const distPath = path.join(__dirname, 'client/dist');
if (!fs.existsSync(distPath)) {
  console.log('Client build not found, building the client first...');
  console.log('This may take a few moments...');
  
  try {
    // Run the build command synchronously
    import('child_process').then(({ execSync }) => {
      execSync('npm run build', { stdio: 'inherit' });
      startServer();
    });
  } catch (error) {
    console.error('Error building the client:', error);
    process.exit(1);
  }
} else {
  startServer();
}

function startServer() {
  const app = express();
  const PORT = process.env.PORT || 5000;

  // Serve static files from the client/dist directory
  app.use(express.static(distPath));

  // Catch-all route to serve the index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });

  // Start the server
  app.listen(PORT, '127.0.0.1', () => {
    console.log(`\n----------------------------------------`);
    console.log(`Badir Blockchain Presentation running at:`);
    console.log(`http://localhost:${PORT}`);
    console.log(`----------------------------------------\n`);
    
    // Try to open the browser automatically
    try {
      const startCommand = process.platform === 'win32' ? 
        `start http://localhost:${PORT}` : 
        `open http://localhost:${PORT}`;
      exec(startCommand);
    } catch (error) {
      console.log('Please open the URL manually in your browser');
    }
  });
}