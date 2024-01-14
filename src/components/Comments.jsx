import React, { useContext, useEffect, useState } from 'react';
import { SessionContext } from './SessionContext';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
const Comments = ({petId}) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ user: '', text: '' });
  const session = useContext(SessionContext);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  // ...

  useEffect(() => {
    getComments(petId);
    getCurrentUser()
  }, [petId,user]);

  async function getComments(petId) {
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
    `);
  
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
          pet_id: petId
        },
      ]);
  
    if (error) {
      console.error('Error adding comment: ', error);
    } else {
      console.log('Comment added: ', data);
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
    <div className='p-4 bg-white rounded-md shadow-md mx-auto'>
      <h2 className='text-lg font-bold mb-4'>Comments</h2>
      {comments === null && <div className='text-gray-500'>Loading...</div>}
      {comments !== null && comments.length === 0 && <div className='text-gray-500'>No comments yet.</div>}
      {comments && comments.length > 0 && comments.map((comment, index) => (
        <div key={index} className='mb-2 border-b border-gray-200 pb-2'>
          <p className='text-sm text-gray-700'>
            <strong>
              {comment.users ? comment.users.first_name : 'Guest'}:
            </strong> 
            {comment.text}
          </p>
        </div>
      ))}
      <div className='mt-4'>
      {session && user ? (
      <form onSubmit={handleAddComment} className='space-y-2'>
        <p className='text-sm text-gray-700'>{user.first_name}</p>
        <textarea 
          value={newComment.text}
          onChange={e => setNewComment({ ...newComment, text: e.target.value })}
          placeholder='Add a comment...'
          className='w-full p-2 border border-gray-300 rounded-md'
        />
        <button type='submit' className='w-full px-4 py-2 bg-blue-500 text-white rounded-md'>Add Comment</button>
      </form>
    ) : (
      <div className='bg-gray-200 p-4 rounded-md'>
        <p className='mb-4'>Login to add a comment</p>
        <button onClick={()=> {navigate('/login')}}className='w-full px-4 py-2 bg-blue-500 text-white rounded-md'>Login</button>
      </div>
)}
      </div>
    </div>
  );
};

export default Comments;