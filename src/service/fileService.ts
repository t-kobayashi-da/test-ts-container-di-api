import { FileRepository } from '../repository/fileRepository';

export class FileService {
  constructor(private fileRepository: FileRepository) {}

  getTextFile(): string {
    return this.fileRepository.getFileContent();
  }
}
