import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

const App = () => {
    const [suggestions, setSuggestions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                const response = await axios.post('http://localhost:3000/suggestions', {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                setSuggestions(JSON.stringify(response.data));
                console.log('worked')
            } catch (error) {
                setError('Failed to fetch suggestions');
            }
        }
        fetchSuggestions();
    }, [])

    return (
        <div className="App">
            <h1>Keyword Suggest Search</h1>
            {error ? (
            <div className="error">Error: {error}</div>
            ) : (
            <div>
                <input list="suggestions" name="keyword" placeholder="Enter" />
                <datalist id="suggestions">
                    {suggestions.map((item, index) => (
                        <option key={index} value={item.keyword}></option>
                    ))}
                </datalist>
            </div>
            )}
        </div>
    );
}

export default App
