import React, { useState } from "react";
import Modal from "../components/Modal";
import TextInput from "../components/TextInput";
import Hr from "../components/Hr";
import SelectField from "../components/SelectField";
import EnrollmentCard from "../components/EnrollmentCard";
import { getData } from "../services/getResouces";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { selectUserToken } from "../features/authSlice";
import Loader from "../components/Loader";
const Enrollments = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const userToken = useSelector(selectUserToken);

  const { data, isLoading } = useQuery({
    queryKey: ["enrollments"],
    queryFn: () => getData(userToken, "enrollments"),
  });

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

  if (isLoading) return <Loader />;
  const enrollmentsdata = data?.data;
  return (
    <div>
      <h2 className="text-2xl mt-10">All the Enrollments</h2>
      {enrollmentsdata.map((item, index) => (
        <EnrollmentCard data={item} openModal={openModal} key={index} />
      ))}

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
  );
};

export default Enrollments;
