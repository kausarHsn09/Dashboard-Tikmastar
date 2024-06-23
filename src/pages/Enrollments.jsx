import React, { useState } from "react";
import Modal from "../components/Modal";
import TextInput from "../components/TextInput";
import Hr from "../components/Hr";
import SelectField from "../components/SelectField";
import EnrollmentCard from "../components/EnrollmentCard";
import { getData } from "../services/getResouces";
import { updateDataPatch } from "../services/updateDataResources";
import { deleteData } from "../services/deleteResources";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { selectUserToken } from "../features/authSlice";
import Loader from "../components/Loader";
import { notify } from "../utils/notify";

const Enrollments = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Pending");
  const userToken = useSelector(selectUserToken);
  const [currentPage, setCurrentPage] = useState(1);
  const [payStatus, setPayStatus] = useState("Pending");
  const [enrollementId, setEnrollementId] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["enrollments",  currentPage, payStatus],
    queryFn: () =>
      getData(
        userToken,
        `enrollments?page=${currentPage}&limit=5${
          payStatus ? `&paymentStatus=${payStatus}` : ""
        }`
      ),
  });

  const updatePaymentStatusMutation = useMutation({
    mutationFn: updateDataPatch,
    onSuccess: async () => {
      queryClient.invalidateQueries(["enrollments"]);
      notify("Payment Status Updated");
      setIsModalOpen(false);
    },
    onError: () => {
      notify("Payment Status Update Error");
    },
  });
  const deleteEnrollmentMutation = useMutation({
    mutationFn: deleteData,
    onSuccess: async () => {
      queryClient.invalidateQueries(["enrollments"]);
      notify("Enrollment Updated");
      setIsModalOpen(false);
    },
    onError: () => {
      notify("Enrollment Update Error");
    },
  });
  const updatePaymentStatusHandler = () => {
    updatePaymentStatusMutation.mutate({
      token: userToken,
      endpoint: `enrollments/${enrollementId}`,
      data: {
        paymentStatus: selectedOption,
      },
    });
  };
  const deleteEnrollmentHandler = () => {
    deleteEnrollmentMutation.mutate({
      token: userToken,
      endpoint: `enrollments/${enrollementId}`,
    });
  };

  const options = [
    { value: "Pending", label: "Pending" },
    { value: "Paid", label: "Paid" },
    { value: "NotAccepted", label: "Not Accepted" },
  ];
  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOption("");
  };
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
 const filter = (value) => {
  setPayStatus(value);
  queryClient.invalidateQueries(["enrollments"]); // This will refetch the data immediately
};

  if (isLoading) return <Loader />;
  const enrollmentsdata = data?.data.enrollments;
  return (
    <div>
      <h2 className="text-2xl mt-10">All the Enrollments</h2>
      <div className="flex flex-row gap-2 mt-3">
        {options.map((item, i) => (
          <button
            className={` ${
              payStatus === item.value
                ? "bg-primary text-white"
                : "bg-secondary"
            } px-5 rounded-md py-2`}
            onClick={() => filter(item.value)}
            key={i}
          >
            {item.label}
          </button>
        ))}
      </div>

      {enrollmentsdata.map((item, index) => (
        <EnrollmentCard
          setEnrollementId={setEnrollementId}
          data={item}
          openModal={openModal}
          key={index}
        />
      ))}

      <div className="flex justify-center mt-10">
        <div>
          {currentPage > 1 && (
            <button onClick={() => handlePageChange(currentPage - 1)}>
              Previous
            </button>
          )}
          <span>Page {currentPage}</span>
          {data?.data.totalPages > currentPage && (
            <button onClick={() => handlePageChange(currentPage + 1)}>
              Next
            </button>
          )}
        </div>
      </div>

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
        <button
          onClick={updatePaymentStatusHandler}
          className="px-10 bg-primary py-2 rounded-md text-white"
        >
          Update
        </button>
        <button
          onClick={deleteEnrollmentHandler}
          className="px-10 bg-primary py-2 rounded-md text-white ml-2"
        >
          Delete
        </button>
      </Modal>
    </div>
  );
};

export default Enrollments;
