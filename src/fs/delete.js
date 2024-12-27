import { fileURLToPath } from 'url';
import path from 'node:path';
import fs from 'node:fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const remove = async () => {
  const fileToRemove = path.resolve(__dirname, './files/fileToRemove.txt');
  try {
    await fs.access(fileToRemove);

    await fs.unlink(fileToRemove);
    console.log('File removed successfully');
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error('FS operation failed: File does not exist');
    } else {
      console.error('Error:', error.message);
    }
  }
};

await remove();
