import { Loader2 } from 'lucide-react'
function Loader() {
    return (
        <div className="flex justify-center items-center pt-60 ">
            <Loader2 className='h-6 w-6 animate-spin text-blue-400' />
        </div>
    )
}

export default Loader