import useSticker from "../stores/useSticker.jsx"
import { useState, useEffect, useRef } from 'react'

export default function StickerMenu()
{
    const selectedSticker = useSticker((state) => state.selectedSticker)
    const setSticker = useSticker((state) => state.setSticker)
    const menuOpen = useSticker((state) => state.menuOpen)
    const setMenuOpen = useSticker((state) => state.setMenuOpen)
    const menuRef = useRef()

    const stickers = [
        {id: 'sticker', texturePath: './sticker.png'},
        {id: 'sticker2', texturePath: './sticker2.png'},
        {id: 'sticker3', texturePath: './sticker3.png'},
        {id: 'sticker4', texturePath: './sticker4.png'},
        {id: 'sticker5', texturePath: './sticker4.png'},
        {id: 'sticker', texturePath: './sticker.png'},
        {id: 'sticker2', texturePath: './sticker2.png'},
        {id: 'sticker3', texturePath: './sticker3.png'},
        {id: 'sticker4', texturePath: './sticker4.png'},
        {id: 'sticker4', texturePath: './sticker4.png'},
    ]

    const handleStickerClick = (sticker) =>
    {
        setSticker(sticker.id)
        // setMenuOpen(false)
    }

    //close menu on outside click
    useEffect(() => {
        console.log(menuRef)
        const handleOutsideClick = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target))
                setMenuOpen(false)
        }

        document.addEventListener('click', handleOutsideClick)

        return () => document.removeEventListener('click', handleOutsideClick)
    }, [menuRef])


    //prevent event propagation from closing menu automatically


    return <div>
        
        {menuOpen &&
            <div className = 'menu-container'>
                <div className='close-button'>x</div> 
                <div className='grid-menu' ref={menuRef}>
                    {stickers.map((sticker) => (
                        <div
                            onClick={() => handleStickerClick(sticker)}
                            key={sticker.id}
                            className={`grid-item ${selectedSticker === sticker.id ? 'selected' : ''}`}
                        >
                            <img className='inventory-image' src={sticker.texturePath}/>
                        </div>
                    ))}
                </div>
            </div>
        }
    </div>
}