import useSticker from "../stores/useSticker.jsx"
import { useState, useEffect } from 'react'

export default function StickerMenu()
{
    const [ inventoryOpen, setInventoryOpen ] = useState(false)
    // const [ selectedSticker, setSelectedSticker ] = useState(null)
    const selectedSticker = useSticker((state) => state.selectedSticker)
    const setSticker = useSticker((state) => state.setSticker)

    const stickers = [
        {id: 'sticker', texturePath: './sticker.png'},
        {id: 'sticker2', texturePath: './sticker2.png'},
        {id: 'sticker3', texturePath: './sticker3.png'},
        {id: 'sticker4', texturePath: './sticker4.png'},
        {id: 'sticker5', texturePath: './sticker4.png'},
    ]

    const handleStickerClick = (sticker) =>
    {
        setSticker(sticker.id)
        setInventoryOpen(false)
    }

    return <div className={`inventory ${inventoryOpen? 'open' : ''}`}>
        <div className='inventory-button' onClick={()=> setInventoryOpen(!inventoryOpen)}>☺</div>
        {inventoryOpen && 
            <div className='grid-menu'>
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
        }
    </div>
}