import { createContext, useState } from 'react'

export const UserContainer = createContext();

export function UserContextProvider({children}) {

  const [searchTerm, setSearchTerm] = useState("")
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [status, setStatus] = useState("idle");
  const [isLoading, setIsLoading] = useState(false)

   
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
        } finally {
            setIsLoading(false)
        }

    }

  const errorHandle = () => {
        setStatus("idle");
        setSearchTerm("");
        setErrMsg("");
    }

  const handleRepo = async () => {
    const response = await fetch(`https://api.github.com/users/${searchTerm}/repos`, {
                headers: {
                "Authorization": `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`
            }
            });
    const data = await response.json();
    setRepos(data)
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
    isLoading
  }

  return (
      <UserContainer.Provider value={values}>
        {children}
      </UserContainer.Provider>
  )
}