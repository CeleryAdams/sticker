import { Center, Decal, useTexture } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'


export default function Sticker({duckRef, stickers})
{
    const decalRef = useRef()


    return <>
        <Center>
            {stickers.map(sticker => (
                <Decal
                    key={sticker.id} 
                    mesh={duckRef}
                    ref={decalRef}
                    // debug
                    scale={sticker.scale}
                    rotation={sticker.rotation}
                    position={sticker.position}
                    renderOrder={sticker.renderOrder}
                >
                    <meshStandardMaterial 
                        map={sticker.texture} 
                            transparent 
                            depthWrite={false}
                            depthTest
                            polygonOffset
                            polygonOffsetFactor={-4}
                            roughness={0.2}
                            />
                </Decal>
            ))}
        </Center>
    </>
}