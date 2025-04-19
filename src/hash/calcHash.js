import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'node:fs';
import crypto from 'crypto';
import stream from 'stream';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fileToHash = path.resolve(
  __dirname,
  './files/fileToCalculateHashFor.txt'
);
const calculateHash = async () => {
  const fileStream = await fs.createReadStream(fileToHash);
  const hash = crypto.createHash('sha256').setEncoding('hex');
  stream.pipeline(fileStream, hash, (err) => {
    if (err) {
      console.error('Pipeline failed:', err);
    } else {
      console.log(`Hash of the file is: ${hash.digest('hex')}`);
    }
  });
};
calculateHash();
