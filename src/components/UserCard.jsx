import React from 'react'
import { MdDelete } from "react-icons/md"
const UserCard = () => {
  return (
    <div className='bg-white mt-5 drop-shadow-md rounded-md h-[100px] flex flex-row justify-between px-10 items-center '>
          <div>
            <h1 className=' text-primary font-bold'>Kausar</h1>
            <h3 className=' '>0172569</h3>
          </div>
          <button>
            <MdDelete size={30}/>

          </button>
       </div>
  )
}

export default UserCard