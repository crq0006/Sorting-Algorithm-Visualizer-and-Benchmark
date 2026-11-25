import test from 'node:test'
import assert from 'node:assert/strict'

import { getBubbleSortSteps } from '../src/algorithms/bubbleSort.js'
import { getInsertionSortSteps } from '../src/algorithms/insertionSort.js'
import { getSelectionSortSteps } from '../src/algorithms/selectionSort.js'
import { getMergeSortSteps } from '../src/algorithms/mergeSort.js'
import { getQuickSortSteps } from '../src/algorithms/quickSort.js'

const algorithms = [
  ['bubble sort', getBubbleSortSteps],
  ['insertion sort', getInsertionSortSteps],
  ['selection sort', getSelectionSortSteps],
  ['merge sort', getMergeSortSteps],
  ['quick sort', getQuickSortSteps],
]

// exercise each implementation against the same edge cases
const cases = [
  { name: 'empty array', input: [] },
  { name: 'single element', input: [7] },
  { name: 'sorted array', input: [1, 2, 3, 4, 5] },
  { name: 'reverse-sorted array', input: [5, 4, 3, 2, 1] },
  { name: 'array with duplicates', input: [3, 1, 3, 2, 1, 2] },
]

for (const [algorithmName, getSteps] of algorithms) {
  for (const testCase of cases) {
    test(`${algorithmName} sorts ${testCase.name}`, () => {
      const original = [...testCase.input]
      const steps = getSteps(testCase.input)
      const finalArray = steps.at(-1).array
      const expected = [...testCase.input].sort((a, b) => a - b)

      assert.deepEqual(finalArray, expected)
      assert.deepEqual(testCase.input, original)
    })
  }
}
