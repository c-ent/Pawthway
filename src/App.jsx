import { Route, Routes } from 'react-router-dom';
import Home from '@pages/Home';
import NoPage from '@pages/NoPage';
import Layout from '@pages/Layout';
import LostPet from '@pages/LosttPet';
import AllLostPets from '@pages/AllLostPets';
import AllFoundPets from '@pages/AllFoundPets';
import FoundPet from '@pages/FoundPet';

function App() {
 
  return (
   
    <div className="mx-auto max-w-screen-xl p-5">
 
    <Routes>
      <Route path="/" element={<Layout  />}>
          <Route index element={<Home />} />
          <Route path="lostpets" element={<AllLostPets />} />
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