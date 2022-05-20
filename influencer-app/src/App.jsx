
import { Routes , Route }  from 'react-router-dom' ;
import DashBoard from './screens/DashBoard';
import { LandingPage } from './screens/LandingPage';
import Login from './screens/Login';
import { PostDetails } from './screens/PostDetails';
import { Profile } from './screens/Profile';
import Register from './screens/Register';
import UpdatePotCard from './screens/UpdatePostCard'

function App() {

  return (
    <>
    
      <Routes>
          <Route path='/login' element={<Login />}  />
          <Route path='/register' element={<Register />}  />
          <Route path='/' element={<LandingPage />}/>
          <Route path='/DashBoard' element={<DashBoard />}/>
          <Route path='/updatePost/:Title/:Desc/:ID' element={<UpdatePotCard />}/>
          <Route path='/PostDetails/:id' element={<PostDetails />}/>
          <Route path='/profile/:id' element={<Profile />} />

        </Routes>
      </>
  );
}

export default App;
