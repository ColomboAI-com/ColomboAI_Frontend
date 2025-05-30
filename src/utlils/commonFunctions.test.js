import { copyValue } from './commonFunctions';
import copy from 'copy-to-clipboard';
import { MessageBox } from '@/components/MessageBox'; // Assuming this is the correct path

// Mock the 'copy-to-clipboard' module
jest.mock('copy-to-clipboard');

// Mock the MessageBox component/function
jest.mock('@/components/MessageBox', () => ({
  MessageBox: jest.fn(),
}));

describe('commonFunctions', () => {
  describe('copyValue', () => {
    afterEach(() => {
      // Clear all mock instances and calls after each test
      jest.clearAllMocks();
    });

    it('should call copy and MessageBox with correct parameters when a value is provided', () => {
      const testValue = 'Hello, world!';
      copyValue(testValue);

      expect(copy).toHaveBeenCalledTimes(1);
      expect(copy).toHaveBeenCalledWith(testValue);

      expect(MessageBox).toHaveBeenCalledTimes(1);
      expect(MessageBox).toHaveBeenCalledWith('success', 'Copied to clipboard');
    });

    it('should not call copy or MessageBox when the value is null', () => {
      copyValue(null);

      expect(copy).not.toHaveBeenCalled();
      expect(MessageBox).not.toHaveBeenCalled();
    });

    it('should not call copy or MessageBox when the value is undefined', () => {
      copyValue(undefined);

      expect(copy).not.toHaveBeenCalled();
      expect(MessageBox).not.toHaveBeenCalled();
    });

    it('should not call copy or MessageBox when the value is an empty string', () => {
      // copyValue treats empty string as falsy in the `if (value)` check
      copyValue('');

      expect(copy).not.toHaveBeenCalled();
      expect(MessageBox).not.toHaveBeenCalled();
    });
  });
});
