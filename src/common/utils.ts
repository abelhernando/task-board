/**
 * Returns `true` if the specified argument is `null` or `undefined`
 * @param value The value to test
 * @returns `true` if the specified argument is `null` or `undefined`
 */
export function isNil(value: unknown) {
  return value === undefined || value === null;
}

/**
 * Returns the `true` if specified argument it is a `string`
 * @param value The value to test
 * @returns  `true` if it is a string
 */
export function isString(value: unknown) {
  if (isNil(value)) {
    return false;
  }
  const type = typeof value;
  return type === "string" || (type === "object" && value instanceof String);
}

/**
 * Returns the `true` if specified argument it is a `string` and
 * the the length is not zero
 * @param value The value to test
 * @returns  `true` if it is a non empty string
 */
export function isNonEmptyString(value: string) {
  return !isNil(value) && isString(value) && value.length > 0;
}
