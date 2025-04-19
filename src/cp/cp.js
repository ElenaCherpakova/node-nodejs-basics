import { fileURLToPath } from 'url';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { stdin, stdout, stderr } from 'node:process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const scriptPath = path.resolve(__dirname, './files/script.js');

// spawn- create a new child process to run a separate script or command. Don't block the main thread
const spawnChildProcess = async (args) => {
  const child = spawn('node', [scriptPath, ...args], {
    stdio: ['pipe', 'pipe', 'pipe'], // as stdin, stdout, stderr
  });
  stdin.pipe(child.stdin);
  child.stdout.pipe(stdout);

  child.stderr.pipe(stderr);
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['apple', 'cherry', 'banana']);
