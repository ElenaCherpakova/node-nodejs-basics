import { fileURLToPath } from 'url';
import path from 'node:path';
import fs from 'node:fs/promises';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const list = async () => {
  const folder = path.resolve(__dirname, './files');
  try {
    //check if folder exists
    const files = await fs.readdir(folder, { withFileTypes: true });
    //filter only files, exluding nested folders
    const fileNames = files
      .filter((file) => !file.isDirectory())
      .map((file) => file.name);
    console.log({ fileNames });
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error('FS operation failed: Directory folder does not exist');
    } else {
      console.error('Error:', error.message);
    }
  }
};

await list();
