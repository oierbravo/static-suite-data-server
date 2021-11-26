import { isEmptyObject, hasKey, deepClone } from '../objectUtils';

describe('Object utils test', () => {
  describe('isEmptyObject', () => {
    it('returns true for an empty object', () => {
      expect(isEmptyObject({})).toBe(true);
    });
    it('returns false for a non empty object', () => {
      expect(isEmptyObject({ x: 1 })).toBe(false);
    });
  });

  describe('hasKey', () => {
    it('returns true if an object has a given key', () => {
      expect(hasKey({ x: 1 }, 'x')).toBe(true);
    });
    it('returns false if an object does not have a given key', () => {
      expect(hasKey({ x: 1 }, 'y')).toBe(false);
    });
  });

  describe('deepClone', () => {
    it('returns an object equal to the given one, without references to nested objects', () => {
      const anObject = { x: 1, y: {} };
      const anotherObject = { z: 34 };
      anObject.y = anotherObject;
      const clonedObject = deepClone(anObject);
      expect(clonedObject).toStrictEqual(anObject);
      anotherObject.z = 22;
      expect(clonedObject).not.toStrictEqual(anObject);
    });
  });
});
