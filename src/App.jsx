import { Route, Routes } from 'react-router-dom';
import Home from '@pages/Home';
import NoPage from '@pages/NoPage';
import Layout from '@pages/Layout';
import LostPet from '@pages/LosttPet';
import AllLostPets from '@pages/AllLostPets';
import AllFoundPets from '@pages/AllFoundPets';
import FoundPet from '@pages/FoundPet';
import SignUp from './components/SignUp';
import Login from './components/Login';
import SignOut from './components/SignOut';
import UserProfile from './pages/UserProfile';


function App() {
  

  return (
    
    <Routes>
      <Route path="/" element={<Layout  />}>
          <Route index element={<Home />} />
          <Route path="lostpets" element={<AllLostPets />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="signout" element={<SignOut />} />
          <Route path="lostpets/:petId"  element={<LostPet /> }  />
          <Route path="foundpets" element={<AllFoundPets />} />
          <Route path="foundpets/:petId"  element={<FoundPet /> }  />
          <Route path="profile"  element={<UserProfile /> }  />
          <Route path="*" element={<NoPage />} />
        </Route>
    </Routes>


 
  );
}

export default App;