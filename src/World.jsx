import { Canvas } from '@react-three/fiber'
import Duck from './Duck.jsx'
import Interface from './interface/Interface.jsx'
import './style.css'
import Stage from './Stage.jsx'
import { ToneMapping, EffectComposer, HueSaturation, BrightnessContrast } from '@react-three/postprocessing'


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
            <Stage />
            <Duck />
            <EffectComposer disableNormalPass>
                <HueSaturation saturation={0.1}/>
                <ToneMapping />
                <BrightnessContrast brightness={0.05} contrast={0.02}/>
            </EffectComposer>
        </Canvas>
        <Interface />   
    </>
}