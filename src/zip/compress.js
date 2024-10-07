import zlib from 'node:zlib';
import fs from 'node:fs';
import { fileURLToPath } from 'url';
import path from 'node:path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fileToCompress = path.resolve(__dirname, './files/fileToCompress.txt');
const folderToStore = path.resolve(__dirname, './files/archive.gz')
const compress = async () => {
  const gzip = zlib.createGzip();
  const input = await fs.createReadStream(fileToCompress);
  const output = await fs.createWriteStream(folderToStore);
  input.pipe(gzip).pipe(output);


  input.on('error', (err) => console.error('Input stream error', err));
  output.on('error', (err) => console.error('Output stream error', err));
  gzip.on('error', (err) => console.error('Gzip Stream Error:', err));

  output.on('finish', () => console.log('File compressed successfully'));
};

await compress();
