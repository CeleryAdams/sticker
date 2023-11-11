import { useEffect, useRef, useState } from "react"
import useSticker from "./stores/useSticker.jsx"


export default function Interface()
{
    const clear = useSticker((state) => state.clear)
    const undo = useSticker((state) => state.undo)
    const scale = useSticker((state) => state.scale)
    const setScale = useSticker((state) => state.setScale)

    const sliderRange = [0.3, 2.0]
    const remap = [0.4, 1.4]
    

    const handleScaleChange = (event) => {
        setScale(parseFloat(event.target.value))
        let thumbScale = remap[0] + ((remap[1] - remap[0]) / (sliderRange[1] - sliderRange[0]) * (event.target.value - sliderRange[0]))
        document.documentElement.style.setProperty('--thumb-scale', thumbScale)
        console.log(event.target.value)
    }

    return <div className='interface'>
        <div className='button-container'>
            <div className='undo' onClick={ undo }>Undo</div>
            <div className='reset' onClick={ clear }>Clear</div>
        </div>
        <div className='slider'>
            <input
                className='slider-range'
                type='range'
                value={scale}
                step={0.1}
                min={ sliderRange[0] }
                max={ sliderRange[1] }
                onChange={handleScaleChange}
            />
        </div>
    </div>
}