import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'


export default create(subscribeWithSelector((set) =>
{
    return {

        phase: 'cleared',
        scale: 1,

        start: () => set((state) => state.phase === 'cleared' ? { phase: 'start'} : {}),
        clear: () => set((state) => state.phase === 'start' ? { phase: 'cleared'} : {}),
        setScale: (value) => {
            set( {scale: value} )
        }
    }
}))