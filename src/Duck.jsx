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
    const stickerRotation = useSticker(state => state.stickerRotation)
    const rotate45 = useSticker(state=> state.rotate45)
    const selectedSticker = useSticker(state=> state.selectedSticker)
    const menuOpen = useSticker((state) => state.menuOpen)
    const setMenuOpen = useSticker((state) => state.setMenuOpen)


    //load texture
    const selectedStickerTexture = useTexture(`./${selectedSticker}.png`)

    const textureCenter=new THREE.Vector2(0.5, 0.5)
    useEffect(()=> {
        selectedStickerTexture.center = textureCenter
        selectedStickerTexture.rotation=stickerRotation
    }, [stickerRotation])


    //array of stickers
    const [stickers, setStickers] = useState([])

    const addSticker = () =>
    {
        const stickerTexture = selectedStickerTexture.clone()
        stickerTexture.needsUpdate = true
        setStickers([...stickers, 
        {
            id: stickers.length,
            renderOrder: stickers.length,
            rotation: [helperRef.current.rotation.x, helperRef.current.rotation.y, helperRef.current.rotation.z],
            position: [helperRef.current.position.x, helperRef.current.position.y, helperRef.current.position.z],
            scale: scale * 0.5,
            stickerRotation: stickerRotation,
            texture: stickerTexture
        }])   
    }


    //reset stickers
    const reset = () => {
        setStickers([])
        setScale(1)
    }

    const undo = () => {
        setStickers((stickers) => {
            const stickersCopy = [...stickers]
            stickersCopy.pop()
            return stickersCopy
        })
        start()
    }

    // useEffect(() => {
    //     console.log(stickers)
    // }
    // , [stickers])

    useEffect(() =>
    {
        const unsubscribeReset = useSticker.subscribe(
            (state) => state.phase,
            (value) => value === 'cleared' && reset()
        )

        const unsubscribeUndo = useSticker.subscribe(
            (state) => state.phase,
            (value) => value === 'undo' && undo()
        )

        return () => 
        {
            unsubscribeUndo()
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
            scale={scale} 
            onClick={() => {
                addSticker()
                start()
            }}
            onContextMenu={() =>setMenuOpen(true)}
            renderOrder = {stickers.length + 1}
        >
                {/* <boxGeometry args={[0.5, 0.5, 0.25]} /> */}
                <planeGeometry args={[0.5, 0.5]} />
                <meshBasicMaterial map={selectedStickerTexture} transparent side={THREE.DoubleSide} opacity={0.6} depthWrite={false}/>
        </mesh>

        <Sticker stickers={stickers} duckRef={duckRef}/>
    </>
}