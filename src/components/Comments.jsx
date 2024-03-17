import React, { useContext, useEffect, useState } from 'react';
import { SessionContext } from './SessionContext';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import usericon from '../../images/icons/user-outline.svg';
import { formatDistance, parseISO } from 'date-fns';
const Comments = ({petId,petType}) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ user: '', text: '' });
  const session = useContext(SessionContext);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  // ...

  function formatDate(dateString) {
    try {
      const date = parseISO(dateString);
      const now = new Date();
      return formatDistance(date, now, { addSuffix: true });
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString; // Return the original string if there's an error
    }
  }

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
      users: user_id (first_name),
      date
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
    <div className='mb-10  mx-auto'>
      <div className='bg-[#484848] mb-10 rounded-full w-32 flex justify-center items-center text-center'>
        <h2 className='text-lg font-bold py-1 text-white'>Comments</h2>
      </div>
    
      {comments === null && <div className='text-gray-500'>Loading...</div>}
      {comments !== null && comments.length === 0 && <div className='text-gray-500'>No comments yet.</div>}
      {comments && comments.length > 0 && comments.map((comment, index) => (
      <div key={index} className='flex pb-8 '>
        <div className='flex mr-2 flex-shrink-0'>
          <img src={usericon} alt='user' className='w-10 h-10 rounded-full' />
        </div>

        <div className='flex-grow ml-2 items-start mb-2 border-gray-200 pb-2' style={{overflowWrap: 'break-word'}}>
          <div className='flex gap-5 items-center'>
            <p className='font-bold text-lg'>
              {comment.users ? comment.users.first_name : 'Guest'}:
            </p> 
            <p className='text-sm text-[#808285]'>
              {formatDate(comment.date)}
            </p>
          </div>
          <p className='text-sm text-gray-700 break-words'>
            {comment.text}
          </p>
        </div>
      </div>
      ))}

      <div className='mt-4'>
        {session ? (
        <form onSubmit={handleAddComment} className='space-y-2'>
          {/* <p className='text-md font-semibold text-gray-700'>Comment as {user.first_name}</p> */}
          <textarea 
            value={newComment.text}
            onChange={e => setNewComment({ ...newComment, text: e.target.value })}
            placeholder='Add a comment...'
            className='w-full p-2 border border-gray-300 rounded-md'
          />
          <button type='submit' className='w-30s px-4 py-2 bg-[#FF7B36] text-white rounded-full'>Add Comment</button>
        </form>
      ) : (
            <div className='rounded-md text-center'>
              {/* <p className='mb-4'></p> */}
              <button onClick={()=> {navigate('/login')}}className='w-30 px-4 py-2 bg-[#FF7B36] text-white rounded-full'> Login to add a comment</button>
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