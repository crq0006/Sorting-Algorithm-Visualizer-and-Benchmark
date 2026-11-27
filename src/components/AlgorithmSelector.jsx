import { ALGORITHMS } from '../algorithms/index.js'

// Used on the welcome screen and "pick another" screen to display algorithm buttons, with disabledKey showing that the algorithm has been chosen previously.
function AlgorithmSelector({onSelect, disabledKey = null}) {
    return (
        <div className = "button-grid">
            {Object.entries(ALGORITHMS).map(([key, algo]) => (
                <button key = {key} type = "button" className = "button" disabled = {key === disabledKey} onClick = {() => onSelect(key)}>{algo.name}</button>
            ))}
        </div>
    )
}

export default AlgorithmSelector