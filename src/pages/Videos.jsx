import React, { useState } from "react";
import Modal from '../components/Modal'
import TextInput from '../components/TextInput'
import BooleanInput from '../components/BoleanInput'
import Hr from '../components/Hr'
import SelectField from '../components/SelectField'
const Videos = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFree, setIsFree] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" }
  ];

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };


  const handleCheckboxChange = (value) => {
    setIsFree(value);
  };
  const handleCheckboxChangePreview = (value) => {
    setIsPreview(value);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
       <div>
        <div className="flex flex-row justify-between mt-10">
          <h2 className="text-2xl">All the Videos</h2>
          <button
            onClick={openModal}
            className="bg-primary text-white rounded-md px-10 py-2"
          >
            Create Video
          </button>
        </div>

        <div className="bg-secondary flex flex-row px-10 py-5 rounded-lg justify-between  mt-10">
          <h3>Ui/ux design Video 1</h3>
        </div>
      </div>
     
      <Modal isOpen={isModalOpen} onClose={closeModal}>
         
           <SelectField
           label={'Name of Course'}
        options={options}
        value={selectedOption}
        onChange={handleOptionChange}
      />

       
        <hr className="h-2" />
        <TextInput label={"Title"} type={"text"} />
        <hr className="h-2" />
        <TextInput label={"Video Url"} type={"Text"} />
        <hr className="h-2" />
        <TextInput label={"Duration"} type={"text"} />
        <hr className="h-2" />
        <TextInput label={"Description"} type={"text"} />
        <hr className="h-2" />
        <TextInput label={"Cover Image"} type={"text"} />
        <hr className="h-2" />

        <div className="flex flex-row gap-5">
          <BooleanInput
            label="IsFree Video"
            value={isFree}
            onChange={handleCheckboxChange}
          />
          <BooleanInput
            label="IsPreveiw Video"
            value={isPreview}
            onChange={handleCheckboxChangePreview}
          />
        </div>

        <Hr gap={10} />
        <button className="px-10 bg-primary py-2 rounded-md text-white">
          Create Video
        </button>
      </Modal>
    </div>
  )
}

export default Videos