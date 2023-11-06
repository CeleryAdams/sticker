import { OrbitControls} from '@react-three/drei'
import {useFrame} from '@react-three/fiber'
import { useControls } from 'leva'
import { useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import MouseSticker from './MouseSticker'
import Duck from './Duck.jsx'


export default function World()
{


    return <>
        <Canvas shadows> 
            <Duck />
        </Canvas>
        {/* {!helper && <MouseSticker />} */}
        
    </>
}