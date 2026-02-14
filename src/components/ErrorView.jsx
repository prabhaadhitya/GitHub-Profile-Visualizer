import images from '../assets/assets'

function ErrorView({onRetry}) {
  return (
    <div className="text-center mt-12">
      <h1 className="text-3xl font-semibold">Github Profile Visualizer</h1>
      <div className="flex justify-center mt-12">
        <img src={images.error_icon} className='h-60 w-80'/>
      </div>
      <h1 className='p-3'>Something went wrong.Please try again.</h1>
      <button className='text-white bg-[#3B82F6] h-12 w-27 rounded-xl' onClick={onRetry}>Try again</button>
    </div>
  )
}

export default ErrorView
