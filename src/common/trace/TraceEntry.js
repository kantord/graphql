// @flow

export function flattenTree(tree) {
  let queue = [tree];
  let id = 0, parent_id = 0
  let results = []
  while (queue.length) {
    let node = queue.shift();
    parent_id = id;
    Object.keys(node).forEach(child => {
      id ++;
      queue.push(node[child]);
      results.push([id, parent_id, toTypedKeyValue(node[child])])
    })
  }
  //console.log('flattenTree', tree, typeof tree)
  //return Object.keys(tree).map(key => ({
    //name: key,
    //...toTypedKeyValue(tree[key]),
  //}));
}

export function toTypedKeyValue(value) {
  console.log('toTypedKeyValue', value, typeof value)
  if (value === null) return { nullValue: true }
  if (value === undefined) return { undefinedValue: true }
  console.log('toTypedKeyValue ?', value)

  return {
    string: () => ({ stringValue: value }),
    boolean: () => ({ booleanValue: value }),
    number: () => ({ [value % 1 ? 'floatValue' : 'integerValue']: value }),
    array: () => ({ arrayValue: value.map(v => toTypedKeyValue(v)) })
  }[Array.isArray(value) ? 'array' : typeof value]();
}
