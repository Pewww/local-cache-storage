import { advanceBy, advanceTo } from 'jest-date-mock';

import { set, get, remove, clear } from '../';
import { SECOND, MINUTE, DAY } from '../__mocks__/times';

describe('Local-Cache-Storage Test', () => {
  beforeEach(() => {
    clear();
  });

  describe('set function', () => {
    beforeEach(() => {
      clear();
    });

    it('Should save to localStoage', () => {
      const data = [
        {
          key: 'name',
          value: 'pewww'
        },
        {
          key: 'day',
          value: ['morning', 'lunch', 'dinner']
        },
        {
          key: 'animal',
          value: {
            name: 'hamtory',
            cuteness: 'super'
          }
        },
      ];

      data.forEach(({ key, value }) => {
        set(key, value);
      });

      set('foo', 'bar', 3 * SECOND);
      set('border', 'radius', 10 * MINUTE);

      expect(localStorage.length).toBe(5);
    });

    it('Throws TypeError when cache parameter is not Number type', () => {
      expect(() => {
        // @ts-expect-error
        set('test', 1234, 'not-number');  
      }).toThrow(TypeError);
    });
  });

  describe('get function', () => {
    beforeEach(() => {
      clear();
    });

    it('Should return null when key does not exist in storage', () => {
      set('a', 'b');

      expect(get('b')).toBe(null);
    });

    it("Should return original value if 'value' and 'expiredAt' fields are not in parsed value", () => {
      set('a', [1, 2, 3]);
      localStorage.setItem('b', JSON.stringify([1, 2, 3]));

      expect(get('a', true)).toEqual([1, 2, 3]);
      expect(get('b', true)).toBe('[1,2,3]');
    });

    it('Should remove key and return null if cache time expired', () => {
      // Reset date to 2021.07.17 13:30:30
      advanceTo(new Date(2021, 7, 17, 13, 30, 30));

      set('a', 'b', 3 * DAY);

      advanceBy(1 * DAY); // Advance time a day

      expect(get('a')).toBe('b');

      advanceBy(2 * DAY + 1 * SECOND);

      expect(get('a')).toBe(null);
    });

    it("Should return parsed value when 'parse' option is given", () => {
      set('a', {
        b: 1,
        c: 2
      });

      expect(get('a')).toBe("{\"b\":1,\"c\":2}");
      expect(get('a', true)).toEqual({
        b: 1,
        c: 2
      });
    });
  });

  describe('remove function', () => {
    beforeEach(() => {
      clear();
    });

    it('Should remove key when key exists in storage', () => {
      set('a', 'b');
      remove('a');

      expect(get('a')).toBe(null);
    });

    it('Should remain key when key does not exist in storage', () => {
      set('a', 'b');
      remove('b');

      expect(get('a')).toBe('b');
    });
  });

  describe('clear function', () => {
    beforeEach(() => {
      clear();
    });

    it('Storage should be empty', () => {
      set('a', 'b');
      set('b', 10);
      set('c', undefined);
      set('d', [{ str: 'hello' }]);
      set('e', {});

      expect(localStorage.length).toBe(5);

      clear();

      expect(localStorage.length).toBe(0);
    });
  });
});
