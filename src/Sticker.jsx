import { Decal, useTexture } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'


export default function Sticker({duckRef, stickers})
{
    const decalRef = useRef()
    const stickerTexture = useTexture('./screen-sticker2.png')
    stickerTexture.needsUpdate = true
    const textureCenter=new THREE.Vector2(0.5, 0.5)
    // useEffect(() => console.log(stickers.rotationZ), [stickers])


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
                <meshBasicMaterial map={sticker.texture} transparent depthWrite={false}/>
            </Decal>
        ))}
    </>
}