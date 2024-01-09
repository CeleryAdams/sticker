import useSticker from '../stores/useSticker.jsx'
import ContextMenu from './ContextMenu.jsx'
import StickerMenu from './StickerMenu.jsx'
import Storage from './Storage.jsx'
import Slider from './slider.jsx'
import { useEffect, useRef, useState } from 'react'
import ClearButton from '/images/clear-button.png'
import UndoButton from '/images/undo-button.png'
import InfoButton from '/images/info-button.png'
import StarButton from '/images/star-button.png'
import LeftButton from '/images/left-button.png'
import RightButton from '/images/right-button.png'
import FlowerThumb from '/images/flower-thumb.png'
import LeftContext from '/images/left-context.png'
import RightContext from '/images/right-context.png'
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
        return (('ontouchstart' in window) ||
           (navigator.maxTouchPoints > 0) ||
           (navigator.msMaxTouchPoints > 0))
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

    useEffect(()=>
    {
        console.log("info open", infoOpen, "info ref", infoRef)
    }, [infoOpen, infoRef])
        

    return <div className='interface'>
        <div className = 'top-menu'>
            <div className='top-left-buttons'>
                <Storage />
            </div>
            <div className='top-right-buttons'>
                <div className='undo top-button' onClick={ undo }><img src={UndoButton} alt="undo button"/></div>
                <div className='reset top-button' onClick={ clear }><img src={ClearButton} alt="clear button"/></div>
            </div>
        </div>
        <div className='bottom-menu'>
            <div className='info' onClick={openInfoMenu}><img src={InfoButton} alt='info button'/></div>
            <div className='bottom-center-menu'>
                <div className='open-menu bottom-button' onClick={openMenu}><img src={StarButton} alt='sticker menu button'/></div>
                <Slider />
                <div className='rotate bottom-button' onClick={rotate45Cc}><img src={LeftButton} alt='rotate left button'/></div>
                <div className='rotate bottom-button' onClick={rotate45}><img src={RightButton} alt='rotate left button'/></div>
            </div>
        </div>

        {infoOpen && <div className='info-overlay' ref={infoRef}>
            <img className='close-x' src={Close} alt='close button' onClick={()=>setInfoOpen(false)}/>
            {!isTouchDevice() &&
                <>
                    <div className='spacer-top'></div>
                    <h2>CAMERA</h2>
                    <ul>
                        <li><span className='bold'>zoom: </span>middle wheel</li>
                        <li><span className='bold'>rotate camera: </span>left click</li>
                        <li><span className='bold'>pan camera: </span>shift + left click</li>
                    </ul>
                    <div className='spacer-middle'></div>
                    <h2>STICKERS</h2>
                    <ul>
                        <li>
                            <span className='bold'>open sticker menu: </span>
                            left click
                            <img className='text-icon' src={StarButton} alt='sticker menu button image' />
                        </li>
                        <li>
                            <span className='bold'>place sticker: </span>
                            left click on duck
                        </li>
                        <li>
                            <span className='bold'>quick edit menu: </span>
                            right click on duck
                        </li>
                        <li>
                            <span className='bold'>rotate sticker: </span>
                            left click
                            <img className='text-icon' src={LeftButton} alt='rotate left button image' />
                            <img className='text-icon' src={RightButton} alt='rotate right button image' />
                        </li>
                        <li><span className='bold'>change sticker size: </span>
                            left click and drag
                            <img className='text-icon' src={FlowerThumb} alt='flower slider thumb image' />
                        </li>
                        <li><span className='bold'>change sticker size (quick menu): </span>
                            left click 
                        <img className='text-icon' src={LeftContext} alt='rotate left context menu button image' />
                        <img className='text-icon' src={RightContext} alt='rotate right context menu button image' />
                        </li>
                    </ul>
                </>
            }       

            {isTouchDevice() &&
            <>
                <ul>
                    <li>
                        <span className='bold'>open sticker menu: </span>
                        <img className='text-icon' src={StarButton} alt='sticker menu button image' />
                    </li>
                    <li>
                        <span className='bold'>place sticker: </span>
                        tap duck
                    </li>
                    <li>
                        <span className='bold'>rotate sticker: </span>
                        <img className='text-icon' src={LeftButton} alt='rotate left button image' />
                        <img className='text-icon' src={RightButton} alt='rotate right button image' />
                    </li>
                    <li><span className='bold'>change sticker size: </span>
                        hold and drag
                        <img className='text-icon' src={FlowerThumb} alt='flower slider thumb image' />
                    </li>
                </ul>
            </>
            }
        </div>}

        <StickerMenu />
        <ContextMenu />   
    </div>
}