export function getMergeSortSteps(inputArray) {
    const arr = [...inputArray];
    const steps = [];
    const n = arr.length;

    function merge(left, mid, right) {
        const leftArr = arr.slice(left, mid + 1);
        const rightArr = arr.slice(mid + 1, right + 1);
        let i = 0;
        let j = 0;
        let k = left;

        while (i < leftArr.length && j < rightArr.length) {
            steps.push({ array: [...arr], comparing: [left + i, mid + 1 + j], swapping: [], sorted: [] });

            if (leftArr[i] <= rightArr[j]) {
                arr[k] = leftArr[i];
                i++;
            } else {
                arr[k] = rightArr[j];
                j++;
            }
            steps.push({ array: [...arr], comparing: [], swapping: [k], sorted: [] });
            k++;
        }

        while (i < leftArr.length) {
            arr[k] = leftArr[i];
            steps.push({ array: [...arr], comparing: [], swapping: [k], sorted: [] });
            i++;
            k++;
        }

        while (j < rightArr.length) {
            arr[k] = rightArr[j];
            steps.push({ array: [...arr], comparing: [], swapping: [k], sorted: [] });
            j++;
            k++;
        }
    }

    function mergeSortHelper(left, right) {
        if (left >= right) return;
        const mid = Math.floor((left + right) / 2);
        mergeSortHelper(left, mid);
        mergeSortHelper(mid + 1, right);
        merge(left, mid, right);
    }

    if (n > 0) {
        mergeSortHelper(0, n - 1);
    }
    steps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: Array.from({ length: n }, (_, i) => i)
    });
    return steps;
}