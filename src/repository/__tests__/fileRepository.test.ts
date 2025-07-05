import { FileRepository } from '../fileRepository';
import fs from 'fs';

jest.mock('fs');

describe('FileRepository', () => {
  it('getFileContent returns file content', () => {
    (fs.readFileSync as jest.Mock).mockReturnValue('mock hello');

    const repo = new FileRepository();
    const result = repo.getFileContent();

    expect(result).toBe('mock hello');
  })
})
