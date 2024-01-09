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
import { supabase } from './supabaseClient';
import { useState } from 'react';

function App() {
  const [session, setSession] = useState(null);

  async function getSession() {
    const {data: { session },} = await supabase.auth.getSession()
    setSession(session);
  }
  return (
    <div className="mx-auto max-w-screen-xl p-5">
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
          <Route path="*" element={<NoPage />} />
        </Route>
    </Routes>

  </div>
 
  );
}

export default App;