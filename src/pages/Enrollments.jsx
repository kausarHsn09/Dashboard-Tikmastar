import React, { useState } from "react";
import Modal from '../components/Modal'
import TextInput from '../components/TextInput'
import Hr from '../components/Hr'
import SelectField from '../components/SelectField'
import { CiLocationArrow1 } from "react-icons/ci";
const Enrollments = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const options = [
    { value: "pending", label: "Pending" },
    { value: "paid", label: "Paid" },
    { value: "notaccepted", label: "Not Accepted" },
  ];
  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
       <h2 className="text-2xl mt-10">All the Enrollments</h2>

      <div className="flex flex-row drop-shadow-md  bg-white rounded-xl justify-between py-5 px-10 mt-5">
        <div className="flex flex-row justify-between gap-10">
          <div>
            <h1 className="text-xl text-primary font-bold">
              UI /UX design Course
            </h1>
            <h3 className=" ">৳699</h3>
          </div>

          <div>
            <h1 className=" text-primary font-bold">Name</h1>
            <h3 className=" ">Kausar</h3>
          </div>
          <div>
            <h1 className=" text-primary font-bold">Status</h1>
            <h3 className=" ">Pending</h3>
          </div>
          <div>
            <h1 className=" text-primary font-bold">Bkash</h1>
            <h3 className=" ">0172569</h3>
          </div>
          <div>
            <h1 className=" text-primary font-bold">Enrolled</h1>
            <h3 className=" ">06/12/2024 10am</h3>
          </div>
        </div>

        <button
          className="w-[50px] h-[50px] rounded-[100%] border-[1px] border-primary justify-center items-center"
          onClick={openModal}
        >
          <CiLocationArrow1 size={35} />
        </button>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <SelectField
            label={"Select Status"}
            options={options}
            value={selectedOption}
            onChange={handleOptionChange}
          />
          <Hr />
          <TextInput label={"Message"} />
          <Hr gap={10} />
          <button className="px-10 bg-primary py-2 rounded-md text-white">
            Update
          </button>
        </Modal>
      </div>
    </div>
  )
}

export default Enrollments