import React, { useState } from 'react';

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ user: '', text: '', images: [] });
  const [newImage, setNewImage] = useState(null);

  const handleAddComment = () => {
    if (newComment.images.length < 3) {
      setComments([...comments, newComment]);
      setNewComment({ user: '', text: '', images: [] });
    } else {
      alert('You can only add up to 3 images per comment.');
    }
  };

  const handleImageUpload = e => {
    setNewImage(URL.createObjectURL(e.target.files[0]));
  };

//   const handleAddImage = () => {
//     if (newComment.images.length < 3) {
//       setNewComment({ ...newComment, images: [...newComment.images, newImage] });
//       setNewImage(null);
//     } else {
//       alert('You can only add up to 3 images per comment.');
//     }
//   };

  return (
    <div className='p-4 bg-white rounded-md shadow-md'>
      <h2 className='text-lg font-bold mb-4'>Comments</h2>
      {comments.map((comment, index) => (
        <div key={index} className='mb-2'>
          <p className='text-sm'><strong>{comment.user}:</strong> {comment.text}</p>
          {comment.images.map((image, index) => (
            <img key={index} src={image} alt={`Comment ${index}`} />
          ))}
        </div>
      ))}
      <div className='mt-4'>
        <input 
          className='w-full p-2 border rounded-md'
          value={newComment.user}
          onChange={e => setNewComment({ ...newComment, user: e.target.value })}
          placeholder='Username...'
        />
        <textarea 
          className='w-full p-2 border rounded-md mt-2'
          value={newComment.text}
          onChange={e => setNewComment({ ...newComment, text: e.target.value })}
          placeholder='Add a comment...'
        />
        <input 
          type='file'
          className='w-full p-2 border rounded-md mt-2'
          onChange={handleImageUpload}
        />
        {/* <button 
          className='flex items-center bg-blue-600 text-white px-3 py-1 rounded-md mt-2'
          onClick={handleAddImage}
        >
          Add Image
        </button> */}
        <button 
          className='flex items-center bg-blue-600 text-white px-3 py-1 rounded-md mt-2'
          onClick={handleAddComment}
        >
          Add Comment
        </button>
      </div>
    </div>
  );
};

export default Comments;