import React, { useState } from "react";
import Modal from "../components/Modal";
import { FaRegCopy } from "react-icons/fa";
const Caption = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex flex-row justify-between mt-10">
        <h2 className="text-2xl">All the Caption</h2>
        <div className="flex flex-row gap-3">
          <button
            onClick={openModal}
            className="bg-primary text-white rounded-md px-10 py-2"
          >
            Create Caption
          </button>
        </div>
      </div>

      <div className="bg-white mt-5 drop-shadow-md rounded-md h-[100px] flex flex-row gap-10 px-10 items-center ">
        <div className="w-[150px]">
          <h1 className="text-primary font-bold ">Name</h1>
          <h3>Noting</h3>
        </div>
        <div>
          <h1 className=" text-primary font-bold">Role</h1>
          <h3>Noting</h3>
        </div>
        <div>
          <h1 className=" text-primary font-bold">User ID</h1>
          <div className="flex flex-row gap-3">
            <h3>Noting</h3>
            <button>
              <FaRegCopy />
            </button>
          </div>
        </div>
        <div>
          <h1 className=" text-primary font-bold">Email</h1>
          <h3>Noting</h3>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h1>Hello</h1>
        <h1>Hello</h1>
      </Modal>
    </div>
  );
};

export default Caption;
