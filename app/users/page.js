"use client"
import { useEffect, useState } from "react";
import UserItem from "../components/UserItem";
import Loader from "../components/Loader";
async function getUsers() {
  try{
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/users`)

    if(!res.ok){
      throw new Error('Failed to fetch users')
    }
    return res.json()
  }catch(error){
    console.log(error.message)
    return []
  }
}
export default function Page() {
  const [users, setUsers] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchUsers = async () =>{
    const userData = await getUsers()
    setUsers(userData)
    setLoading(false)

  }
  useEffect(()=>{
    fetchUsers()
  },[])
    const handleDelete = async (deletedId) => {
      await fetchUsers();
    };
  if(loading){
    return <Loader/>
    }
    return (
      <div className="h-[90vh] p-5 ">
        <div className="h-full bg-[var(--userlist-bg)] rounded-3xl p-6 overflow-hidden">
          <h1 className="text-3xl text-white font-bold ml-2 mb-4">Users</h1>
          <ul className="flex flex-col gap-4 max-h-[100%] overflow-y-auto pb-10">
            {users.map((user) => (
              <li key={user._id}>
                <UserItem user={user} onDelete={handleDelete} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
}