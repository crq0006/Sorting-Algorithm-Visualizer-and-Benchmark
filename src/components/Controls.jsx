// Settings/Selecting Values page, for display and reporting changes
const LIMITS = {
    size: {min: 5, max: 200}, // visualizer cap
    value: {min: 1, max: 1000}, // smallest to largest number allowed in array
    speed: {min: 1, max: 10}, // animation speed
}

const ARRAY_TYPES = [
    {value: 'random', label: 'Random'},
    {value: 'sorted', label: 'Already sorted'},
    {value: 'reversed', label: 'Reversed'},
    {value: 'duplicate-heavy', label: 'Many duplicates'},
]

function Controls ({settings, onChange, onStart}) {
    const update = (patch) => onChange ({...settings, ...patch})

    // Keeps min < max no matter which slider the user drags
    const setMin = (v) => update({min: v, max: Math.max(settings.max, v + 1)})
    const setMax = (v) => update({max: v, min: Math.min(settings.min, v - 1)})

    return (
        <div className = "controls">

            <label className = "slider-row" htmlFor = "size">
                <span>Data array size: <strong>n = {settings.size}</strong></span>
                <input id = "size" type = "range" min = {LIMITS.size.min} max = {LIMITS.size.max} value = {settings.size} onChange = {(e) => update ({size: Number(e.target.value)})} />
            </label>

            <label className = "slider-row" htmlFor = "min">
                <span>Smallest value: <strong>{settings.min}</strong></span>
                <input id = "min" type = "range" min = {LIMITS.value.min} max = {LIMITS.value.max - 1} value = {settings.min} onChange = {(e) => setMin(Number(e.target.value))} />
            </label>

            <label className = "slider-row" htmlFor = "max">
                <span>Largest value: <strong>{settings.max}</strong></span>
                <input id = "max" type = "range" min = {LIMITS.value.min + 1} max = {LIMITS.value.max} value = {settings.max} onChange = {(e) => setMax(Number(e.target.value))} />
            </label>

            <label className = "slider-row" htmlFor = "speed">
                <span>Animation speed: <strong>{settings.speed}</strong> (1 = slow, 10 = fast)</span>
                <input id = "speed" type = "range" min = {LIMITS.speed.min} max = {LIMITS.speed.max} value = {settings.speed} onChange = {(e) => update({speed: Number(e.target.value)})}/>
            </label>

            <label className = "slider-row" htmlFor = "type">
                <span>Starting Order</span>
                <select id = "type" value = {settings.type} onChange = {(e) => update({type: e.target.value})}>{ARRAY_TYPES.map((t) => ( <option key = {t.value} value = {t.value} > {t.label}</option>))}</select>
            </label>
            
            <button type = "button" className = "button button-primary" onClick = {onStart}>Start sorting</button>
        </div>
    )
}

export default Controls