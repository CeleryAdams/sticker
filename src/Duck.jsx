import { OrbitControls, useGLTF, useTexture} from '@react-three/drei'
import {useFrame} from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import Sticker from './Sticker'
import useSticker from './stores/useSticker'


export default function Duck()
{
    const duckRef = useRef()
    const helperRef = useRef()
    const stickerScale = 0.15

    //load duck model and textures
    const { nodes } = useGLTF("/duck.glb")

    const duckTexture = useTexture("./baked-duck-3.jpg")
    duckTexture.flipY = false
    duckTexture.needsUpdate = true

    const duckGlossyTexture = useTexture("./baked-duck-glossy.jpg")
    duckGlossyTexture.flipY = false
    duckGlossyTexture.needsUpdate = true


    //global state
    const start = useSticker((state) => state.start)
    const scale = useSticker((state) => state.scale)
    const setScale = useSticker((state) => state.setScale)
    const stickerRotation = useSticker(state => state.stickerRotation)
    const selectedSticker = useSticker(state=> state.selectedSticker)
    const setMenuOpen = useSticker((state) => state.setMenuOpen)


    //load sticker texture
    const selectedStickerTexture = useTexture(`./stickers/${selectedSticker}.png`)

    const textureCenter=new THREE.Vector2(0.5, 0.5)
    useEffect(()=> {
        selectedStickerTexture.center = textureCenter
        selectedStickerTexture.rotation=stickerRotation
    }, [stickerRotation])


    //parse sticker textures from JSON
    const parseStickerTexture = (selectedSticker, stickerRotation) =>
    {
        const parsedStickerTexture = new THREE.TextureLoader().load(`./stickers/${selectedSticker}.png`)
        const textureCenter=new THREE.Vector2(0.5, 0.5)
        parsedStickerTexture.center = textureCenter
        parsedStickerTexture.rotation = stickerRotation
        parsedStickerTexture.needsUpdate = true
        return parsedStickerTexture
    }

    //array of stickers
    const [stickers, setStickers] = useState(() => 
    {
        if (localStorage.getItem('savedStickers'))
        {
            const savedStickers = JSON.parse(localStorage.getItem('savedStickers'))
            const loadStickers = savedStickers.map((sticker) => ({...sticker, texture: parseStickerTexture(sticker.selectedSticker, sticker.stickerRotation)}) )
            return loadStickers
        }
        else return []
    })

    // retrieve stickers from local storage if available
    // useEffect(() =>
    // {
    //     let savedStickers = localStorage.getItem('savedStickers') || []
    //     savedStickers = JSON.parse(savedStickers)
    //     const loadStickers = savedStickers.map((sticker) => ({...sticker, texture: parseStickerTexture(sticker.selectedSticker, sticker.stickerRotation)}) )
    //     setStickers(loadStickers)
    //     console.log(stickers)

    // }, [])


    useEffect(() =>
    {
        localStorage.setItem('savedStickers', JSON.stringify(stickers))
    }, [stickers])


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
            scale: scale * stickerScale,
            stickerRotation: stickerRotation,
            selectedSticker: selectedSticker,
            texture: stickerTexture
        }])   
    }


    //reset stickers
    const reset = () => {
        localStorage.setItem('savedStickers', [])
        setStickers([])
        setScale(1)
    }


    //remove last sticker
    const undo = () => {
        setStickers((stickers) => {
            const stickersCopy = [...stickers]
            stickersCopy.pop()
            return stickersCopy
        })
        start()
    }


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
        <OrbitControls makeDefault target={[0, 0.4, 0]}/>


        {/* <mesh 
            ref={ duckRef }
            onPointerEnter={() => document.body.style.cursor = 'grab'}
            onPointerLeave={() => document.body.style.cursor = 'default'}
        >
            <sphereGeometry />
            <meshNormalMaterial depthWrite={false} wireframe/>
        </mesh> */}

        <mesh ref = { duckRef } 
            geometry={nodes.duck.geometry} 
            receiveShadow
        >
            <meshStandardMaterial 
                map={duckTexture} 
                roughness={0.6}
                roughnessMap={duckGlossyTexture}
                envMapIntensity={0.7}
            />
        </mesh>

        <mesh 
            geometry={nodes.FEET.geometry} 
            position={nodes.FEET.position} 
            rotation={nodes.FEET.rotation}
        >
            <meshStandardMaterial color={'#E78400'}/>
        </mesh>

        <mesh 
            ref={helperRef}
            visible={true}
            castShadow
            scale={scale} 
            onClick={() => {
                addSticker()
                start()
            }}
            onContextMenu={() =>setMenuOpen(true)}
            renderOrder = {stickers.length + 1}
        >
                {/* <boxGeometry args={[0.5, 0.5, 0.25]} /> */}
                <planeGeometry args={[stickerScale, stickerScale]} />
                <meshBasicMaterial 
                    map={selectedStickerTexture} 
                    transparent 
                    side={THREE.DoubleSide} 
                    opacity={0.75}                         
                    depthWrite={false}
                    depthTest
                    polygonOffset
                    polygonOffsetFactor={-200}
                    roughness={0.3}
                    />
        </mesh>

        <Sticker stickers={stickers} duckRef={duckRef}/>

    </>
}