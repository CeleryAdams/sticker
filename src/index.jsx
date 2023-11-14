import ReactDOM from 'react-dom/client'
import './style.css'
import World from './World.jsx'
import { StrictMode } from 'react'


const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <StrictMode>
        <World />
    </StrictMode>
)