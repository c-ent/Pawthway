import { Route, Routes } from 'react-router-dom';
import Home from 'src/pages/Home';
import NoPage from 'src/pages/NoPage';
import Layout from 'src/pages/Layout';
import LostPet from 'src/pages/LosttPet';
import AllLostPets from 'src/pages/AllLostPets';
import AllFoundPets from 'src/pages/AllFoundPets';
import FoundPet from 'src/pages/FoundPet';



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