import './App.css';
import {HashRouter as Router,Routes,Route} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import SignIn from './components/SignIn/SignIn';
import Home from './components/Home/Home';
import "@fontsource/montserrat"
import QuestionRoute from './components/QuestionRoute';
import Question from './components/Question/Question';
import MyQuestions from './components/MyQuestions/MyQuestions';


function App() {
  return (
    <div className="App">
    <Router>
            <Routes>
                <Route exact path = '/' element={<PrivateRoute/>}>
                  <Route exact path = '/' element={<Home/>}/>
                  <Route exact path = '/my' element={<MyQuestions/>}/>
                  <Route exact path = '/question' element={<QuestionRoute/>}>
                    <Route exact path='/question' element={<Question/>}/>
                  </Route>
                </Route>
                <Route path = '/signup' element={<SignIn/>}/>
            </Routes>
    </Router>
    </div>
  );
}

export default App;
