import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import SurveyForm from './survey_form_2'
import Results from './results'
import SignUp from './sign_up_form'
import SignIn from './sign_in'
import "./index.css"
import Homepage from './a'

/*
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
    <SurveyForm />
    </React.StrictMode>,
)
*/


const App = () => {
    const [message, setMessage] = useState("");
    const [userText, setUserText] = useState("");

    /*  
    const handleFormSubmission = (response) => {
        setMessage(response.message);
        setUserText(response.user.username);  // Example of using response data
    };
    */
    console.log("started")

    return (
    /*
    <SurveyForm 
        setMessage={setMessage} 
        setUserText={setUserText} 
    />
    */

    //<SurveyForm/>
    
    /*

        <div className="App">
        {!message ? (
            <SurveyForm 
                setMessage={setMessage} 
                setUserText={setUserText} 
            />
        ) : (
            <Results message={message} userText={userText} />
        )}
        </div>
    */

        <div className="App">
        <SignUp/>
        </div>

        /*
        <div className="App">
        <SignUp/>
        </div>
        */
    )
}


/*
{!message ? (
              <SurveyForm setMessage={setMessage} />
          ) : (
              <Results userText={userText}/>
          )}
*/

export default App;



ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
)