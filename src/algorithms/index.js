import { getBubbleSortSteps } from './bubbleSort.js'
import { getInsertionSortSteps } from './insertionSort.js'
import { getSelectionSortSteps } from './selectionSort.js'
import { getMergeSortSteps } from './mergeSort.js'
import { getQuickSortSteps } from './quickSort.js'

export const ALGORITHMS = {

  bubble: { name: 'Bubble Sort', complexity: 'O(n^2)', getSteps: getBubbleSortSteps },
  insertion: { name: 'Insertion Sort', complexity: 'O(n^2)', getSteps: getInsertionSortSteps },
  selection: { name: 'Selection Sort', complexity: 'O(n^2)', getSteps: getSelectionSortSteps },
  merge: { name: 'Merge Sort', complexity: 'O(n log n)', getSteps: getMergeSortSteps },
  quick: { name: 'Quick Sort', complexity: 'O(n log n) average', getSteps: getQuickSortSteps },

}