import { Canvas } from '@react-three/fiber'
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