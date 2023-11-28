import { Canvas } from '@react-three/fiber'
import Duck from './Duck.jsx'
import Interface from './interface/Interface.jsx'
import './style.css'
import Stage from './Stage.jsx'


export default function World()
{
    return <>
        <Canvas shadows>
            <Stage />
            <Duck />
        </Canvas>
        <Interface />   
    </>
}