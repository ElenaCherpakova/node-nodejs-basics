import { fileURLToPath } from 'url';
import path from 'node:path';
import { Worker } from 'node:worker_threads';
import os from 'node:os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workerFile = path.resolve(__dirname, './worker.js');

const performCalculations = async () => {
  const promises = [];
  const qntOfCPU = os.cpus().length;
  const results = new Array(qntOfCPU).fill(null);
  console.log(results);
  for (let i = 0; i < qntOfCPU; i++) {
    const n = 10 + i;
    const promise = new Promise((resolve, reject) => {
      const worker = new Worker(workerFile);
      worker.postMessage(n);

      worker.on('message', (result) => {
        results[i] = { status: 'resolved', data: result };
        resolve();
      });
      worker.on('error', () => {
        results[i] = { status: 'error', data: null };
        resolve();
      });
      worker.on('exit', (code) => {
        if (code !== 0) {
          results[i] = { status: 'error', data: null };
          reject(new Error(
            `Worker ${i} stopped with exit code ${code}`,
          ));
        }
      });
    });
    promises.push(promise);
  }
  await Promise.allSettled(promises);
  console.log(results);
};
await performCalculations();
