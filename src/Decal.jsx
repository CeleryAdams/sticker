import { Decal, useTexture } from '@react-three/drei'


export default function Sticker({cubeRef, useSticker})
{
    const decalRef = useRef
    const decalTexture = useTexture('./screen-sticker.png')

    console.log(cubeRef.current)
    return <>
        <Decal 
            ref={decalRef}
            debug
            scale={0.5}
            polygonOffset
            polygonOffsetFactor={0}
            position={[0, 1, 0]}
            >
            <meshBasicMaterial map={decalTexture} depthWrite={false}/>
        </Decal>
    
    </>
}