import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import useSticker from '../stores/useSticker'


const baseUrl = 'http://localhost:5000'


export default function Storage()
{   
    const setLoadStickers = useSticker((state) => state.setLoadStickers)
    const savedStickers = useSticker((state) => state.savedStickers)

    const [ loadName, setLoadName ] = useState('')
    const [ saveName, setSaveName ] = useState('')

    const [ loadMenuOpen, setLoadMenuOpen ] = useState(false)
    const [ saveMenuOpen, setSaveMenuOpen ] = useState(false)

    const [ errorMessageOpen, setErrorMessageOpen ] = useState(false)
    const [ errorMessage, setErrorMessage ] = useState('')

    const [ saveMessageOpen, setSaveMessageOpen ] = useState(false)
    const [ saveMessage, setSaveMessage ] = useState('')
    

    const fetchDuck = async (loadName) =>
    {
        const data = await axios.get(`${baseUrl}/saved/${loadName}`)
        const { sticker_list } = data.data
        setLoadStickers(sticker_list)
    }

    
    const saveDuck = async (saveName, savedStickers) =>
    {   
        const data = await axios.post(`${baseUrl}/saved`, {name: saveName, sticker_list: savedStickers})
    }


    const handleLoadInputChange = (event) => 
    {
      setLoadName(event.target.value)
    }

    const handleSaveInputChange = (event) =>
    {
        setSaveName(event.target.value)
    }

    const handleLoadClick = (event) =>
    {
        setLoadMenuOpen(true)
        setSaveMenuOpen(false)
        event.stopPropagation()
    }

    const handleSaveClick = (event) =>
    {
        setSaveMenuOpen(true)
        setSaveMessageOpen(false)
        setLoadMenuOpen(false)
        event.stopPropagation()
    }

    
    const handleLoadSubmit = async (event) =>
    {
        event.preventDefault()
        try
        {
            await fetchDuck(loadName)
            setLoadMenuOpen(false)
        } catch (err) {
            setErrorMessageOpen(true)
            console.error(err)
            if (err.response) setErrorMessage(err.response.data.message)
        } finally {
            setLoadName('')
        }
        
    }


    const handleSaveSubmit = async (event) =>
    {
        event.preventDefault()
        try
        {
            await saveDuck(saveName, savedStickers)
            const message = `${saveName} has been saved`
            setSaveMessage(message)
            setSaveMessageOpen(true)
            setSaveName('')
            // setSaveMenuOpen(false)
        } catch (err) {
            setErrorMessageOpen(true)
            console.error(err)
            if (err.response) 
            {
                setErrorMessage(err.response.data.message)
            }
            else setErrorMessage(err.message)
        }
    }


    //close menu on outside click
    const loadMenuRef = useRef()
    const saveMenuRef = useRef()
    const errorMessageRef = useRef()

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (loadMenuRef.current && !loadMenuRef.current.contains(event.target))
                setLoadMenuOpen(false)
                event.stopPropagation()
        }

        document.addEventListener('click', handleOutsideClick)

        return () => document.removeEventListener('click', handleOutsideClick)
    }, [loadMenuRef])

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (saveMenuRef.current && !saveMenuRef.current.contains(event.target))
                setSaveMenuOpen(false)
                event.stopPropagation()
        }

        document.addEventListener('click', handleOutsideClick)

        return () => document.removeEventListener('click', handleOutsideClick)
    }, [saveMenuRef])

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (errorMessageRef.current && !errorMessageRef.current.contains(event.target))
                setErrorMessageOpen(false)
                setErrorMessage('')
                event.stopPropagation()
        }

        document.addEventListener('click', handleOutsideClick)

        return () => document.removeEventListener('click', handleOutsideClick)
    }, [errorMessageRef])



    return <>
        <div 
            className='save' 
            onClick={handleSaveClick}
        >
            Save
        </div>
        {saveMenuOpen && 
            <div className='save-menu' ref={saveMenuRef}>
                {!saveMessageOpen &&
                    
                    <form onSubmit={handleSaveSubmit}>
                        <label>Name your duck</label>
                        <input 
                            onChange={handleSaveInputChange}
                            type='text'
                            name='saveName'
                            id='saveName'
                            value={saveName}
                        />
                        <button type='submit'>Submit</button>
                    </form>
                }
                {saveMessageOpen && 
                    <div>{ `${saveMessage}` }</div>
                }
            </div>
        }


        <div 
            className='load' 
            onClick={handleLoadClick}
        >
            Load
        </div>
        {loadMenuOpen && 
            <div className='load-menu' ref={loadMenuRef}>
                <form onSubmit={handleLoadSubmit}>
                    <label>Enter Name</label>
                    <input 
                        onChange={handleLoadInputChange}
                        type='text'
                        name='loadName'
                        id='loadName'
                        value={loadName}
                    />
                    <button type='submit'>Submit</button>
                </form>
            </div>
        }


        {errorMessageOpen &&
            <div className='error' ref={errorMessageRef}>
                {`Error: ${errorMessage}`}
            </div>
        }
    </>
}