import { Canvas } from '@react-three/fiber'
import Duck from './Duck.jsx'
import Interface from './interface/Interface.jsx'
import './style.css'
import Stage from './Stage.jsx'
import { ToneMapping, EffectComposer, HueSaturation, BrightnessContrast } from '@react-three/postprocessing'
import { Suspense } from 'react'
import { Loader, Preload } from "@react-three/drei"


export default function World()
{

    return <>
        <Canvas 
            shadows 
            camera={{
                fov: 25,
                position: [ -3.3, 2.3, 4.5 ]
            }}
            // gl={{
            //     toneMapping: THREE.CineonToneMapping
            // }}
        >
            <Suspense fallback={null}>
                <Stage />
                <Duck />
                <EffectComposer disableNormalPass>
                    <HueSaturation saturation={0.1}/>
                    <ToneMapping />
                    <BrightnessContrast brightness={0.05} contrast={0.02}/>
                </EffectComposer>
            </Suspense>
        </Canvas>
        <Suspense fallback={null}>
            <Interface />   
        </Suspense>
        <Loader 
            containerStyles={{background: '#393B63'}}
            innerStyles={{width: 300, height: 3, background: '#4F518E'}}
            barStyles={{height: 3, background: '#787BC1'}}
            dataStyles={{fontSize: '1em', fontFamily: 'Poppins, "sans-serif"', color: '#787BC1'}}
        />
    </>
}