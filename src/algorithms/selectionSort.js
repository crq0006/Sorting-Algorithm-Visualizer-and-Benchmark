export function getSelectionSortSteps(inputArray){
    const arr = [...inputArray];
    const steps = [];
    const sorted = [];
    const n = arr.length;

    for (let i = 0; i < n; i++){
        let minIdx = i;

        for (let j = i + 1; j < n; j++){
            steps.push({ array: [...arr], comparing: [minIdx, j], swapping: [], sorted: [...sorted] });
            if (arr[j] < arr[minIdx]){
                minIdx = j;
            }
        }
        if (minIdx !== i){
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
            steps.push({ array: [...arr], comparing: [], swapping: [i, minIdx], sorted: [...sorted] });
        }
        sorted.push(i);
    }
    steps.push({ array: [...arr], comparing: [], swapping: [], sorted: Array.from({ length: n }, (_, i) => i) });
    return steps;
}