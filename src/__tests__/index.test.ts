import { set, get, remove, clear } from '../';

describe('Custom-Local-Cache Test', () => {
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

      expect(localStorage.length).toBe(3);
    });

    it('Test-Case', () => {
      // TODO
    });
  });

  describe('get function', () => {
    // TODO
  });

  describe('remove function', () => {
    // TODO
  });

  describe('clear function', () => {
    // TODO
  });
});
