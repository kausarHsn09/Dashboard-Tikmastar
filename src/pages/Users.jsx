import React from 'react'
import UserCard from '../components/UserCard'
const Users = () => {
  return (
    <div>
      <div className="flex flex-row justify-between mt-10">
          <h2 className="text-2xl">All the Users</h2>
          <button className="bg-primary text-white rounded-md px-10 py-2">
            Create User
          </button>
        </div>
     
       <UserCard/>
    </div>
  )
}

export default Users