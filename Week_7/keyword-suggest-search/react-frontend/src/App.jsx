import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

const App = () => {
    const [data, setData] = useState([]);
    const [selectedKeyword, setSelectedKeyword] = useState('');
    const [submittedKeyword, setSubmittedKeyword] = useState('');
    const [submittedValue, setSubmittedValue] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/keywords', {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                setData(response.data.data);
                console.log('worked')
            } catch (error) {
                setError('Failed to fetch suggestions');
            }
        }
        fetchData();
        console.log(data)
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();

        const selected = data.find(entry => entry.keyword === selectedKeyword);
        if(selected) {
            setSubmittedKeyword(selectedKeyword);
            setSubmittedValue(selected.value);
        }
        else {
            setSubmittedKeyword('');
            setSubmittedValue('');
        }
    };

    return (
        <div className="App">
            <h1>Keyword Search App</h1>
            {error && <p>{error}</p>}
            {!error && (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="keyword">Select a keyword:</label>
                    <input 
                        list="keywords"
                        id="keyword" 
                        name="keyword"
                        placeholder='Enter'
                        value={selectedKeyword} 
                        onChange={(e) => setSelectedKeyword(e.target.value)} 
                        required 
                    />
                    <datalist id="keywords">
                        {data.map((item, index) => (
                            <option key={item.keyword} value={item.keyword} />
                        ))}
                    </datalist>
                    <button type="submit">Submit</button>
                </form>
            )}
            {submittedValue && (
                <p>You selected: Keyword: {submittedKeyword}, Value: {submittedValue}</p>
            )}
        </div>
    );
}

export default App
