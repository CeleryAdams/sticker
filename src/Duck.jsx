import { Decal, OrbitControls, useTexture} from '@react-three/drei'
import {useFrame} from '@react-three/fiber'
import { useRef, useState } from 'react'
import Sticker from './Decal'

export default function Duck()
{
    const cubeRef = useRef()
    const helperRef = useRef()

    const decalRef = useRef()
    const decalTexture = useTexture('./screen-sticker.png')

    const [ useSticker, setSticker ] = useState(false)


    // //render helper only if there is an intersection
    // const [ helper, setHelper ] = useState(false)

    useFrame((state) => {
        updateHelperPosition(state.raycaster)
    })


    const updateHelperPosition = (raycaster) => {
        const intersects =[]
        const mesh = cubeRef.current
        raycaster.intersectObject(mesh, false, intersects)
        console.log[intersects]

        if (intersects.length <= 0)
        {
            // setHelper(false)
            return
        }
        else
        {
            // setHelper(true)

            if (helperRef.current) 
            {
                const n = intersects[0].face.normal.clone()
                n.transformDirection( mesh.matrixWorld )
                n.multiplyScalar(10)
                n.add( intersects[ 0 ].point )

                helperRef.current.position.copy((intersects[0].point))
                helperRef.current.lookAt(n)
                    
            }

            intersects.length=0
        }
    }

    return <>
        <OrbitControls makeDefault />
        <mesh 
            ref={ cubeRef }
            onPointerEnter={() => document.body.style.cursor = 'grab'}
            onPointerLeave={() => document.body.style.cursor = 'default'}
        >
            <sphereGeometry />
            <meshNormalMaterial depthWrite={false}/>
        </mesh>
        

        <mesh ref={helperRef} visible={true} onClick={() => setSticker(true)}>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshBasicMaterial color='red' />
        </mesh>

        <Decal 
            mesh={cubeRef}
            debug
            scale={0.5}
            polygonOffset
            polygonOffsetFactor={-4}
            // rotation={[1.6,0,0]}
            position={[0, 1, 0]}
            renderOrder={1}
            >
            <meshBasicMaterial map={decalTexture} transparent depthWrite={false}/>
            </Decal>

        {useSticker &&
            <Decal 
                mesh={cubeRef}
                ref={decalRef}
                debug
                scale={0.5}
                polygonOffset
                polygonOffsetFactor={-4}
                rotation={[helperRef.current.rotation.x, helperRef.current.rotation.y, helperRef.current.rotation.z]}
                position={[helperRef.current.position.x, helperRef.current.position.y, helperRef.current.position.z]}
                renderOrder={2}
                >
                <meshBasicMaterial map={decalTexture} transparent depthWrite={false}/>
            </Decal>
        }

        {/* {useSticker && <Sticker cubeRef={cubeRef} useSticker={useSticker}/>} */}
    </>
}