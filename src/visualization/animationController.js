import { useEffect, useState } from 'react'

// Maps the speed slider to how many animations steps happen per second
const STEPS_PER_SECOND = [2, 5, 10, 25, 60, 150, 400, 1000, 2500, 6000]
export const stepsPerSecondFor = (speed) => STEPS_PER_SECOND[speed - 1]

export function usePlayback(lastTick, stepsPerSecond) {
    const [tick, setTick] = useState(0)
    const [paused, setPaused] = useState(false)
    const done = tick >= lastTick

    useEffect(() => {
        if (paused || done) return undefined

        let frameId
        let previous = performance.now()
        let carry = 0 // leftover fraction of a step between frames

        const onFrame = (now) => {
            carry += ((now - previous) / 1000) * stepsPerSecond
            previous = now
            const advance = Math.floor(carry)
            if (advance > 0) {
                carry -= advance
                setTick((t) => Math.min(t + advance, lastTick))
            }

            frameId = requestAnimationFrame(onFrame)
        }

        frameId = requestAnimationFrame(onFrame)
        return () => cancelAnimationFrame(frameId)
    }, [paused, done, stepsPerSecond, lastTick])
    
    return {tick, paused, done, togglePause: () => setPaused((p) => !p), restart: () => { setTick(0), setPaused(false)}, }
}