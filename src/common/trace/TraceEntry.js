// @flow

export function flattenTree(tree) {
  return Object.keys(tree).map(key => ({
    name: key,
    ...toTypedKeyValue(tree[key]),
  }));
}

export function toTypedKeyValue(value) {
  if (value === null) return { nullValue: true }
  if (value === undefined) return { undefinedValue: true }
  if (typeof value === 'string' && value.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)) return { dateValue: value }

  return {
    string: () => ({ stringValue: value }),
    boolean: () => ({ booleanValue: value }),
    number: () => ({ [value % 1 ? 'floatValue' : 'integerValue']: value }),
    object: () => ({ children: flattenTree(value) }),
    array: () => ({ arrayValue: value.map(v => toTypedKeyValue(v)) }),
  }[Array.isArray(value) ? 'array' : typeof value]();
}
