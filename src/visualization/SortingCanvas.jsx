import { useEffect, useRef } from 'react'
import { BAR_COLORS, CANVAS_BG } from '../theme.js'

const HEIGHT = 360
const LABEL_STRIP = 32
const MIN_FONT = 10

// Draws one step of a sort as a row of bars
function SortingCanvas({step, maxValue, width = 900}) {
    const canvasRef = useRef(null)

    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d')
        const {array, comparing = [], swapping = [], sorted = [], pivot} = step
        const n = array.length
        const barWidth = width / n
        const baseline = HEIGHT - LABEL_STRIP
       
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
        ctx.fillRect(0, 0, width, HEIGHT)

        array.forEach((value, i) => {
            const barHeight = (value / maxValue) * (baseline - 12)
            ctx.fillStyle = colors[i]
            ctx.fillRect(i * barWidth, baseline - barHeight, barWidth - gap, barHeight)
        })

        const digits = String(maxValue).length
        const fontSize = Math.min(20, barWidth / (digits * 0.65))

        if (fontSize >= MIN_FONT) {

            ctx.font = `bold ${fontSize}px system-ui, sans-serif`
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'

            array.forEach((value, i) => {
                ctx.fillStyle = colors[i]
                ctx.fillText(String(value), i * barWidth + barWidth / 2, baseline + LABEL_STRIP / 2)
            })
        }

    }, [step, maxValue, width])

    return (<canvas ref = {canvasRef} className = "sort-canvas" width = {width} height = {HEIGHT} role = "img" aria-label = "Bar chart of the array being sorted" />)
}

export default SortingCanvas