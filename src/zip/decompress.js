import zlib from 'node:zlib';
import fs from 'node:fs';
import { fileURLToPath } from 'url';
import path from 'node:path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compressedFile = path.resolve(__dirname, './files/archive.gz');
const decompressFile = path.join(__dirname, './files/fileToDecompressed.txt');
const decompress = async () => {
  const gunzip = zlib.createGunzip();
  const input = await fs.createReadStream(compressedFile);
  const output = await fs.createWriteStream(decompressFile);
  input.pipe(gunzip).pipe(output);

  input.on('error', (err) => console.error('Input stream error', err));
  output.on('error', (err) => console.error('Output stream error', err));
  gunzip.on('error', (err) => console.error('Gunzip Stream Error:', err));

  output.on('finish', () => console.log('File decompressed successfully'));
};

await decompress();
