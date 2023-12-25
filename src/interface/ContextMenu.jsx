import useSticker from '../stores/useSticker.jsx'
import { useEffect, useRef } from 'react'
import LeftContext from '/images/left-context.png'
import RightContext from '/images/right-context.png'
import StarContext from '/images/star-context.png'
import PlusContext from '/images/plus-context.png'
import MinusContext from '/images/minus-context.png'
import CloseContext from '/images/close-context.png'

export default function ContextMenu()
{
    const contextMenuOpen = useSticker((state) => state.contextMenuOpen)
    const setContextMenuOpen = useSticker((state) => state.setContextMenuOpen)
    const contextMenuPosition = useSticker((state) => state.contextMenuPosition)
    const rotate45 = useSticker(state=> state.rotate45)
    const rotate45Cc = useSticker(state=> state.rotate45Cc)

    const menuOpen = useSticker((state) => state.menuOpen)
    const setMenuOpen = useSticker((state) => state.setMenuOpen)

    const scale = useSticker((state) => state.scale)
    const setScale = useSticker((state) => state.setScale)

    const menuRef = useRef()


    //values manually retrieved from Slider.jsx
    const sliderRange = [0.3, 2.0]

    const increment = () => scale < sliderRange[1] ? setScale(scale + 0.1) : setScale(sliderRange[1])
    const decrement = () => scale > sliderRange[0] ? setScale(scale - 0.1) : setScale(sliderRange[0])

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target))
                setContextMenuOpen(false)
        }

        document.addEventListener('click', handleOutsideClick)

        return () => document.removeEventListener('click', handleOutsideClick)
    }, [menuRef])

    const openMenu = (event) => {
        setMenuOpen(!menuOpen)
        event.stopPropagation()
    }


    return <>
        {contextMenuOpen &&
            <div className='contextMenu'
                ref={menuRef}
                style={{
                    position: 'fixed',
                    left: `${contextMenuPosition.x}px`,
                    top: `${contextMenuPosition.y}px`
                }}
            >
                
                <div className='rotate-group'>
                    <div className='rotate context-button' onClick={rotate45Cc}><img src={LeftContext} alt='rotate left context menu button'/></div>
                    <div className='rotate context-button' onClick={rotate45}><img src={RightContext} alt='rotate right context menu button'/></div>
                </div>

                <div className='context-group'>
                    <div className='open-menu context-button' onClick={(event)=>
                        {
                            setMenuOpen(!menuOpen)
                            setContextMenuOpen(false)
                            event.stopPropagation()
                        }
                        }><img src={StarContext} alt='open sticker menu context menu button'/>
                    </div>
                    <div className='close context-button' 
                        onClick={(event)=>
                        {
                            setContextMenuOpen(false)
                            event.stopPropagation()
                        }}
                        ><img src={CloseContext} alt='close context menu button'/>
                    </div>
                </div>
                <div className='size-group'>
                    <div className='increment context-button' onClick={increment}><img src={PlusContext} alt='increase size context menu button'/></div>
                    <div className='decrement context-button' onClick={decrement}><img src={MinusContext} alt='decrease size context menu button'/></div>
                </div>
            </div>

        }
    </>
}