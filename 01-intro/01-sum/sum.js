function sum(a, b) {
// <<<<<<< HEAD
  if (typeof a === 'number' && typeof b === 'number') {
    return a + b;
  }
  throw new TypeError();
// =======
  if ([a, b].some((value) => typeof value !== 'number')) {
    throw new TypeError();
  }

  return a + b;
// >>>>>>> 6ec3e59375d11ddf95972d84f98eab106ffc570c
}

module.exports = sum;
