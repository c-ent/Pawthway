import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Comments from '../components/Comments';
import dogplaceholder from '../../images/icons/origami-dog.svg';
const FoundPet = () => {
  const { petId } = useParams();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    const fetchPet = async () => {
      const { data: foundPet, error } = await supabase
        .from('foundpets')
        .select('*')
        .eq('id', petId);

      if (error) {
        console.error('Error fetching pet: ', error);
      } else {
        setPet(foundPet[0]);
      }
    };

    fetchPet();
  }, [petId]);

  if (!pet) {
    return <div>Loading...</div>;
  }

  return (
    <div className='pt-10'>
    <img src={pet.imageURL?pet.imageURL : dogplaceholder} alt={pet.description} className='w-full h-96 object-cover' />
    <div className='flex-1 p-0 md:p-7'>
      <div className='flex justify-between pb-7'>
        <div>
          <h1 className='font-bold text-4xl'>{pet.description}</h1>
        </div>
        <div className='flex justify-between space-x-3'>
          <button className="bg-red-600 text-white px-3 font-bold py-1 rounded-md">Finder ID: {pet.finder_id}</button>
        </div>
      </div>
      <div className='flex pb-7'>
        <div className='w-1/2 space-y-3'>
          <p className='text-sm flex items-center gap-2 font-semibold'>Color: {pet.color}</p>
          <p className='text-sm flex items-center gap-2 font-semibold'>Size: {pet.size}</p>
          <p className='text-sm flex items-center gap-2 font-semibold'>Found Date: {pet.found_date}</p>
          <p className='text-sm flex items-center gap-2 font-semibold'>Found Location: {pet.found_location}</p>
          <p className='text-sm flex items-center gap-2 font-semibold'>Status: {pet.status}</p>
          <p className='text-sm flex items-center gap-2 font-semibold'>Contact Number: {pet.contact_number}</p>
        </div>
      </div>
    </div>

    <Comments petType={"found"}petId={petId} />
  </div>


  );
};

export default FoundPet;