import React from 'react'
import { supabase } from '../supabaseClient';

const DeleteButton = ({pet_user_id, pet_Id, session}) => {
  let user_id;
  if (session && session.user) {
    user_id = session.user.id;
  }

  console.log("pet_user_id: ", pet_user_id);
  console.log("user_id: ", user_id);

  const deletePet = async () => {
    const { error } = await supabase
      .from('missingPets')
      .delete()
      .eq('id', pet_Id)

    if (error) console.log("Error deleting pet: ", error);
  }

  if (pet_user_id === user_id) {
    return (
      <button onClick={deletePet}>Delete Pet</button>
    )
  } else {
    return null; // Don't render anything if the user_ids don't match
  }
}

export default DeleteButton