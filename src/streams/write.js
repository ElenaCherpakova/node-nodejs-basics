import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'node:fs';
import { stdin } from 'node:process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fileToWrite = path.resolve(__dirname, './files/fileToWrite.txt');

const write = () => {
  const fileStream = fs.createWriteStream(fileToWrite);
  stdin.pipe(fileStream);
  fileStream.on('error', (error) => {
    console.error('Error reading file:', error);
  });
  fileStream.on('finish', () => {
    console.log('\nThe process of reading file is completed.');
  });
};

write();
