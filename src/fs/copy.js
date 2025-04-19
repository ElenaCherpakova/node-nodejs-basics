import { fileURLToPath } from 'url';
import path from 'node:path';
import fs from 'node:fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const copy = async () => {
  const srcFolder = path.resolve(__dirname, './files');
  const destFolder = path.resolve(__dirname, './files_copy');
  try {
    //check if the source folder is exist
    await fs.access(srcFolder);
    try {
      //check if the destination folder is exist
      await fs.access(destFolder);
      throw new Error('FS operation failed');
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
    }
    // copy the folder using recursive flag true
    await fs.cp(srcFolder, destFolder, { recursive: true });
    console.log('Folder copied successfully');
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error('FS operation failed: Source folder does not exist');
    } else {
      console.error('Error:', error.message);
    }
  }
};
await copy();
