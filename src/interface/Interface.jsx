import useSticker from '../stores/useSticker.jsx'
import ContextMenu from './ContextMenu.jsx'
import StickerMenu from './StickerMenu.jsx'
import Storage from './Storage.jsx'
import Slider from './Slider.jsx'
import { useEffect, useRef, useState } from 'react'
import ClearButton from '/images/clear-button.png'
import UndoButton from '/images/undo-button.png'
import InfoButton from '/images/info-button.png'
import StarButton from '/images/star-button.png'
import LeftButton from '/images/left-button.png'
import RightButton from '/images/right-button.png'
import FlowerThumb from '/images/flower-thumb.png'
import PlusContext from '/images/plus-context.png'
import MinusContext from '/images/minus-context.png'
import Close from '/images/close-x.svg'

export default function Interface()
{
    const clear = useSticker((state) => state.clear)
    const undo = useSticker((state) => state.undo)
    const rotate45 = useSticker(state=> state.rotate45)
    const rotate45Cc = useSticker(state=> state.rotate45Cc)
    const menuOpen = useSticker((state) => state.menuOpen)
    const setMenuOpen = useSticker((state) => state.setMenuOpen)

    const [ infoOpen, setInfoOpen ] = useState(false)
    const infoRef = useRef()

    //detect touch device

    const isTouchDevice = () => {
        return (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0))
    }

    //open sticker menu
    const openMenu = (event) => 
    {
        setMenuOpen(!menuOpen)
        event.stopPropagation()
    }

    const openInfoMenu = (event) =>
    {
        setInfoOpen(!infoOpen)
        event.stopPropagation()
    }


    //close with esc
    useEffect(()=>
    {
        const handleKeyDown = (event) => 
        {
            if (event.key === 'Escape')
            {
                setMenuOpen(false)
                setInfoOpen(false)
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])


    //close info on outside click
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (infoRef.current && !infoRef.current.contains(event.target))
            {
                setInfoOpen(false)
                event.stopPropagation()
            }
        }

        document.addEventListener('click', handleOutsideClick)

        return () => document.removeEventListener('click', handleOutsideClick)
    }, [infoRef])

    

    return <div className='interface'>
        <div className = 'top-menu'>
            <div className='top-left-buttons'>
                <Storage />
            </div>
            <div className='top-right-buttons'>
                <div className='undo top-button animate-button' onClick={ undo }><img src={UndoButton} alt="undo button"/></div>
                <div className='reset top-button animate-button' onClick={ clear }><img src={ClearButton} alt="clear button"/></div>
            </div>
        </div>
        <div className='bottom-menu'>
            <div className='info animate-button' onClick={openInfoMenu}><img src={InfoButton} alt='info button'/></div>
            <div className='bottom-center-menu'>
                <div className='open-menu bottom-button animate-button' onClick={openMenu}><img src={StarButton} alt='sticker menu button'/></div>
                <Slider />
                <div className='rotate bottom-button animate-button' onClick={rotate45Cc}><img src={LeftButton} alt='rotate left button'/></div>
                <div className='rotate bottom-button animate-button' onClick={rotate45}><img src={RightButton} alt='rotate left button'/></div>
            </div>
        </div>

        {infoOpen && <div className='info-overlay animate-modal' ref={infoRef}>
            <img className='close-info animate-button' src={Close} alt='close button' onClick={()=>setInfoOpen(false)}/>
            {!isTouchDevice() &&
                <>
                    <div className='spacer-top'></div>
                    <h2>CAMERA</h2>
                    <ul>
                        <li><span className='bold'>Zoom: </span>Middle wheel</li>
                        <li><span className='bold'>Rotate camera: </span>Left click</li>
                        <li><span className='bold'>Pan camera: </span>Shift + left click</li>
                    </ul>
                    <div className='spacer-middle'></div>
                    <h2>STICKERS</h2>
                    <ul>
                        <li>
                            <span className='bold'>Open sticker menu: </span>
                            Left click
                            <img className='text-icon' src={StarButton} alt='sticker menu button image' />
                        </li>
                        <li>
                            <span className='bold'>Place sticker: </span>
                            Left click on duck
                        </li>
                        <li>
                            <span className='bold'>Quick edit menu: </span>
                            Right click on duck
                        </li>
                        <li>
                            <span className='bold'>Rotate sticker: </span>
                            Left click
                            <img className='text-icon' src={LeftButton} alt='rotate left button image' />
                            <img className='text-icon' src={RightButton} alt='rotate right button image' />
                        </li>
                        <li><span className='bold'>Change sticker size: </span>
                            Left click and drag
                            <img className='text-icon' src={FlowerThumb} alt='flower slider thumb image' />
                        </li>
                    </ul>
                    <div className='spacer-middle'></div>
                    <h2>SAVING AND LOADING</h2>
                    <div className='info-text'>
                        <span className='bold'>Saving: </span>
                        Name your duck to save. Names are case-senstive and can't be overwritten.
                    </div>
                    <div className='info-text'>
                        <span className='bold'>Loading: </span>
                        Enter a  saved name to load. Edits to loaded designs won't alter the saved file.
                    </div>
                </>
            }       

            {isTouchDevice() &&
            <>
                <ul>
                    <li>
                        <span className='bold'>Open sticker menu: </span>
                        <img className='text-icon' src={StarButton} alt='sticker menu button image' />
                    </li>
                    <li>
                        <span className='bold'>Position sticker: </span>
                        Tap duck
                    </li>
                    <li>
                        <span className='bold'>Place sticker: </span>
                        Tap duck (again)
                    </li>
                    <li>
                        <span className='bold'>Rotate sticker: </span>
                        <img className='text-icon' src={LeftButton} alt='rotate left button image' />
                        <img className='text-icon' src={RightButton} alt='rotate right button image' />
                    </li>
                    <li><span className='bold'>Sticker size: </span>
                        Hold and drag
                        <img className='text-icon' src={FlowerThumb} alt='flower slider thumb image' />
                    </li>
                </ul>
                    <div className='info-text'>
                        <span className='bold'>Saving: </span>
                        Name your duck to save. Names are case-senstive and can't be overwritten.
                    </div>
                    <div className='info-text'>
                        <span className='bold'>Loading: </span>
                        Enter a  saved name to load. Edits to loaded designs won't alter the saved file.
                    </div>
            </>
            }
        </div>}

        <StickerMenu />
        <ContextMenu />   
    </div>
}