const http = require('http');
const fs = require('fs');
const path = require('path');

// Define the server's port
const PORT = 3000;

// Create the server
const server = http.createServer((req, res) => {
  // Build the file path based on the URL
  let filePath = req.url === '/' ? './index.html' : `.${req.url}`;
  const extname = String(path.extname(filePath)).toLowerCase();

  // Map file extensions to MIME types
  const mimeTypes = {
    '.html': 'index.html',
  };

  const contentType = mimeTypes[extname] || 'application/octet-stream';

  // Read the file and serve it
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // File not found, serve 404
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>', 'utf-8');
      } else {
        // Server error
        res.writeHead(500);
        res.end(`Server error: ${error.code}`);
      }
    } else {
      // Serve the file with the appropriate content type
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
