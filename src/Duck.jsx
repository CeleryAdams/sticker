import { OrbitControls, useTexture} from '@react-three/drei'
import {useFrame} from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import Sticker from './Sticker'
import useSticker from './stores/useSticker'

export default function Duck()
{
    const duckRef = useRef()
    const helperRef = useRef()


    //global state
    const start = useSticker((state) => state.start)
    const scale = useSticker((state) => state.scale)
    const setScale = useSticker((state) => state.setScale)

    //load texture
    const decalTexture = useTexture('./screen-sticker.png')


    //array of stickers
    const [stickers, setStickers] = useState([])

    const addSticker = () =>
    {
        setStickers([...stickers, 
        {
            id: stickers.length,
            renderOrder: stickers.length,
            rotation: [helperRef.current.rotation.x, helperRef.current.rotation.y, helperRef.current.rotation.z],
            position: [helperRef.current.position.x, helperRef.current.position.y, helperRef.current.position.z],
            scale: scale * 0.5
        }])   
    }


    //reset stickers
    const reset = () => {
        setStickers([])
        setScale(1)
        helperRef.current.position.set(0,0,0)

    }


    useEffect(() =>
    {
        const unsubscribeReset = useSticker.subscribe(
            (state) => state.phase,
            (value) =>
            {
                if(value === 'cleared')
                    reset()
            }
        )

        return () => 
        {
            unsubscribeReset()
        }
    }, [])

    // //render helper only if there is an intersection
    // const [ helper, setHelper ] = useState(false)


    useFrame((state) => {
        updateHelperPosition(state.raycaster)
    })


    const updateHelperPosition = (raycaster) => {
        const intersects =[]
        const mesh = duckRef.current
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
                console.log(helperRef.current.rotation)
                helperRef.current.lookAt(n)    
            }

            intersects.length=0
        }
    }

    return <>
        <OrbitControls makeDefault />
        <mesh 
            ref={ duckRef }
            onPointerEnter={() => document.body.style.cursor = 'grab'}
            onPointerLeave={() => document.body.style.cursor = 'default'}
        >
            <sphereGeometry />
            <meshNormalMaterial depthWrite={false} wireframe/>
        </mesh>
        

        <mesh 
            ref={helperRef} 
            visible={true}
            // scale={scale} 
            onClick={() => {
                addSticker()
                start()
            }}
        >
                {/* <boxGeometry args={[0.5, 0.5, 0.25]} /> */}
                <planeGeometry args={[0.5, 0.5]} />
                <meshBasicMaterial map={decalTexture} transparent side={THREE.DoubleSide}/>
        </mesh>

        <Sticker stickers={stickers} duckRef={duckRef}/>
    </>
}