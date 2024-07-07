import { Routes } from 'react-router-dom'
import { Homepage } from './a'
import SurveyForm from './survey_form_2'

const App = () => {
    return (
        <Routes>
            <Route path="" element={ <Homepage/>  } />
            <Route path="" element={ <SurveyForm/>  } />
        </Routes>
    )
}

export default App