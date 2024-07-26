import { useState } from "react";
import Modal from "../components/Modal";
import TextInput from "../components/TextInput";
import Hr from "../components/Hr";

const Bio = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [text, setText] = useState("");
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {" "}
      <div className="flex flex-row justify-between mt-10">
        <h2 className="text-2xl">All the Bio</h2>
        <div className="flex flex-row gap-3">
          <button
            onClick={openModal}
            className="bg-primary text-white rounded-md px-10 py-2"
          >
            Create Bio
          </button>
        </div>
      </div>
      <div className="bg-white mt-5 drop-shadow-md rounded-md h-[100px] flex flex-row gap-10 px-10 items-center ">
        <div className="w-[150px]">
          <h1 className="text-primary font-bold ">Name</h1>
          <h3>Item</h3>
        </div>
        <div>
          <h1 className=" text-primary font-bold">Category</h1>
          <h3>Category</h3>
        </div>
        <button>Delete</button>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <TextInput
          onChange={(e) => setText(e.target.value)}
          label={"Text Input"}
          value={text}
        />
        <Hr />
        <button className="px-10 bg-primary py-2 rounded-md text-white ml-2">
          Create Bio
        </button>
      </Modal>
    </div>
  );
};

export default Bio;
