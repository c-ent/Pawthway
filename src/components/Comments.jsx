import React, { useContext, useEffect, useState } from 'react';
import { SessionContext } from './SessionContext';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import usericon from '../../images/icons/user-outline.svg';
const Comments = ({petId,petType}) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ user: '', text: '' });
  const session = useContext(SessionContext);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  // ...


  useEffect(() => {
    getComments(petId,petType);
    getCurrentUser()
  }, [petId,user,session]);

  async function getComments(petId,petType) {
    if (petId === undefined) {
      console.error('petId is undefined');
      return;
    }
  
    const { data, error } = await supabase
    .from('comments')
    .select(`
      text,
      user_id,
      users: user_id (first_name)
    `)
    .eq('pet_id', petId)
    .eq('pet_type', petType)
    
  
    if (error) {
      console.error('Error fetching comments: ', error);
      // handle error
    } else {
      setComments(data);
    }
  }
  async function handleAddComment(event) {
    event.preventDefault(); // prevent form from refreshing the page
    if (!session || !session.user) {
      console.error('No user session available');
      return;
    }

    const userId = session.user.id;
  
    const { data, error } = await supabase
      .from('comments')
      .insert([
        { 
          text: newComment.text, 
          user_id: userId, 
          pet_id: petId,
          pet_type: petType
        },
      ]);
  
    if (error) {
      console.error('Error adding comment: ', error);
    } else {
      setNewComment({ user: '', text: '' }); // reset form
    }
  };
  

  async function getCurrentUser() {
  
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



  // const handleImageUpload = e => {
  //   setNewImage(URL.createObjectURL(e.target.files[0]));
  // };

//   const handleAddImage = () => {
//     if (newComment.images.length < 3) {
//       setNewComment({ ...newComment, images: [...newComment.images, newImage] });
//       setNewImage(null);
//     } else {
//       alert('You can only add up to 3 images per comment.');
//     }
//   };

  return (
    <div className='p-4 mt-10  border-t border-black mx-auto'>
      <h2 className='text-lg font-bold mb-4'>Comments</h2>
      {comments === null && <div className='text-gray-500'>Loading...</div>}
      {comments !== null && comments.length === 0 && <div className='text-gray-500'>No comments yet.</div>}
      {comments && comments.length > 0 && comments.map((comment, index) => (
      <div key={index} className='flex pb-3'>
        <div className='flex mr-2 flex-shrink-0'>
          <img src={usericon} alt='user' className='w-10 h-10 rounded-full' />
        </div>

        <div className='flex-grow ml-2 items-start mb-2 border-gray-200 pb-2' style={{overflowWrap: 'break-word'}}>
          <p className='font-bold'>
            {comment.users ? comment.users.first_name : 'Guest'}:
          </p> 
          <p className='text-sm text-gray-700 break-words'>
            {comment.text}
          </p>
        </div>
      </div>
      ))}

      <div className='mt-4'>
        {session && user ? (
        <form onSubmit={handleAddComment} className='space-y-2'>
          <p className='text-sm font-bold text-gray-700'>Comment as {user.first_name}</p>
          <textarea 
            value={newComment.text}
            onChange={e => setNewComment({ ...newComment, text: e.target.value })}
            placeholder='Add a comment...'
            className='w-full p-2 border border-gray-300 rounded-md'
          />
          <button type='submit' className='w-full px-4 py-2 bg-blue-500 text-white rounded-md'>Add Comment</button>
        </form>
      ) : (
            <div className=' p-4 rounded-md'>
              {/* <p className='mb-4'></p> */}
              <button onClick={()=> {navigate('/login')}}className='w-full px-4 py-2 bg-violet-500 text-white rounded-md'> Login to add a comment</button>
            </div>
      )}
      </div>
    </div>
  );
};

export default Comments;

{/* <div className='grid grid-cols-6 gap-4 pb-3'>
<div className='col-span-1 flex items-center'>
  <img src={usericon} alt='user' className='w-10 h-10 rounded-full' />
  <p className='ml-2'>
    {comment.users ? comment.users.first_name : 'Guest'}:
  </p> 
</div>
<div className='col-span-5 items-start mb-2 border-gray-200 pb-2'>
  <p className='text-sm text-gray-700 break-words'>
    {comment.text}
  </p>
</div>
</div> */}