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

    const [ isLoading, setIsLoading ] = useState(false)
    

    //fetch settings from server
    const fetchDuck = async (loadName) =>
    {
        setIsLoading(true)
        const data = await axios.get(`${baseUrl}/saved/${loadName}`)
        const { sticker_list } = data.data
        setLoadStickers(sticker_list)
        setIsLoading(false)
    }


    //save settings to server
    const saveDuck = async (saveName, savedStickers) =>
    {   
        setIsLoading(true)
        const data = await axios.post(`${baseUrl}/saved`, {name: saveName, sticker_list: savedStickers})
        setIsLoading(false)
    }


    useEffect(()=>
    {
        console.log("loading", isLoading)
    }, [isLoading])

    useEffect(()=>
    {
        console.log("saving", saveMessageOpen)
    }, [saveMessageOpen])


    //set load name based on input
    const handleLoadInputChange = (event) => 
    {
      setLoadName(event.target.value)
    }

    //set save name based on input, show name error if invalid characters
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
        setIsLoading(false)
        setLoadMenuOpen(true)
        setSaveMenuOpen(false)
        setErrorMessageOpen(false)
        setErrorMessage('')
        event.stopPropagation()
    }

    const handleSaveClick = (event) =>
    {
        setIsLoading(false)
        setSaveMenuOpen(true)
        setSaveMessageOpen(false)
        setLoadMenuOpen(false)
        setErrorMessageOpen(false)
        setErrorMessage('')
        event.stopPropagation()
    }

    
    //call fetchDuck function when load button is clicked, display errors if any
    const handleLoadSubmit = async (event) =>
    {
        event.preventDefault()
        try
        {
            await fetchDuck(loadName)
            setLoadMenuOpen(false)
        } catch (err) {
            setIsLoading(false)
            setErrorMessageOpen(true)
            console.error(err)
            if (err.response) setErrorMessage(err.response.data.message)
        } finally {
            setLoadName('')
        }
        
    }

    //call saveDuck function when save button is clicked, display errors if any
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
            setIsLoading(false)
            setErrorMessageOpen(true)
            setNameError(null)
            console.error(err)
            if (err.response) 
            {
                setErrorMessage(err.response.data.message)
            }
            else setErrorMessage(err.message)
        }
    }


    //refs to detect outside clicks
    const loadMenuRef = useRef()
    const saveMenuRef = useRef()
    const errorMessageRef = useRef()


    //close menu on outside click
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


    //remove error message on outside click
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (errorMessageRef.current && !errorMessageRef.current.contains(event.target))
            {
                setErrorMessageOpen(false)
                setErrorMessage('')
                event.stopPropagation()
            }
        }

        document.addEventListener('click', handleOutsideClick)

        return () => document.removeEventListener('click', handleOutsideClick)
    }, [errorMessageRef])


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

                {isLoading &&
                    <div className='error'>
                         {`saving ${saveName}...`}
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
                {isLoading &&
                    <div className='error'>
                         {`finding ${loadName}...`}
                    </div>
                }
            </div>
        }
    </>
}