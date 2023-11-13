import useSticker from "../stores/useSticker.jsx"
import StickerMenu from "./StickerMenu.jsx"
import Slider from "./slider.jsx"
import { useEffect } from "react"

export default function Interface()
{
    const clear = useSticker((state) => state.clear)
    const undo = useSticker((state) => state.undo)
    const rotate45 = useSticker(state=> state.rotate45)
    const rotate45Cc = useSticker(state=> state.rotate45Cc)
    const stickerRotation = useSticker(state=> state.stickerRotation)


    //keyboard controls for rotation
    const handleKeyDown = (event) =>
    {
        switch (event.key)
        {
            case 'ArrowRight':
                rotate45()
                break
            case 'ArrowLeft':
                rotate45Cc()
                break
            default:
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
    
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
        };
      }, [stickerRotation]);


    return <div className='interface'>
        <div className='button-container'>
            <div className='undo' onClick={ undo }>Undo</div>
            <div className='reset' onClick={ clear }>Clear</div>
        </div>
        <div className='menu'>
            <StickerMenu />
            <Slider />
            <div className='rotate' onClick={rotate45}>↻</div>
        </div>
    </div>
}