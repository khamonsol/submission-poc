import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';
import cors from 'cors';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Start Rollup in watch mode
const rollup = spawn('npm', ['run', 'watch'], {
  stdio: ['pipe', 'pipe', 'pipe'],
  shell: true
});

rollup.stdout.on('data', (data) => {
  process.stdout.write(data);
});

rollup.stderr.on('data', (data) => {
  process.stderr.write(data);
});

rollup.on('error', (err) => {
  console.error('Failed to start Rollup:', err);
});
app.use(cors());

// Serve static files from dist
app.use(express.static('dist'));

// Security headers including CSP
app.use((req, res, next) => {
  // CORS headers
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  // Content Security Policy
  res.header(
    'Content-Security-Policy',
    [
      "default-src 'self' https://cdn.jsdelivr.net",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net",
      "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net",
      "img-src 'self' data: https:",
      "font-src 'self' data: https:",
      "connect-src 'self' https:",
      "frame-src 'self'",
      "object-src 'none'"
    ].join('; ')
  );

  next();
});

// Serve index.html for all routes
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

app.listen(port, () => {
  console.clear();
  console.log('\n🚀 Development server running!\n');
  console.log('📦 Module URL:');
  console.log('  http://localhost:3000/beyond-submission.js\n');
  console.log('📄 Documentation:');
  console.log('  http://localhost:3000\n');
  console.log('🔄 Watching for changes...\n');
});

// Handle process termination
process.on('SIGTERM', () => {
  rollup.kill();
  process.exit(0);
});

process.on('SIGINT', () => {
  rollup.kill();
  process.exit(0);
});