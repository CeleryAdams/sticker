import useSticker from '../stores/useSticker'
import { useEffect } from 'react'


export default function Slider()
{
    const scale = useSticker((state) => state.scale)
    const setScale = useSticker((state) => state.setScale)


    const sliderRange = [0.3, 2.0]

    //remap range input to thumb scale range
    const remap = [0.4, 1.3]

    let thumbScale = remap[0] + ((remap[1] - remap[0]) / (sliderRange[1] - sliderRange[0]) * (scale - sliderRange[0]))
    document.documentElement.style.setProperty('--thumb-scale', thumbScale)
    

    const handleScaleChange = (event) => {
        setScale(parseFloat(event.target.value))
        thumbScale = remap[0] + ((remap[1] - remap[0]) / (sliderRange[1] - sliderRange[0]) * (event.target.value - sliderRange[0]))
        document.documentElement.style.setProperty('--thumb-scale', thumbScale)
    }

    const increment = () => scale < sliderRange[1] ? setScale(scale + 0.1) : setScale(sliderRange[1])
    const decrement = () => scale > sliderRange[0] ? setScale(scale - 0.1) : setScale(sliderRange[0])


    //keyboard controls for size increment and decrement
    const handleKeyDown = (event) =>
    {
        switch (event.key)
        {
            case 'ArrowUp':
                increment()
                break
            case 'ArrowDown':
                decrement()
                break
            default:
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
    
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
        };
      }, [scale]);


    return <>
        {/* <div className='minus' onClick={decrement}>-</div> */}
        <input
            className='slider-range'
            type='range'
            value={scale}
            step={0.1}
            min={ sliderRange[0] }
            max={ sliderRange[1] }
            onChange={handleScaleChange}
            onKeyDown={(event)=>event.preventDefault()}
        />
        {/* <div className='plus' onClick={increment}>+</div> */}
    </>
}