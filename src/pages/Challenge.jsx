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
import { SlArrowRightCircle } from "react-icons/sl";
import { Link } from "react-router-dom";
const Challenge = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");

  const queryClient = useQueryClient();
  const token = useSelector(selectUserToken);

  const { data: getBio, isLoading: bioLoader } = useQuery({
    queryKey: ["challenges"], 
    queryFn: () => getData(token, `challenges`),
  });

  const mutation = useMutation({
    mutationFn: addData,
    onSuccess: async () => {
      queryClient.invalidateQueries(["challenges"]);
      notify("Created");
      setIsModalOpen(false);
    },
    onError: () => {
      notify("Creation Error");
    },
  });

  const createConroller = () => {
    mutation.mutate({
      token,
      endpoint: "challenges",
      data: {
        title,
        description,
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
      endpoint: `challenges/${id}`,
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
  const data = getBio?.data;

  return (
    <div>
      {" "}
      <div className="flex flex-row justify-between mt-10">
        <h2 className="text-2xl">All the Challenge</h2>
        <div className="flex flex-row gap-3">
          <button
            onClick={openModal}
            className="bg-primary text-white rounded-md px-10 py-2"
          >
            Create Challenge
          </button>
        </div>
      </div>
      {data.map((item, index) => (
        <div
          key={index}
          className="bg-white mt-5 drop-shadow-md rounded-md h-[100px] flex flex-row gap-10 px-10 items-center "
        >
          <div className="w-[150px]">
            <h1 className="text-primary font-bold ">Title</h1>
            <h3>{item.title}</h3>
          </div>
          <div className="w-[150px]">
            <h1 className="text-primary font-bold ">Description</h1>
            <h3>{item.description}</h3>
          </div>

          <button onClick={() => deleteHandler(item._id)}>Delete</button>
        
        <Link to={`/submissions/${item._id}`}>
          <SlArrowRightCircle size={30}/>
        </Link>

        </div>
      ))}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <TextInput
          onChange={(e) => setTitle(e.target.value)}
          label={"title"}
          value={title}
        />
        <Hr />
        <TextInput
          onChange={(e) => setdescription(e.target.value)}
          label={"description"}
          value={description}
        />
        <Hr />
        <button
          onClick={createConroller}
          className="px-10 bg-primary py-2 rounded-md text-white ml-2"
        >
          Create Challenge
        </button>
      </Modal>
    </div>
  );
};

export default Challenge;
