import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import useSticker from '../stores/useSticker'
import LoadButton from '/images/load-button.png'
import SaveButton from '/images/save-button.png'


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

    const [ nameError, setNameError ] = useState(null)
    

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
        setNameError(null)
        const inputValue = event.target.value
        setSaveName(inputValue)
        if (inputValue && !/^[a-zA-Z0-9]+$/i.test(inputValue))
        {
            console.log(inputValue)
            setNameError('Please use only letters and numbers')
        }
    }


    //Open save/load menus when top menu button is clicked, close other menus and reset error messages
    const handleLoadClick = (event) =>
    {
        setLoadMenuOpen(true)
        setSaveMenuOpen(false)
        setErrorMessageOpen(false)
        setErrorMessage('')
        event.stopPropagation()
    }

    const handleSaveClick = (event) =>
    {
        console.log(saveMenuOpen)
        setSaveMenuOpen(true)
        setSaveMessageOpen(false)
        setLoadMenuOpen(false)
        setErrorMessageOpen(false)
        setErrorMessage('')
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
            {
                setLoadMenuOpen(false)
                setErrorMessageOpen(false)
                setErrorMessage('')
                event.stopPropagation()
            }
        }

        document.addEventListener('click', handleOutsideClick)

        return () => document.removeEventListener('click', handleOutsideClick)
    }, [loadMenuRef])

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (saveMenuRef.current && !saveMenuRef.current.contains(event.target))
            {
                setSaveMenuOpen(false)
                setErrorMessageOpen(false)
                setErrorMessage('')
                event.stopPropagation()
            }
        }

        document.addEventListener('click', handleOutsideClick)

        return () => document.removeEventListener('click', handleOutsideClick)
    }, [saveMenuRef])


    //close everything with esc key
    useEffect(()=>
    {
        const handleKeyDown = (event) => 
        {
            if (event.key === 'Escape')
            {
                setSaveMenuOpen(false)
                setSaveMessageOpen(false)
                setLoadMenuOpen(false)
                setErrorMessageOpen(false)
                setErrorMessage('')
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])



    return <>
        <div 
            className='save top-button' 
            onClick={handleSaveClick}
        >
            <img src={SaveButton} alt='save button' tabIndex='0'/>
        </div>
        {saveMenuOpen && 
            <div className='save-menu' ref={saveMenuRef}>
                {!saveMessageOpen &&
                    
                    <form onSubmit={handleSaveSubmit}>
                        <label>name your duck:</label>
                        <input 
                            onChange={handleSaveInputChange}
                            type='text'
                            name='saveName'
                            id='saveName'
                            value={saveName}
                        />
                        <button type='submit'>save</button>
                    </form>
                }
                {saveMessageOpen && 
                    <div className='save-message'>{ `${saveMessage}` }</div>
                }
                {nameError &&
                    <div className='error'>{ `${nameError}`}</div>
                }

                {errorMessageOpen &&
                    <div className='error' ref={errorMessageRef}>
                        {`Error: ${errorMessage}`}
                    </div>
                }
            </div>
        }


        <div 
            className='load top-button' 
            onClick={handleLoadClick}
        >
            <img src={LoadButton} alt='load button'/>
        </div>
        {loadMenuOpen && 
            <div className='load-menu' ref={loadMenuRef}>
                <form onSubmit={handleLoadSubmit}>
                    <label>enter duck's name:</label>
                    <input 
                        onChange={handleLoadInputChange}
                        type='text'
                        name='loadName'
                        id='loadName'
                        value={loadName}
                        spellCheck={false}
                    />
                    <button type='submit'>load</button>
                </form>
                {errorMessageOpen &&
                    <div className='error' ref={errorMessageRef}>
                        {`Error: ${errorMessage}`}
                    </div>
                }
            </div>
        }
    </>
}