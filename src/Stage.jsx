import { useControls } from 'leva'
import { useRef } from 'react'
import * as THREE from 'three'
import { Environment, Lightformer, useHelper } from '@react-three/drei'


export default function Stage()
{
    // debug light
    const { lightPosition, lightIntensity, lightColor } = useControls({

        lightPosition:
        {
            value: [ -3.6, 1.1, 2.7 ],
            step: 0.1
        },

        lightIntensity:
        {
            value: 7,
            step: 0.1
        },
        lightColor: '#f3c8ff',

    })

    const { lightPosition2, lightIntensity2, lightColor2 } = useControls({

        lightPosition2:
        {
            value: [ -0.9, 1.6, -4.0 ],
            step: 0.1
        },

        lightIntensity2:
        {
            value: 7,
            step: 0.1
        },
        lightColor2: '#aeb9fa',

    })

    const { lightPosition3, lightIntensity3, lightColor3 } = useControls({

        lightPosition3:
        {
            value: [ 6.1, 1.6, -1.3 ],
            step: 0.1
        },

        lightIntensity3:
        {
            value: 5,
            step: 0.1
        },
        lightColor3: '#ffb2e7',

    })


    const directionalLight = useRef()
    useHelper(directionalLight, THREE.DirectionalLightHelper, 1)


    return <>
        <Environment
            // background
            // preset='warehouse'
            files='/environment/empty_warehouse_01_1k_dark.hdr'
            
        >
            <Lightformer
                position={ lightPosition }
                scale={ 1.5 }
                color={ lightColor }
                intensity={ lightIntensity }
                form="ring"
                target={[0,0,0]}
            />

            <Lightformer
                    position={ lightPosition2 }
                    scale={ 2 }
                    color={ lightColor2 }
                    intensity={ lightIntensity2 }
                    form="ring"
                    target={[0,0,0]}
            />

            <Lightformer
                    position={ lightPosition3 }
                    scale={ 2 }
                    color={ lightColor3 }
                    intensity={ lightIntensity3 }
                    form="ring"
                    target={[0,0,0]}
            />
        </Environment>

        {/* <directionalLight 
            color={lightColor} 
            intensity= { lightIntensity } 
            ref={ directionalLight } 
            position = {lightPosition}
        />   */}


    </>

}