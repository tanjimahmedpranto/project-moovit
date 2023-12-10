function isNullOrUndefined(...values) {
  return values.some((value) => value === null || value === undefined);
}

module.exports = {
  isNullOrUndefined,
};
