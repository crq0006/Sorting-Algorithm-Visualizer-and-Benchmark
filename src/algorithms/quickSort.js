export function getQuickSortSteps(inputArray) {
    const arr = [...inputArray];
    const steps = [];
    const sorted = new Set();
    const n = arr.length;

    function partition(low, high){
        const pivotalVal = arr[high];
        let i = low - 1;

        for (let j = low; j < high; j++){
            steps.push({ array: [...arr], comparing: [j, high], swapping: [], pivot: high, sorted: [...sorted] });

            if (arr[j] < pivotVal){
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                steps.push({ array: [...arr], comparing: [], swapping: [i, j], pivot: high, sorted: [...sorted]});
            }
        }
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        steps.push({ array:[...arr], comparing: [], swapping: [i + 1, high], pivot: i + 1, sorted: [...sorted] });
        return i + 1;
    }
    function quickSortHelper(low, high){
        if (low < high){
            const pi = partition(low, high);
            sorted.add(pi);
            quickSortHelper(low, pi - 1);
            quickSortHelper(pi + 1, high);
        }
        else if (low == high){
            sorted.add(low);
        }
    }
    quickSortHelper(0, n - 1);
    steps.push({ array: [...arr], comparing: [], swapping: [], sorted: Array.from({ length: n }, (_, i) => i) });
    return steps;
}