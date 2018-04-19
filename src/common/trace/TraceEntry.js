// @flow

export function flattenTree(tree) {
  return Object.keys(tree).map(key => ({
    name: key,
    ...toTypedKeyValue(tree[key]),
  }));
}

export function toTypedKeyValue(value) {
  return {
    string: () => ({ stringValue: value }),
    boolean: () => ({ booleanValue: value }),
    number: () => ({ [value % 1 ? 'floatValue' : 'integerValue']: value }),
    object: () => ({ children: flattenTree(value) }),
    array: () => ({ arrayValue: value.map(v => toTypedKeyValue(v)) }),
  }[Array.isArray(value) ? 'array' : typeof value]();
}
