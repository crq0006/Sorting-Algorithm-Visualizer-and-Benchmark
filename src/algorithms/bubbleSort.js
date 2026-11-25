export function getBubbleSortSteps(inputArray) {
    const arr = [...inputArray];
    const steps = [];
    const sorted = [];
    const n = arr.length;

    for (let i = 0; i < n; i++){
        for (let j = 0; j < n - i - 1; j++){
            steps.push({array: [...arr], comparing: [j, j + 1], swapping: [], sorted: [...sorted] });

            // swap the adjacent values only when they are out of ascending order
            if (arr[j] > arr[j + 1]){
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                steps.push({ array: [...arr], comparing: [], swapping: [j, j + 1], sorted: [...sorted] });
            }
        }
        sorted.push(n - i - 1);
    }
    steps.push({ array: [...arr], comparing: [], swapping: [], sorted: Array.from({ length: n }, (_, i) => i) });
    return steps;
}