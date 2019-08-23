// let xx= (...args) => a(b(...args));
// let xxx = (...args) => xx(c(...args))
// result = (...args) => a(b(c(...args)))

export default function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }
  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
