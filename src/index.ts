export function set(key: string, value: any, cache?: number) {
  if (cache && typeof cache !== 'number') {
    throw new TypeError("Parameter 'cache' should be Number type.");
  }

  const convertedValue = (Array.isArray(value) || toString.call(value) === '[object Object]')
    ? JSON.stringify(value)
    : value;

  const formatted = {
    value: convertedValue,
    expiredAt: cache > 0
      ? new Date().getTime() + cache
      : null
  };

  localStorage.setItem(key, JSON.stringify(formatted));

  return null;
}

export function get(key: string) {
  const value = localStorage.getItem(key);

  if (value === null) {
    return null;
  }

  const parsed = JSON.parse(value);

  if (!(parsed.hasOwnProperty('value') && parsed.hasOwnProperty('expiredAt'))) {
    return parsed;
  } 

  try {
    if (parsed.expiredAt !== null) {
      const currTime = new Date().getTime();
      const expiredAt = parsed.expiredAt;
  
      if (currTime > expiredAt) {
        return remove(key);
      }
  
      return JSON.parse(parsed.value);
    }
  
    return JSON.parse(parsed.value);
  } catch(e) {
    return null;
  }
}

export function remove(key: string) {
  localStorage.removeItem(key);

  return null;
}

export function clear() {
  localStorage.clear();

  return null;
}
