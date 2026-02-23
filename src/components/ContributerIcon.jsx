function ContributerIcon({person}) {
    
  return (    
    <img src={person.avatar_url} alt="contributor_img" className='w-7 h-7 rounded-2xl'/>   
  )
}

export default ContributerIcon