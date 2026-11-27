import { useEffect, useRef } from 'react'
import { BAR_COLORS, CANVAS_BG } from '../theme.js'

const WIDTH = 900
const HEIGHT = 360

// Draws one step of a sort as a row of bars
function SortingCanvas({step, maxValue}) {
    const canvasRef = useRef(null)

    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d')
        const {array, comparing = [], swapping = [], sorted = [], pivot} = step
        const n = array.length
        const barWidth = WIDTH / n
       
        let gap = 0
        if (barWidth > 3) {
            gap = 1
        }

        const colors = new Array(n).fill(BAR_COLORS.default)
        sorted.forEach((i) => { colors[i] = BAR_COLORS.sorted })
        if (pivot !== undefined) colors[pivot] = BAR_COLORS.pivot
        comparing.forEach((i) => { colors[i] = BAR_COLORS.comparing })
        swapping.forEach((i) => { colors[i] = BAR_COLORS.swapping })

        ctx.fillStyle = CANVAS_BG
        ctx.fillRect(0, 0, WIDTH, HEIGHT)

        array.forEach((value, i) => {
            const barHeight = (value / maxValue) * (HEIGHT - 12)
            ctx.fillStyle = colors[i]
            ctx.fillRect(i * barWidth, HEIGHT - barHeight, barWidth - gap, barHeight)
        })
    }, [step, maxValue])

    return (<canvas ref = {canvasRef} className = "sort-canvas" width = {WIDTH} height = {HEIGHT} role = "img" aria-label = "Bar chart of the array being sorted" />)
}

export default SortingCanvas