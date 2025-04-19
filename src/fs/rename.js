import { fileURLToPath } from 'url';
import fs from 'node:fs/promises';
import path from 'node:path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rename = async () => {
  const oldFileName = path.resolve(__dirname, './files/wrongFilename.txt');
  const newFileName = path.resolve(__dirname, './files/properFilename.md');

  try {
    await fs.access(oldFileName);
    try {
      await fs.access(newFileName);
      throw new Error('FS operation failed');
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
    }
    await fs.rename(oldFileName, newFileName);
    console.log('File renamed successfully');
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error('FS operation failed: Source file does not exist');
    } else {
      console.error('Error:', error.message);
    }
  }
};

await rename();
