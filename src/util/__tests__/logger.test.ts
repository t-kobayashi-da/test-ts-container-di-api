import { logger } from '../logger';

describe('Logger', () => {
  it('logs message', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    logger('test log');

    expect(consoleSpy).toHaveBeenCalledWith('[LOG] test log');
  })
})
