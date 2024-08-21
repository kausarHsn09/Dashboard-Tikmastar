import { useState } from "react";
import UserCard from "../components/UserCard";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getData } from "../services/getResouces";
import { addData } from "../services/postResources";
import { deleteData } from "../services/deleteResources";
import { useSelector } from "react-redux";
import { selectUserToken } from "../features/authSlice";
import Loader from "../components/Loader";
import Modal from "../components/Modal";
import { notify } from "../utils/notify";
import TextInput from "../components/TextInput";
import Hr from "../components/Hr";

const Users = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const token = useSelector(selectUserToken);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => getData(token, "users"),
  });

  const createUserMutation = useMutation({
    mutationFn: addData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setIsModalOpen(false);
      notify("User created Successfully");
    },
    onError: (e) => {
      notify(e.response.data.message);
    },
  });
  const deleteUserMutation = useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setIsModalOpen2(false);
      notify("User deleted Successfully");
    },
    onError: (e) => {
      notify(e.response.data.message);
     
    },
  });

  const createUserHandler = () => {
    if (!name || !phone || !password) return;
    createUserMutation.mutate({
      token,
      endpoint: "users",
      data: {
        name,
        phone,
        password,
      },
    });
  };
  const deleteUserHandler = () => {
    deleteUserMutation.mutate({
      token,
      endpoint: `users/${userId}`,
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModal2 = () => {
    setIsModalOpen2(true);
  };

  const closeModal2 = () => {
    setIsModalOpen2(false);
  };

  const handlenameChange = (e) => {
    setName(e.target.value);
  };
  const handlepasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handlephoneChange = (e) => {
    setPhone(e.target.value);
  };

  if (isLoading) return <Loader />;

  return (
    <div>
      <div className="flex flex-row justify-between mt-10">
        <h2 className="text-2xl">All the Users</h2>
        <div className="flex flex-row gap-3">
          <button
            onClick={openModal}
            className="bg-primary text-white rounded-md px-10 py-2"
          >
            Create User
          </button>
          <button
            onClick={openModal2}
            className="bg-primary text-white rounded-md px-10 py-2"
          >
            Delete User
          </button>
        </div>
      </div>

      {data?.data.map((item, index) => (
        <UserCard
          role={item.role}
          id={item._id}
          name={item.name}
          key={index}
          phone={item.phone}
        />
      ))}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <TextInput onChange={handlenameChange} label={"Name"} type={"text"} />
        <Hr />
        <TextInput
          onChange={handlephoneChange}
          label={"Phone"}
          type={"text"}
        />
        <Hr />
        <TextInput
          onChange={handlepasswordChange}
          label={"Password"}
          type={"text"}
        />
        <Hr gap={10} />
        <button
          onClick={createUserHandler}
          className="px-10 bg-primary py-2 rounded-md text-white ml-2"
        >
          Create
        </button>
      </Modal>
      <Modal isOpen={isModalOpen2} onClose={closeModal2}>
        <TextInput
          onChange={(e) => setUserId(e.target.value)}
          label={"User Id"}
          type={"text"}
        />
        <Hr />

        <Hr gap={10} />
        <button
          onClick={deleteUserHandler}
          className="px-10 bg-primary py-2 rounded-md text-white ml-2"
        >
          Delete
        </button>
      </Modal>
    </div>
  );
};

export default Users;
