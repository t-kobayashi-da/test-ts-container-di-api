import fs from 'fs';
import path from 'path';

export class FileRepository {
  getFileContent(): string {
    const filePath = path.join(__dirname, '../../hello.txt');
    return fs.readFileSync(filePath, 'utf-8');
  }
}
