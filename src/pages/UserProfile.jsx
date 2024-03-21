import React, { useContext, useEffect, useState } from 'react'
import { SessionContext } from '../components/SessionContext';
import { supabase } from '../supabaseClient';
import UsersMissingPets from '../components/UsersMissingPets';
import UsersFoundPets from '../components/UsersFoundPets';
import { useNavigate } from 'react-router-dom';
const UserProfile = () => {
    const session = useContext(SessionContext);
    const [user, setUser] = useState(null);
    const [missingPets, setMissingPets] = useState([]) // state to hold the dogs data
    const [foundPets, setFoundPets] = useState([]) // state to hold the dogs data
    const [activeTab, setActiveTab] = useState('missing');
    const navigate = useNavigate();
        useEffect(() => {
            if (session && session.user) {
              getMissingPets();
              getCurrentUser();
              getFoundPets();
            } else {
              navigate('/login')
            }
          }, [session, getMissingPets, getCurrentUser]);
          
          async function getMissingPets() {
            let { data: missingPets, error } = await supabase
              .from('missingPets')
              .select('*')
              .eq('user_id', session.user.id)
            if (error) {
              console.error('Error fetching dogs: ', error);
              // handle error
            } else {
              setMissingPets(missingPets)
            }
          }

          async function getFoundPets() {
            let { data: foundPets, error } = await supabase
              .from('foundpets')
              .select('*')
              .eq('finder_id', session.user.id)
            if (error) {
              console.error('Error fetching dogs: ', error);
              // handle error
            } else {
              setFoundPets(foundPets)
            }
          }

          
          async function getCurrentUser() {
            if (!session || !session.user) {
              console.error('No session or user found');
              return;
            }
          
            let { data: profiles, error } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id);
          
            if (error) {
              console.error('Error fetching profile: ', error);
              // handle error
            } else {
              setUser(profiles[0])
            }
          }
    return (
        <div className='p-4 md:p-0 mx-auto max-w-screen-xl'>
          <div className='flex items-center justify-between pt-10'>
              <div>
                <h1 className="text-2xl md:text-5xl font-bold pb-5">
                  {user ? `${user.first_name}'s Profile` : 'Hi...'}
                </h1>
              </div>
          </div>

          <div className='flex gap-2 md:gap-5 pb-4'>
              <button 
                  onClick={() => setActiveTab('missing')} 
                  className={`px-2 py-2 ${activeTab === 'missing' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'} text-xs md:text-md rounded`}
              >
                  Your Missing Pets
              </button>

              <button 
                  onClick={() => setActiveTab('found')} 
                  className={`px-2 py-2 ${activeTab === 'found' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'} text-xs md:text-md rounded`}
              >
                  Pets You Found
              </button>
          </div>

          {activeTab === 'missing' && (
            <>
              { missingPets.length === 0 && 
                <div className='flex justify-center items-center my-20'>
                  <h1 className='text-2xl font-bold'>No Pets Found</h1>
                </div>
              }
              <UsersMissingPets missingPets={missingPets} />
            </>
          )}

          {activeTab === 'found' && (
            <>
              { foundPets.length === 0 && 
                <div className='flex justify-center items-center my-20'>
                  <h1 className='text-2xl font-bold'>No Pets Found</h1>
                </div>
              }
              <UsersFoundPets foundPets={foundPets} />
            </>
          )}
        </div>
    )
}

export default UserProfile