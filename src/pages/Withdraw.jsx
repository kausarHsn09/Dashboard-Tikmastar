import React from "react";
import TextInput from "../components/TextInput";
import TransctionsCard from "../components/TransctionsCard";
import { useState } from "react";
import Modal from "../components/Modal";
import { getData } from "../services/getResouces";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { selectUserToken } from "../features/authSlice";
import Loader from "../components/Loader";
import { notify } from "../utils/notify";
import Hr from "../components/Hr";
import {updateDataPatch} from '../services/updateDataResources';

const Withdraw = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState("pending");
  const queryClient = useQueryClient();
  const userToken = useSelector(selectUserToken);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionId, setTransactionId] = useState("");
  const [approved, setApproved] = useState(true);
  const [declined, setDeclined] = useState(null);
  const [notes, setNotes] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["transactions", currentPage, status],
    queryFn: () =>
      getData(
        userToken,
        `withdraw/transactions?page=${currentPage}&limit=3${
          status ? `&status=${status}` : ""
        }`
      ),
  });

  const approveWithdrawMutation = useMutation({
    mutationFn: updateDataPatch,
    onSuccess: async () => {
      queryClient.invalidateQueries(["transactions"]);
      notify("Withdraw Request Approved");
      setIsModalOpen(false);
    },
    onError: () => {
      notify("Withdraw Request Approval Error");
    },
  })


  const declineWithdrawMutation = useMutation({
    mutationFn: updateDataPatch,
    onSuccess: async () => {
      queryClient.invalidateQueries(["transactions"]);
      notify("Withdraw Request Declined");
      setIsModalOpen(false);
      setNotes('');
    },
    onError: () => {
      notify("Withdraw Request Decline Error");
    },
  })

  const approveHandelar = ()=>{
    approveWithdrawMutation.mutate({
      token: userToken,
      endpoint: `withdraw/approve/${transactionId}`,
    });
  }
  const declineHandler = ()=>{
    declineWithdrawMutation.mutate({
      token: userToken,
      endpoint: `withdraw/decline/${transactionId}`,
      data: {
        notes: notes,
      },
    });
  }

  const transactionsdata = data?.data?.data;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const options = [
    { value: "pending", label: "Pending" },
    { value: "approved", label: "Approved" },
    { value: "declined", label: "Declined" },
  ];

  const filter = (value) => {
    setStatus(value);
    queryClient.invalidateQueries(["transactions"]);
  };
  if (isLoading) return <Loader />;

  return (
    <div>
      <h2 className="text-2xl mt-10">All the Withraw Request</h2>
      <div className="flex flex-row gap-2 mt-3">
        {options.map((item, i) => (
          <button
            className={` ${
              status === item.value ? "bg-primary text-white" : "bg-secondary"
            } px-5 rounded-md py-2`}
            onClick={() => filter(item.value)}
            key={i}
          >
            {item.label}
          </button>
        ))}
      </div>

      {transactionsdata.map((item, index) => (
        <TransctionsCard
          User={item.user}
          Ammount={item.amount}
          Dates={item.createdAt}
          Type={item.type}
          key={index}
          id={item._id}
          notes={item.notes}
          openModal={openModal}
          setid={setTransactionId}
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
        <h2>{transactionId}</h2>
        <Hr />
        <div className="flex flex-row gap-5">
          <button
            className={`px-10  py-2 rounded-md text-black ml-2 ${
              approved && "border-2 border-sky-500"
            }`}
            onClick={() => {
              setApproved(true);
              setDeclined(false);
            }}
          >
            Approve
          </button>
          <button
            className={`px-10  py-2 rounded-md text-black ml-2 ${
              declined && "border-2 border-sky-500"
            }`}
            onClick={() => {
              setDeclined(true);
              setApproved(false);
            }}
          >
            Decline
          </button>
        </div>
        <Hr gap={10} />
        {approved && (
          <button onClick={approveHandelar} className="px-10 w-full bg-primary py-2 rounded-md text-white ml-2">
            Approve Now
          </button>
        )}

        {declined && (
          <>
            <TextInput
              label={"Notes"}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <Hr />
            <button onClick={declineHandler} className="px-10 bg-primary py-2 rounded-md text-white ml-2">
              Decline
            </button>
          </>
        )}
      </Modal>
    </div>
  );
};

export default Withdraw;
