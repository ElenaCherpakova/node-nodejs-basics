import { fileURLToPath } from 'url';
import fs from 'node:fs/promises';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const content = 'I am fresh and young';
const create = async () => {
  try {
    const filePath = path.resolve(__dirname, './files/fresh.txt');
    await fs.writeFile(filePath, content, { flag: 'wx' });
    console.log('File created successfully');
  } catch (error) {
    throw new Error(
      error.code === 'EEXIST'
        ? 'FS operation failed'
        : `Error creating file: ${error.message}`
    );
  }
};

await create();
