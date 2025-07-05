import { FileService } from '../fileService';

describe('FileService', () => {
  it('getTextFile returns content from repository', () => {
    const mockRepo = { getFileContent: jest.fn().mockReturnValue('service test') };

    const service = new FileService(mockRepo as any);
    const result = service.getTextFile();

    expect(result).toBe('service test');
    expect(mockRepo.getFileContent).toHaveBeenCalled();
  })
})
