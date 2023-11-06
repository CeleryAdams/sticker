import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import './style.css'
import World from './World.jsx'
import MouseSticker from './MouseSticker'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <>
        <Canvas shadows> 
            <World />
        </Canvas>
        <MouseSticker />
    </>
)