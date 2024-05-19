import React, { useState } from "react";
import Modal from "../components/Modal";
import TextInput from "../components/TextInput";
import BooleanInput from "../components/BoleanInput";
import Hr from "../components/Hr";
import SelectField from "../components/SelectField";
import { getDataWitoutAuth } from "../services/getResouces";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import { selectUserToken } from "../features/authSlice";
import useCourses from "../hooks/useCourses";
const Videos = () => {
  const userToken = useSelector(selectUserToken);
  const { courseLoader, coursesdata } = useCourses();
  const [isModalOpen, setIsModalOpen] = useState(false);
  //formdata
  const [isFree, setIsFree] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["videos"],
    queryFn: () => getDataWitoutAuth("videos"),
  });

  const videosdata = data?.data;

  const options = coursesdata.map((course) => ({
    value: course._id,
    label: course.title,
  }));


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

  if (isLoading) return <Loader />;

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
        <div className="flex flex-col gap-3 mt-10">
          {videosdata.map((item, i) => (
            <div
              key={i}
              className="bg-secondary flex flex-row px-10 py-5 rounded-lg justify-between "
            >
              <h3>{item.title}</h3>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <SelectField
          label={"Name of Course"}
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
  );
};

export default Videos;
