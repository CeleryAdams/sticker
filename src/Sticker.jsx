import { Decal, useTexture } from '@react-three/drei'
import { useEffect, useRef } from 'react'


export default function Sticker({cubeRef, stickers})
{
    const decalRef = useRef()
    const decalTexture = useTexture('./screen-sticker.png')
    useEffect(()=>{console.log(stickers)}, [stickers[0]])

    return <>
        {stickers.map(sticker => (
            <Decal
                key={sticker.id} 
                mesh={cubeRef}
                ref={decalRef}
                // debug
                scale={0.5}
                polygonOffset
                polygonOffsetFactor={-4}
                rotation={sticker.rotation}
                position={sticker.position}
                renderOrder={sticker.renderOrder}
                >
                <meshBasicMaterial map={decalTexture} transparent depthWrite={false}/>
            </Decal>
        ))}
    </>
}