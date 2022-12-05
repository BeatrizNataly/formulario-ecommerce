import './components/style.css';
import './App.css';
import Form from './pages/Form';
import AllDone from './pages/AllDone';
import NotFound from './pages/NotFound';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';

function App() {
  return (
    <Router>
        <Link to="/"/>
        <Link to="/finish"/>
    <Routes>
        <Route exact path='/' element={<Form/>}></Route>
        <Route path='/finish' element={<AllDone/>}></Route>
        <Route path='*' element={<NotFound titulo='Página não encontrada' descricao='Tente novamente mais tarde.'/>}></Route>
    </Routes>
  </Router>
  );
}

export default App;
