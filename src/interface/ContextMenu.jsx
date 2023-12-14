import useSticker from '../stores/useSticker.jsx'
import { useEffect, useRef } from 'react'

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
                <div className='rotate' onClick={(event)=>
                    {
                        setMenuOpen(!menuOpen)
                        setContextMenuOpen(false)
                        event.stopPropagation()
                    }
                    }>{':)'}</div>
                <div className='rotate' onClick={rotate45Cc}>↺</div>
                <div className='rotate' onClick={rotate45}>↻</div>
                <div className='rotate' onClick={increment}>+</div>
                <div className='rotate' onClick={decrement}>-</div>
                <div className='rotate' 
                    onClick={(event)=>
                    {
                        setContextMenuOpen(false)
                        event.stopPropagation()
                    }}
                >x
                </div>
            </div>
        }
    </>
}