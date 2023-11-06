import { useState, useEffect } from 'react'

export default function MouseSticker()
{
    const [position, setPosition] = useState({ x:0, y:0 })

    useEffect(() => 
    {
        const handleMouseMove = (event) => 
        {
            setPosition({x: event.clientX, y: event.clientY})
        }
        
        window.addEventListener('mousemove', handleMouseMove)

        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])


    return <>
        <div style={{ 
            position: 'fixed', 
            left: `${position.x}px`, 
            top: `${position.y}px`,

            //position sticker to one side of cursor - tbd based on UI
            transform: 'translate(30%, -50%)'
        }}>
            <img src='./screen-sticker.png' />
        </div>
    </>
}