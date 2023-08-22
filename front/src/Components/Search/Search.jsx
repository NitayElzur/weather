import './Search.css';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { ResultContext } from '../../Contexts/ResultContext';
import { OnlineContext } from '../../Contexts/OnlineContext';
import { isValid } from '../../Utils/isValidSearch'

function Search() {
    const [query, setQuery] = useState('');
    const { setResult, setLoading } = useContext(ResultContext);
    const { online } = useContext(OnlineContext)
    const [inputError, setInputError] = useState({
        requestError: false,
    });

    useEffect(() => {
        online && query && isValid(query) && handleSearch()
    }, [online])

    function handleInputChange(e) {
        if (e.target.value === '' && !query) {
            return setInputError(prev => ({ ...prev, requestError: false }))
        }
        else if(e.target.value === '' && query) {
            setQuery('');
            return setInputError(prev => ({...prev, requestError: true}))
        }
        const isNotValid = !isValid(e.target.value);
        setInputError(prev => ({ ...prev, requestError: isNotValid }))
        setQuery(e.target.value)
    }

    function handleSearch() {
        if (!query) return setInputError(prev => ({ ...prev, requestError: true }))
        if (!inputError.requestError && online) {
            setLoading(true);
            setResult();
            axios.get(`http://localhost:3000/${query}`)
                .then(({ data }) => {
                    setLoading(false);
                    setResult(data);
                })
                .catch(err => {
                    setLoading(false);
                    setResult(err.response.data);
                })
        }
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') handleSearch()
    }

    return (
        <div id="search-main">
            <h1>
                Use our weather app to see the weather around the world
            </h1>
            <div id='search-lower'>
                <h4>City name</h4>
                <div id='input-button-div' className={inputError.requestError ? 'red' : ''}>
                    <input id='input' type="text" onKeyDown={handleKeyDown} onChange={handleInputChange} />
                    <button id='button' className={online ? 'button-online' : 'button-offline'} onClick={handleSearch}>Check</button>
                    {inputError.requestError && <div id="search-error">Search words must begin in letters and cannot contain special characters except for dot and comma</div>}
                </div>
            </div>
        </div>
    )
}
export default Search;