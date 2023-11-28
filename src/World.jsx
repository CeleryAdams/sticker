import { Canvas } from '@react-three/fiber'
import Duck from './Duck.jsx'
import Interface from './interface/Interface.jsx'
import './style.css'
import Stage from './Stage.jsx'


export default function World()
{

    return <>
        <Canvas 
            shadows 
            camera={{
                fov: 25,
                position: [ -3.3, 2.3, 4.5 ]
            }}
        >
            <Stage />
            <Duck />
        </Canvas>
        <Interface />   
    </>
}