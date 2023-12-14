import useSticker from '../stores/useSticker.jsx'
import ContextMenu from './ContextMenu.jsx'
import StickerMenu from './StickerMenu.jsx'
import Storage from './Storage.jsx'
import Slider from './slider.jsx'
import { useEffect } from 'react'

export default function Interface()
{
    const clear = useSticker((state) => state.clear)
    const undo = useSticker((state) => state.undo)
    const rotate45 = useSticker(state=> state.rotate45)
    const rotate45Cc = useSticker(state=> state.rotate45Cc)
    const stickerRotation = useSticker(state=> state.stickerRotation)
    const menuOpen = useSticker((state) => state.menuOpen)
    const setMenuOpen = useSticker((state) => state.setMenuOpen)


    //keyboard controls for rotation
    const handleKeyDown = (event) =>
    {``
        switch (event.key)
        {
            case ' ':
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



    //open menu
    const openMenu = (event) => {
        setMenuOpen(!menuOpen)
        event.stopPropagation()
    }


    return <div className='interface'>
        <div className='button-container'>
            <Storage />
            <div className='undo' onClick={ undo }>Undo</div>
            <div className='reset' onClick={ clear }>Clear</div>
            <div className='info'>Info</div>
        </div>
        <div className='bottom-menu'>
            <div className='open-menu' onClick={openMenu}>☺</div>
            <Slider />
            <div className='rotate' onClick={rotate45Cc}>↺</div>
            <div className='rotate' onClick={rotate45}>↻</div>
        </div>
        <StickerMenu />
        <ContextMenu />   
    </div>
}