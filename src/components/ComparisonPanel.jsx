import { useMemo } from 'react'
import { ALGORITHMS } from '../algorithms/index.js'
import { usePlayback, stepsPerSecondFor } from '../visualization/animationController.js'
import SortingCanvas from '../visualization/SortingCanvas.jsx'
import { BAR_COLORS } from '../theme.js'

const LEGEND = [ ['Unsorted', BAR_COLORS.default], ['Comparing', BAR_COLORS.comparing], ['Swapping', BAR_COLORS.swapping], ['Pivot (Quick Sort)', BAR_COLORS.pivot], ['Sorted', BAR_COLORS.sorted], ]

// Algorithm's box which includes name, canvas, complexity, and progress
function SortingPanel({algo, steps, tick, maxValue}) {
    const last = steps.length - 1
    const current = steps[Math.min(tick, last)]
    const finished = tick >= last

    let progressText = `Step ${tick} / ${last}`
    if (finished) {
        progressText = `Done! (${last} steps)`
    }
    return (

        <div className = "panel">
            <h2 className = "panel-title">
                {algo.name}
            </h2>
            <SortingCanvas step = {current} maxValue = {maxValue} />
            <div className = "panel-footer">
                <span>Time complexity: {algo.complexity}</span>
                <span>{progressText}</span>
            </div>
        </div>
    )
}

// Shows 1 panel or 2 panels (if two algorithms are being presented at the same time), share the same clock
function ComparisonPanel({first, second, data, speed, onMainMenu}) {
    const stepLists = useMemo (() => [first, second].filter(Boolean).map((key) => ALGORITHMS[key].getSteps(data)), [first, second, data],)

    const keys = [first, second].filter(Boolean)
    const maxValue = useMemo(() => Math.max(...data), [data])
    const lastTick = Math.max(...stepLists.map((s) => s.length - 1))

    const {tick, pasued, done, togglePause, restart} = usePlayback (lastTick, stepsPerSecondFor(speed),)

    let panelsClass = 'panels'
    if (keys.length === 2) {
        panelsClass = 'panels panels-two'
    }

    let pauseLabel = 'Pause'
    if (paused) {
        pauseLabel = 'Resume'
    }

    // When animation plays it shows pause/resume, once animation is done it shows run again/main menu
    let actionButtons = (
        <button type = "button" className = "button" onClick = {togglePause}>{pauseLabel}</button>
    )

    if (done) {
        actionButtons = (
            <>
                <button type = "button" className = "button button-primary" onClick = {restart}>Run Again</button>
                <button type = "button" className = "button" onClick = {onMainMenu}>Main Menu</button>
            </>
        )
    }
    return (
        <>
            <div className = {panelsClass}>
                {keys.map((key, i) => ( <SortingPanel key = {key} algo = {ALGORITHMS[key]} steps = {stepLists[i]} tick = {tick} maxValue = {maxValue}/>
                ))}
            </div>

            <ul className = "legend" aria-label = "Color legend">
                {LEGEND.map(([label, color]) => (
                <li key = {label}>
                    <span className = "switch" style = {{background: color}} /> {label}
                </li>
                ))}
            </ul>

            <div className = "action-row">
                {actionButtons}
            </div>
        </>
    )
}

export default ComparisonPanel