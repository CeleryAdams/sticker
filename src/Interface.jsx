import { useEffect, useRef, useState } from "react"
import useSticker from "./stores/useSticker.jsx"


export default function Interface()
{
    const clear = useSticker((state) => state.clear)
    const scale = useSticker((state) => state.scale)
    const setScale = useSticker((state) => state.setScale)
    

    const handleScaleChange = (event) => {
        const value = parseFloat(event.target.value)
        setScale(value)
    }

    return <div className='interface'>
        <div className='reset' onClick={ clear }>Reset</div>
        <div className='slider'>
            <input
                className='slider-range'
                type='range'
                value={scale}
                step={0.1}
                min={0.3}
                max={2.0}
                onChange={handleScaleChange}
            />
        </div>
    </div>
}