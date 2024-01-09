import React from 'react';
import { supabase } from '../supabaseClient';

const SignOut = () => {
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error(error);
  };

  return (
    <button onClick={handleSignOut} className="text-md font-bold hover:text-purple-600">
      Sign Out
    </button>
  );
};

export default SignOut;