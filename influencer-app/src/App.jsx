import { Col, Row } from 'react-bootstrap';
import { useNavigate  ,Routes , Route }  from 'react-router-dom' ;
import Header from './components/Header';
import AllUsers from './screens/AllUsers';
import DashBoard from './screens/DashBoard';
import { LandingPage } from './screens/LandingPage';
import Login from './screens/Login';
import Register from './screens/Register';

function App() {
  return (
    <>
    <Header />
    
      <Routes>
          <Route path='/login' element={<Login />}  />
          <Route path='/register' element={<Register />}  />
          <Route path='/' element={<LandingPage />}/>
          <Route path='/GetAllUsers' element={<AllUsers />}/>
          <Route path='/DashBoard' element={<DashBoard />}/>
        </Routes>
      </>
  );
}

export default App;
