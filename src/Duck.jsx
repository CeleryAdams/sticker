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
    const { nodes } = useGLTF('/duck.glb')

    const duckTexture = useTexture('./baked-duck-4.jpg')
    duckTexture.flipY = false
    duckTexture.needsUpdate = true

    const duckGlossyTexture = useTexture('./baked-duck-glossy.jpg')
    duckGlossyTexture.flipY = false
    duckGlossyTexture.needsUpdate = true


    //global state
    const start = useSticker((state) => state.start)
    const scale = useSticker((state) => state.scale)
    const setScale = useSticker((state) => state.setScale)
    const stickerRotation = useSticker(state => state.stickerRotation)
    const selectedSticker = useSticker(state=> state.selectedSticker)
    // const setMenuOpen = useSticker((state) => state.setMenuOpen)
    const setContextMenuOpen = useSticker((state) => state.setContextMenuOpen)
    const contextMenuOpen = useSticker((state) => state.contextMenuOpen)
    const setContextMenuPosition = useSticker((state) => state.setContextMenuPosition)

    const loadStickers = useSticker((state) => state.loadStickers)
    const setLoadStickers = useSticker((state) => state.setLoadStickers)
    const setSavedStickers = useSticker((state) => state.setSavedStickers)


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
        // parsedStickerTexture.needsUpdate = true
        return parsedStickerTexture
    }

    //initialize array of stickers
    const [stickers, setStickers] = useState(() => 
    {
        if (localStorage.getItem('savedStickers'))
        {
            const savedStickers = JSON.parse(localStorage.getItem('savedStickers'))

            //set global state to start if there are saved stickers loaded
            if (savedStickers.length > 0) start()
   
            const loadedStickers = savedStickers.map((sticker) => ({...sticker, texture: parseStickerTexture(sticker.selectedSticker, sticker.stickerRotation)}) )
            return loadedStickers
        }
        else return []
    })


    //load sticker settings from server
    useEffect(()=>{
        if (loadStickers)
        {
            console.log('stickers loaded')
            const loadedStickers = loadStickers.map((sticker) => ({...sticker, texture: parseStickerTexture(sticker.selectedSticker, sticker.stickerRotation)}))
            setStickers(loadedStickers)
            setLoadStickers(null)
            start()
        }
    }, [loadStickers])



    //save current stickers to local storage and global state
    useEffect(() =>
    {
        const stickersCopy = stickers.map((sticker) => ({...sticker, texture: null}))
        // console.log(JSON.stringify(stickersCopy))
        localStorage.setItem('savedStickers', JSON.stringify(stickersCopy))
        setSavedStickers(stickersCopy)
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


    //subscribe to global state
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
        if (!contextMenuOpen) updateHelperPosition(state.raycaster)
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

        <mesh ref = { duckRef } 
            geometry={nodes.duck.geometry} 
            receiveShadow
        >
            <meshStandardMaterial 
                map={duckTexture} 
                roughness={0.6}
                roughnessMap={duckGlossyTexture}
                envMapIntensity={0.67}
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
            onPointerEnter={()=> document.body.style.cursor = 'grab'}
            onPointerLeave={()=> document.body.style.cursor = 'default'}
            onContextMenu={(event) => 
                {
                    console.log('context menu triggered')
                    event.stopPropagation()
                    setContextMenuPosition({x: event.clientX, y: event.clientY})
                    setContextMenuOpen(!contextMenuOpen)
                }}
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