import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'


export default create(subscribeWithSelector((set) =>
{
    return {

        phase: 'cleared',
        scale: 1,
        stickerRotation: 0,
        selectedSticker: 'sticker',
        menuOpen: false,

        start: () => set((state) => state.phase !== 'start' ? { phase: 'start'} : {}),
        clear: () => set((state) => state.phase === 'start' ? { phase: 'cleared'} : {}),
        undo: () => set((state) => state.phase ==='start'? { phase: 'undo'} : {}),


        setScale: (value) => {set( {scale: value} )},

        setSticker: (value) => {
            console.log('sticker changed to ', value)
            set( {selectedSticker: value} )},

        setMenuOpen: (value) => {set({ menuOpen: value })},

        rotate45: () => set((state) => ({stickerRotation: state.stickerRotation - Math.PI/4})),
        rotate45Cc: () => set((state) => ({stickerRotation: state.stickerRotation + Math.PI/4})),
        
    }
}))