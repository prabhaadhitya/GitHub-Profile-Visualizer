
function ProfileView({profile}) {

    const {avatar_url, login, name, bio, followers, following, public_repos, company, blog, location} = profile;

  return (
    <div className="flex justify-center">
        <div className="m-5 w-[50%]">
            <div className="text-center flex-col justify-center items-center">
                <div className="flex justify-center">
                    <img src={avatar_url} alt={login} className="w-35 h-35 rounded-full"  />
                </div>
                <div className="p-3">
                    <h1 className="text-[#F8FAFC] text-3xl pt-2">{name}</h1>
                    <h3 className="text-[#F8FAFC] text-xl pt-2">{login}</h3>
                    <p className="text-[#F8FAFC] text-lg pt-2">{bio || "No Description"}</p>
                </div>
            </div>
            <div className="flex justify-around text-center m-5">
                <div>
                    <h3 className="text-[#3B82F6] text-2xl pt-2">{followers}</h3>
                    <h3 className="text-[#F8FAFC] text-lg pt-2">FOLLOWERS</h3>                    
                </div>
                <div>
                    <p className="text-[#3B82F6] text-2xl pt-2">{following}</p>
                    <h3 className="text-[#F8FAFC] text-lg pt-2">FOLLOWING</h3>                    
                </div>
                <div>
                    <p className="text-[#3B82F6] text-2xl pt-2">{public_repos}</p>
                    <h3 className="text-[#F8FAFC] text-lg pt-2">PUBLIC REPOS</h3>                    
                </div>
            </div>
            <div className="flex justify-around text-center">
                <div className="m-3">
                    <p className="text-[#3B82F6] text-xl pt-2">{company || "Not Available" }</p>
                    <h3 className="text-[#F8FAFC] text-lg pt-2">COMPANY</h3>                    
                </div>
                <div className="m-3">
                    <p className="text-[#3B82F6] text-xl pt-2">{blog || "Not Available"}</p>
                    <h3 className="text-[#F8FAFC] text-lg pt-2">COMPANY URL</h3>                    
                </div>
                <div className="m-3">
                    <p className="text-[#3B82F6] text-xl pt-2">{location || "Not Available"}</p>
                    <h3 className="text-[#F8FAFC] text-lg pt-2">LOCATION</h3>                    
                </div>
            </div>
        </div>
    </div> 
  )
}

export default ProfileView
