import { Decal, useTexture } from '@react-three/drei'
import { useEffect, useRef } from 'react'


export default function Sticker({duckRef, stickers})
{
    const decalRef = useRef()
    const decalTexture = useTexture('./screen-sticker.png')

    useEffect(() => console.log(stickers), [])


    return <>
        {stickers.map(sticker => (
            <Decal
                key={sticker.id} 
                mesh={duckRef}
                ref={decalRef}
                // debug
                scale={sticker.scale}
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