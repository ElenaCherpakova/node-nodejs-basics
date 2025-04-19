import { fileURLToPath } from 'url';
import fs from 'node:fs';
import path from 'path';
import { stdout } from 'node:process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fileToRead = path.resolve(__dirname, './files/fileToRead.txt');

const read = () => {
  fs.access(fileToRead, fs.constants.F_OK | fs.constants.R_OK, (err) => {
    if (err) {
      console.error('File does not exist or cannot be read');
      return;
    }

    const fileStream = fs.createReadStream(fileToRead, { encoding: 'utf8' });

    fileStream.pipe(stdout);

    fileStream.on('error', (error) => {
      console.error('Error reading file:', error);
    });
    fileStream.on('end', () => {
      console.log('\nThe process of reading file is completed.');
    });
  });
};

read();
