
import loadingimg from '../../images/icons/dogvector.svg'

const Loading = () => {
  return (
    <div className='flex justify-center items-center mt-20 min-h-[300px]'>
      <img src={loadingimg} className='animate-ping' alt='loading' />
    </div>
  )
}

export default Loading