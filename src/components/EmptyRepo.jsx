import images from '../assets/assets'

function EmptyRepo() {
  return (
    <div className="text-center mt-12">  
      <div className="flex justify-center mt-12">
        <img 
          src={images.no_repo_found} 
          alt="no_repo" 
          className='h-80 w-100'
        />
      </div>
      <h1 className="text-3xl font-semibold pt-10">
        This repository is empty!
      </h1>
    </div>
  )
}

export default EmptyRepo