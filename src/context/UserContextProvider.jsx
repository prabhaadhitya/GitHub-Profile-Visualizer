import { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const UserContainer = createContext();

export function UserContextProvider({children}) {

  const [searchTerm, setSearchTerm] = useState("")
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [status, setStatus] = useState("idle");
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
   
  const handleInput = async (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) {
            setErrMsg("Enter a Gitub Username");
            setStatus("error");
            setProfile(null);
            return;
        }
        try {
            setIsLoading(true)
            setStatus("loading");
            setProfile(null);
            setErrMsg("");
            const response = await fetch(`https://api.github.com/users/${searchTerm}`, {
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
                }
            })
            if (!response.ok) {
                if (response.status === 404) {
                    setErrMsg("User not found");
                }
                else if (response.status === 403) {
                    setErrMsg("API rate limit exceeded. Try again later.");
                }
                else {
                    setErrMsg("Something went wrong. Please try again.");
                }
                setStatus("error");
                return;
            } else {
                const data = await response.json();
                setProfile(data);
                setStatus("success");
            }            
        } catch (error) {
            setStatus("error");
            setErrMsg("Enter Valid Username");
            setProfile(null);
            console.log("Error in Search Input: ",error)
        } finally {
            setIsLoading(false)
        }
    }

    const errorHandle = () => {
        setStatus("idle");
        setSearchTerm("");
        setErrMsg("");
    }

    const handleHome = () => {
        navigate('/')
    }

  const handleRepo = async () => {
    if (!searchTerm) return;
    try {
        const response = await fetch(`https://api.github.com/users/${searchTerm}/repos`, {
            headers: {
                "Authorization": `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`
            }
        });
        const data = await response.json();
        setRepos(data)
    } catch (error) {
        setErrMsg("Something went wrong")
        console.log("Error in Search Repos: ",error)
    } finally {
        setIsLoading(false);
    }    
  }

  const values = {
    searchTerm, 
    setSearchTerm, 
    handleInput, 
    errorHandle, 
    status, 
    profile, 
    errMsg,
    repos, 
    handleRepo, 
    isLoading,
    setIsLoading,
    handleHome
  }

  return (
      <UserContainer.Provider value={values}>
        {children}
      </UserContainer.Provider>
  )
}