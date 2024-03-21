import React from 'react'
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import trash from '../../images/icons/trash.svg';

const DeleteFoundPetButton = ({finder_id, pet_Id, session}) => {
  const [showButton, setShowButton] = useState(false);
  const [showTrashButton, setShowTrashButton] = useState(true);
  let user_id;
  if (session && session.user) {
    user_id = session.user.id;
  }

  const navigate = useNavigate();

  const deletePet = async () => {
    const { error } = await supabase
      .from('foundpets')
      .delete()
      .eq('id', pet_Id)

    if (error) console.log("Error deleting pet: ", error);
    navigate('/foundpets');
  }

  if (finder_id === user_id) {
    return (
      <div className=''>
      {
        showTrashButton &&
        <button onClick={() => { setShowButton(true); setShowTrashButton(false); }}>
        <img src={trash} alt="trash" className="w-6 h-6" />
        </button>

      }
     
   
    {showButton && 
      <button onClick={deletePet} className="text-xs bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
        Confirm
      </button>
    }
  </div>

    )
  } else {
    return null; // Don't render anything if the user_ids don't match
  }
}

export default DeleteFoundPetButton