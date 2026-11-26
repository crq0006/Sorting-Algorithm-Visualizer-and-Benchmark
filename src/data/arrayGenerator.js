const arrayTypes = ['random', 'sorted', 'reversed', 'duplicate-heavy']

function randomInteger(min, max) {
  // adding one makes both min and max possible results, so the range is inclusive
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function generateArray(size, { type = 'random', min = 1, max = 100 } = {}) {
  // validate these before generating values so array lengths and bounds stay usable
  if (!Number.isSafeInteger(size) || size < 0) {
    throw new RangeError('Array size must be a non-negative safe integer.')
  }
  if (
    !Number.isSafeInteger(min) ||
    !Number.isSafeInteger(max) ||
    min > max ||
    !Number.isSafeInteger(max - min + 1)
  ) {
    throw new RangeError('Array bounds must be safe integers with a safely representable range.')
  }
  if (!arrayTypes.includes(type)) {
    throw new RangeError(`Unsupported array type "${type}". Choose one of: ${arrayTypes.join(', ')}.`)
  }

  if (type === 'duplicate-heavy' && size > 1) {
    // limit choices to about sqrt(size), and fewer than size, that way repeats are guarantee
    const distinctCount = Math.min(max - min + 1, Math.floor(Math.sqrt(size)), size - 1)
    const valuePool = Array.from({ length: distinctCount }, () => randomInteger(min, max))
    return Array.from({ length: size }, () => valuePool[randomInteger(0, valuePool.length - 1)])
  }

  const array = Array.from({ length: size }, () => randomInteger(min, max))

  // use numeric comparators
  if (type === 'sorted') return array.sort((a, b) => a - b)
  if (type === 'reversed') return array.sort((a, b) => b - a)
  return array
}