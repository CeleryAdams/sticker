import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'


export default create(subscribeWithSelector((set) =>
{
    return {

        phase: 'cleared',
        scale: 1,
        stickerRotation: 0,
        selectedSticker: 'sticker-05',
        menuOpen: false,
        contextMenuOpen: false,
        contextMenuPosition: {x:0, y:0},
        loadStickers: null,
        savedStickers: null,

        start: () => set((state) => state.phase !== 'start' ? { phase: 'start'} : {}),
        clear: () => set((state) => state.phase === 'start' ? { phase: 'cleared'} : {}),
        undo: () => set((state) => state.phase ==='start'? { phase: 'undo'} : {}),


        setScale: (value) => {set( {scale: value} )},

        setSticker: (value) => {set({ selectedSticker: value })},

        setMenuOpen: (value) => {set({ menuOpen: value })},
        setContextMenuOpen: (value) => {set({ contextMenuOpen: value })},

        setContextMenuPosition: (value) => {set({ contextMenuPosition: value})},

        rotate45: () => set((state) => ({stickerRotation: state.stickerRotation - Math.PI/4})),
        rotate45Cc: () => set((state) => ({stickerRotation: state.stickerRotation + Math.PI/4})),
        setStickerRotation: (value) => {set({ stickerRotation: value })},

        setLoadStickers: (value) => {set({ loadStickers: value })},
        setSavedStickers: (value) => {set({savedStickers: value})}
    }
}))