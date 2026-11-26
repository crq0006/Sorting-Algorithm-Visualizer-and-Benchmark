import test from 'node:test'
import assert from 'node:assert/strict'

import { generateArray } from '../src/data/arrayGenerator.js'

test('generates random arrays of the requested size within the inclusive bounds', () => {
  const array = generateArray(100, { min: 4, max: 12 })

  assert.equal(array.length, 100)
  assert.ok(array.every((value) => Number.isInteger(value) && value >= 4 && value <= 12))
})

test('generates sorted and reversed arrays', () => {
  const sorted = generateArray(30, { type: 'sorted' })
  const reversed = generateArray(30, { type: 'reversed' })

  assert.deepEqual(sorted, [...sorted].sort((a, b) => a - b))
  assert.deepEqual(reversed, [...reversed].sort((a, b) => b - a))
})

test('generates duplicate-heavy arrays with repeated values', () => {
  // the pool is smaller than the requested array, so this check is deterministic
  const array = generateArray(100, { type: 'duplicate-heavy' })

  assert.equal(array.length, 100)
  assert.ok(new Set(array).size < array.length)
})

test('supports empty and single-element arrays', () => {
  assert.deepEqual(generateArray(0), [])
  assert.equal(generateArray(1).length, 1)
  assert.equal(generateArray(1, { type: 'duplicate-heavy' }).length, 1)
})

test('rejects invalid sizes, bounds, and array types', () => {
  assert.throws(() => generateArray(-1), RangeError)
  assert.throws(() => generateArray(1.5), RangeError)
  assert.throws(() => generateArray(1, { min: 5, max: 4 }), RangeError)
  assert.throws(() => generateArray(1, { min: -Number.MAX_SAFE_INTEGER, max: Number.MAX_SAFE_INTEGER }), RangeError)
  assert.throws(() => generateArray(1, { type: 'unknown' }), RangeError)
})
