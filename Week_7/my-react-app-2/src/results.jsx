import React from 'react';
import './results.css'

const Results = ({ message, userText }) => {
    return (
        <div className='r-main-div'>
            <h1>Welcome</h1>
            <p>message: {message}</p>
            <p>{userText}</p>
        </div>
    );
};

export default Results;
