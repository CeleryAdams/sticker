import useSticker from "../stores/useSticker.jsx"
import { useState, useEffect, useRef } from 'react'

export default function StickerMenu()
{
    const selectedSticker = useSticker((state) => state.selectedSticker)
    const setSticker = useSticker((state) => state.setSticker)
    const menuOpen = useSticker((state) => state.menuOpen)
    const setMenuOpen = useSticker((state) => state.setMenuOpen)
    const menuRef = useRef()


    //id and filename need to match

    const stickers = [
        {id: 'sticker-01', texturePath: './stickers/sticker-01.png'},
        // {id: 'sticker-02', texturePath: './stickers/sticker-02.png'},
        // {id: 'sticker-03', texturePath: './stickers/sticker-03.png'},
        // {id: 'sticker-04', texturePath: './stickers/sticker-04.png'},
        // {id: 'sticker-05', texturePath: './stickers/sticker-05.png'},
        // {id: 'sticker-06', texturePath: './stickers/sticker-06.png'},
        // {id: 'sticker-07', texturePath: './stickers/sticker-07.png'},
        // {id: 'sticker-08', texturePath: './stickers/sticker-08.png'},
        // {id: 'sticker-09', texturePath: './stickers/sticker-09.png'},
        // {id: 'sticker-10', texturePath: './stickers/sticker-10.png'},
        // {id: 'sticker-11', texturePath: './stickers/sticker-11.png'},
        // {id: 'sticker-12', texturePath: './stickers/sticker-12.png'},
        // {id: 'sticker-13', texturePath: './stickers/sticker-13.png'},
        // {id: 'sticker-14', texturePath: './stickers/sticker-14.png'},
        // {id: 'sticker-15', texturePath: './stickers/sticker-15.png'},
        // {id: 'sticker-16', texturePath: './stickers/sticker-16.png'},
        {id: 'sticker-17', texturePath: './stickers/sticker-17.png'},
        {id: 'sticker-18', texturePath: './stickers/sticker-18.png'},
        {id: 'sticker-19', texturePath: './stickers/sticker-19.png'},
        {id: 'sticker-20', texturePath: './stickers/sticker-20.png'},
        {id: 'sticker-21', texturePath: './stickers/sticker-21.png'},
        {id: 'sticker-22', texturePath: './stickers/sticker-22.png'},
        {id: 'sticker-23', texturePath: './stickers/sticker-23.png'},
        {id: 'sticker-24', texturePath: './stickers/sticker-24.png'},
        {id: 'sticker-25', texturePath: './stickers/sticker-25.png'},
        {id: 'sticker-26', texturePath: './stickers/sticker-26.png'},
        {id: 'sticker-27', texturePath: './stickers/sticker-27.png'},
        {id: 'sticker-28', texturePath: './stickers/sticker-28.png'},
        {id: 'sticker-29', texturePath: './stickers/sticker-29.png'},
        {id: 'sticker-30', texturePath: './stickers/sticker-30.png'},
        {id: 'sticker-31', texturePath: './stickers/sticker-31.png'},
        {id: 'sticker-32', texturePath: './stickers/sticker-32.png'},
    ]

    const handleStickerClick = (sticker) =>
    {
        setSticker(sticker.id)
        // setMenuOpen(false)
    }

    //close menu on outside click
    useEffect(() => {
        // console.log(menuRef)
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