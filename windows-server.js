// Simple Express server for Windows compatibility
import express from 'express';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from the client/dist directory
app.use(express.static(path.join(__dirname, 'client/dist')));

// Catch-all route to serve the index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'));
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