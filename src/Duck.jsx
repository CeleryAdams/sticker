import { OrbitControls} from '@react-three/drei'
import {useFrame} from '@react-three/fiber'
import { useRef, useState } from 'react'

export default function Duck()
{
    const cubeRef = useRef()
    const helperRef = useRef()

    // //render helper only if there is an intersection
    // const [ helper, setHelper ] = useState(false)

    useFrame((state) => {
        updateHelperPosition(state.raycaster)
    })


    const updateHelperPosition = (raycaster) => {
        const intersects =[]
        const mesh = cubeRef.current
        raycaster.intersectObject(mesh, false, intersects)
        console.log[intersects]

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
        <OrbitControls makeDefault />
        <mesh 
            ref={ cubeRef }
            onPointerEnter={() => document.body.style.cursor = 'grab'}
            onPointerLeave={() => document.body.style.cursor = 'default'}
        >
            <boxGeometry />
            <meshNormalMaterial />
        </mesh>
        

        <mesh ref={helperRef}>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshBasicMaterial color='red' />
        </mesh>


    </>
}