import React, { useState } from "react";
import Modal from '../components/Modal'
import TextInput from '../components/TextInput'
import {getDataWitoutAuth} from '../services/getResouces'
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { selectUserToken } from "../features/authSlice";
import Loader from "../components/Loader";
const Courses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");

   const { data, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: () => getDataWitoutAuth("courses"),
  });

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  if(isLoading) return <Loader />;
  const coursesdata = data?.data
  return (
    <div>
      <div>
        <div className="flex flex-row justify-between mt-10">
          <h2 className="text-2xl">All the Courses</h2>
          <button
            onClick={openModal}
            className="bg-primary text-white rounded-md px-10 py-2"
          >
            Create Course
          </button>
        </div>
         {
          coursesdata.map((item,index)=>(
            <div key={index} className="bg-secondary flex flex-row px-10 py-5 rounded-lg justify-between  mt-4">
          <h3>{item.title}</h3>
          <h4>{item.price}</h4>
        </div>
          ))
         }
        

      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <TextInput
          onChange={handleNameChange}
          label={"Name of Course"}
          type={"text"}
        />
        <hr className="h-2" />
        <TextInput label={"Descriptions"} type={"text"} />
        <hr className="h-2" />
        <TextInput label={"Price"} type={"number"} />
        <hr className="h-2" />
        <TextInput label={"Enrollment Count"} type={"number"} />
        <hr className="h-2" />
        <TextInput label={"Stars"} type={"number"} />
        <hr className="h-2" />
        <TextInput label={"Cover Image"} type={"text"} />
        <hr className="h-5" />
        <button className="px-10 bg-primary py-2 rounded-md text-white">
          Create Course
        </button>
      </Modal>
    </div>
  )
}

export default Courses