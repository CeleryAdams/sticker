import { OrbitControls} from '@react-three/drei'
import {useFrame} from '@react-three/fiber'
import { useControls } from 'leva'
import { useRef, useState } from 'react'


export default function World()
{
    const cubeRef = useRef()
    const helperRef = useRef()
    const [ helper, setHelper ] = useState(false)


    useFrame((state) => {
        console.log(state.raycaster.ray.origin)
        updateHelperPosition(state.raycaster)
    })


    const updateHelperPosition = (raycaster) => {
        const intersects =[]
        const mesh = cubeRef.current
        raycaster.intersectObject(mesh, false, intersects)

        if (intersects.length <= 0)
        {
            setHelper(false)
        }
        else
        {
            setHelper(true)

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
        <mesh ref={ cubeRef }>
            <sphereGeometry />
            <meshNormalMaterial />
        </mesh>
        
        {helper &&
            <mesh ref={helperRef}>
                <boxGeometry args={[1, 1, 0.5]} />
                <meshNormalMaterial />
            </mesh>
        }
    </>
}