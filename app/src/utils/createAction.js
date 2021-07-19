export default function createAction(type, ...argNames) {
  return function newAction(...args) {
    return argNames.reduce((action, arg, index) => ({
      ...action,
      [argNames[index]]: args[index],
    }), { type });
  };
}
