import useSticker from '../stores/useSticker.jsx'
import { useState, useEffect, useRef } from 'react'
// import CloseMenu from '/images/close-menu.png'
import CloseMenu from '/images/close-x.svg'
import Previous from '/images/previous.png'
import Next from '/images/next.png'

export default function StickerMenu()
{
    const selectedSticker = useSticker((state) => state.selectedSticker)
    const setSticker = useSticker((state) => state.setSticker)
    const menuOpen = useSticker((state) => state.menuOpen)
    const setMenuOpen = useSticker((state) => state.setMenuOpen)
    const setStickerRotation = useSticker((state) => state.setStickerRotation)

    const [ currentPage, setCurrentPage ] = useState(1)
    const [ showPrevButton, setShowPrevButton ] = useState(false)
    const [ showNextButton, setShowNextButton ] = useState(false)

    const menuRef = useRef()
    const prevButtonRef = useRef()
    const nextButtonRef = useRef()


    //id and filename need to match

    const stickers = [
        {id: 'sticker-01', texturePath: './stickers/sticker-01.png'},
        {id: 'sticker-02', texturePath: './stickers/sticker-02.png'},
        {id: 'sticker-03', texturePath: './stickers/sticker-03.png'},
        {id: 'sticker-04', texturePath: './stickers/sticker-04.png'},
        {id: 'sticker-05', texturePath: './stickers/sticker-05.png'},
        {id: 'sticker-06', texturePath: './stickers/sticker-06.png'},
        {id: 'sticker-07', texturePath: './stickers/sticker-07.png'},
        {id: 'sticker-08', texturePath: './stickers/sticker-08.png'},
        {id: 'sticker-09', texturePath: './stickers/sticker-09.png'},
        {id: 'sticker-10', texturePath: './stickers/sticker-10.png'},
        {id: 'sticker-11', texturePath: './stickers/sticker-11.png'},
        {id: 'sticker-12', texturePath: './stickers/sticker-12.png'},
        {id: 'sticker-13', texturePath: './stickers/sticker-13.png'},
        {id: 'sticker-14', texturePath: './stickers/sticker-14.png'},
        {id: 'sticker-15', texturePath: './stickers/sticker-15.png'},
        {id: 'sticker-16', texturePath: './stickers/sticker-16.png'},
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
        {id: 'sticker-33', texturePath: './stickers/sticker-33.png'},
        {id: 'sticker-34', texturePath: './stickers/sticker-34.png'},
        {id: 'sticker-35', texturePath: './stickers/sticker-35.png'},
        {id: 'sticker-36', texturePath: './stickers/sticker-36.png'},
        {id: 'sticker-37', texturePath: './stickers/sticker-37.png'},
        {id: 'sticker-38', texturePath: './stickers/sticker-38.png'},
        {id: 'sticker-39', texturePath: './stickers/sticker-39.png'},
        {id: 'sticker-40', texturePath: './stickers/sticker-40.png'},
        {id: 'sticker-41', texturePath: './stickers/sticker-41.png'},
        {id: 'sticker-42', texturePath: './stickers/sticker-42.png'},
        {id: 'sticker-43', texturePath: './stickers/sticker-43.png'},
        {id: 'sticker-44', texturePath: './stickers/sticker-44.png'},
        {id: 'sticker-45', texturePath: './stickers/sticker-45.png'},
        {id: 'sticker-46', texturePath: './stickers/sticker-46.png'},
        {id: 'sticker-47', texturePath: './stickers/sticker-47.png'},
        {id: 'sticker-48', texturePath: './stickers/sticker-48.png'},
    ]


    const itemsPerPage = 16
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentStickers = stickers.slice(startIndex, endIndex)


    useEffect(()=>
    {
        currentPage > 1 ? setShowPrevButton(true) : setShowPrevButton(false)
        endIndex >= stickers.length ? setShowNextButton(false) : setShowNextButton(true)
    }, [currentPage])


    const handleStickerClick = (sticker) =>
    {
        setStickerRotation(0)
        setSticker(sticker.id)
        setMenuOpen(false)
    }

    //close menu on outside click
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (menuRef.current &&
                !menuRef.current.contains(event.target) &&
                event.target !== prevButtonRef.current &&
                event.target !== nextButtonRef.current)
                setMenuOpen(false)
        }

        document.addEventListener('click', handleOutsideClick)

        return () => document.removeEventListener('click', handleOutsideClick)
    }, [menuRef])


    return <div>
        
        {menuOpen &&
            <>
            <div className = 'menu-container animate-modal' >
                <div className='close-button animate-button'><img src={CloseMenu} alt='close menu button' tabIndex='0'/></div> 
                <div className='grid-menu' ref={menuRef}>
                    {currentStickers.map((sticker) => (
                        <div
                            onClick={() => handleStickerClick(sticker)}
                            key={sticker.id}
                            className={`grid-item ${selectedSticker === sticker.id ? 'selected' : ''}`}
                        >
                            <img className='inventory-image' src={sticker.texturePath}/>
                        </div>
                    ))}
                </div>
                {showPrevButton && 
                    <div 
                        className='previous-button animate-button' 
                        onClick={()=>setCurrentPage(currentPage-1)}
                    >
                        <img src={Previous} alt='previous page button' tabIndex='1' ref={prevButtonRef} />
                    </div>
                }
                {showNextButton &&
                    <div
                        className='next-button animate-button' 
                        onClick={()=>setCurrentPage(currentPage+1)}
                    >
                        <img src={Next} alt='next page button' tabIndex='2' ref={nextButtonRef} />
                    </div>}
            </div>
            
            </>
        }
    </div>
}