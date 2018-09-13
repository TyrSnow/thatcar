let cache = {};

export function set(key, value) {
  cache[key] = value;
}

export function get(key) {
  return cache[key];
}

export function remove(key) {
  delete cache[key];
}