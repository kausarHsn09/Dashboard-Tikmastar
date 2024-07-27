import { useState } from "react";
import Modal from "../components/Modal";
import TextInput from "../components/TextInput";
import Hr from "../components/Hr";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getData } from "../services/getResouces";
import { addData } from "../services/postResources";
import { deleteData } from "../services/deleteResources";
import { useSelector } from "react-redux";
import { selectUserToken } from "../features/authSlice";
import Loader from "../components/Loader";
import { notify } from "../utils/notify";

const Bio = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [text, setText] = useState("");
  const queryClient = useQueryClient();
  const token = useSelector(selectUserToken);
 const [page, setPage] = useState(1);  // State to track current page


 const { data: getBio, isLoading: bioLoader } = useQuery({
    queryKey: ["bios", page],  // Include page in the query key
    queryFn: () => getData(token, `bio?page=${page}`),  // Modify endpoint to accept page parameter
  });


  const mutation = useMutation({
    mutationFn: addData,
    onSuccess: async () => {
      queryClient.invalidateQueries(["bios"]);
      notify(" Created");
      setIsModalOpen(false);
    },
    onError: () => {
      notify(" Creation Error");
    },
  });

  const createConroller = () => {
    mutation.mutate({
      token,
      endpoint: "bio",
      data: {
        text
      },
    });
  };

  const deletemutation = useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      queryClient.invalidateQueries(["bios"]);
      notify(" deleted successfully");

      closeModal();
    },
    onError: () => {
      notify("Failed to delete");
    },
  });

  const deleteHandler = (id) => {
   
    const data = {
      token,
      endpoint: `bio/${id}`,
    };
    if (id) {
      deletemutation.mutate(data);
    }
  };


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  if (bioLoader) return <Loader />;
  const data = getBio?.data?.docs;
  const totalPages = getBio?.data?.totalPages;  // Total number of pages
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
      {data.map((item, index) => (
        <div
          key={index}
          className="bg-white mt-5 drop-shadow-md rounded-md h-[100px] flex flex-row gap-10 px-10 items-center "
        >
          <div className="w-[150px]">
            <h1 className="text-primary font-bold ">Name</h1>
            <h3>{item.text}</h3>
          </div>

          <button onClick={()=>deleteHandler(item._id)}>Delete</button>
        </div>
      ))}

 <div className="flex justify-center items-center space-x-2 mt-5">
  <button
    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
    disabled={page === 1}
    className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-700 disabled:bg-gray-300 rounded-md"
  >
    Previous
  </button>
  <span className="text-lg font-medium">
    Page {page} of {totalPages}
  </span>
  <button
    onClick={() => setPage((prev) => (prev < totalPages ? prev + 1 : prev))}
    disabled={page === totalPages}
    className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-700 disabled:bg-gray-300 rounded-md"
  >
    Next
  </button>
</div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <TextInput
          onChange={(e) => setText(e.target.value)}
          label={"Text Input"}
          value={text}
        />
        <Hr />
        <button onClick={createConroller} className="px-10 bg-primary py-2 rounded-md text-white ml-2">
          Create Bio
        </button>
      </Modal>
    </div>
  );
};

export default Bio;
