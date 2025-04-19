import { fileURLToPath } from 'url';
import fs from 'node:fs/promises';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const read = async () => {
  const fileToRead = path.resolve(__dirname, './files/fileToRead.txt');
  try {
    const result = await fs.readFile(fileToRead, 'utf8');
    if (!result) {
      console.log('File is empty.');
    }
    console.log(result);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error('FS operation failed: File does not exist');
    } else {
      console.error('Error:', error.message);
    }
  }
};

await read();
