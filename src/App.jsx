import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import Layout from './pages/Layout';
import LostPets from './pages/LostPets';
import FoundPets from './pages/FoundPets';
import LostPet from './pages/LosttPet';

function App() {
  return (
    <div className="mx-auto max-w-screen-xl p-5">
    <Routes>
      <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="lostpets" element={<LostPets />} />
          <Route path="lostpets/:petId" element={<LostPet />} />
          <Route path="foundpets" element={<FoundPets />} />
          <Route path="*" element={<NoPage />} />
        </Route>
    </Routes>
  </div>
  );
}

export default App;