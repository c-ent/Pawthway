import { useParams } from 'react-router-dom';

function LostPet() {
  let { petId } = useParams();

  return <h1>hi {petId}</h1>;
}

export default LostPet;