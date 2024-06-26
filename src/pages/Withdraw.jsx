import React from "react";
import TextInput from "../components/TextInput";
import TransctionsCard from "../components/TransctionsCard";
import { useState } from "react";
import Modal from "../components/Modal";

const Withdraw = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h2 className="text-2xl mt-10">All the Withraw Request</h2>
      <div className="flex flex-row gap-2 mt-3">
        <button className="bg-primary text-white px-5 rounded-md py-2 ">
          No
        </button>
      </div>

      <TransctionsCard openModal={openModal} />

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h1>Nothing</h1>
      </Modal>
    </div>
  );
};

export default Withdraw;
