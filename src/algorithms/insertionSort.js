export function getInsertionSortSteps(inputArray) {
    const arr = [...inputArray];
    const steps = [];
    const n = arr.length;

    for (let i = 1; i < n; i++){
        let key = arr[i];
        let j = i - 1;

        steps.push({ array: [...arr], comparing: [i, j], swapping: [], sorted: [] });

        while (j >= 0 && arr[j] > key){
            steps.push({ array: [...arr], comparing: [j, j + 1], swapping: [], sorted: [] });
            arr[j + 1] = arr[j];
            steps.push({ array: [...arr], comparing: [], swapping: [j, j + 1], sorted: [] });
            j--;
        }
        arr[j + 1] = key;
        steps.push({ array: [...arr], comparing: [], swapping: [j + 1], sorted: [] });
    }
    steps.push({ array: [...arr], comparing: [], swapping: [], sorted: Array.from({ length: n }, (_, i) => i) });
    return steps;
}