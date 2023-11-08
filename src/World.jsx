import { Canvas } from '@react-three/fiber'
import Duck from './Duck.jsx'
import Interface from './Interface.jsx'
import './style.css'


export default function World()
{
    return <>
        <Canvas shadows> 
            <Duck />
        </Canvas>
        <Interface />   
    </>
}