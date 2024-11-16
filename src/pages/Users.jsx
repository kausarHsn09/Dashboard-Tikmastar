import { useState, useEffect } from "react";
import UserCard from "../components/UserCard";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getData } from "../services/getResouces";
import { addData } from "../services/postResources";
import { deleteData } from "../services/deleteResources";
import { useSelector } from "react-redux";
import { selectUserToken } from "../features/authSlice";
import Modal from "../components/Modal";
import { notify } from "../utils/notify";
import TextInput from "../components/TextInput";
import Hr from "../components/Hr";
import SelectField from "../components/SelectField";

const Users = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const token = useSelector(selectUserToken);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");

  const [selectedOption, setSelectedOption] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [triggerSearch, setTriggerSearch] = useState(false); // To trigger re-fetching

  const [useKey, setUserKey] = useState("");
  const [useValue, setUserValue] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["findUser", selectedOption, searchValue],
    queryFn: () =>
      getData(token, `users/find-user?${selectedOption}=${searchValue}`),
    enabled: triggerSearch,
  });

  const handleSearch = () => {
    if (selectedOption && searchValue) {
      setTriggerSearch(true); // Trigger the query
    } else {
      notify("Please enter a search type and value");
    }
  };

  // Reactively handle side effects
  useEffect(() => {
    if (!isLoading) {
      setTriggerSearch(false); // Reset trigger when loading is done
    }
  }, [isLoading, error]);

  const createUserMutation = useMutation({
    mutationFn: addData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["finduser"] });
      setIsModalOpen(false);
      notify("User created Successfully");
    },
    onError: (e) => {
      notify(e.response.data.message);
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: addData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["finduser"] });
      notify("User Update Successfully");
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

  const updateUserHandler = () => {
    if (!data?.data.id) return;
    updateUserMutation.mutate({
      token,
      endpoint: `users/edit-user/${data?.data.id}`,
      data: {
        [useKey]: useValue,
      },
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

  const searchType = [
    { value: "", label: "Please Select" },
    { value: "username", label: "Username" },
    { value: "phone", label: "Phone" },
    { value: "id", label: "Id" },
  ];

  // if (isLoading) return <Loader />;

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

      <div className="bg-white mt-5 drop-shadow-md rounded-md h-[100px] flex flex-row gap-10 px-10 items-center justify-center">
        <h1 className="text-primary font-bold ">Search By</h1>
        <div className="flex-1">
          <SelectField
          options={searchType}
          selectedOption={selectedOption}
          onChange={(value) => setSelectedOption(value)}
        />
        </div>
        <div className="flex-1">
          <TextInput
            onChange={(e) => setSearchValue(e.target.value)}
            type={"text"}
            value={searchValue}
          />
        </div>
        <button
          onClick={handleSearch}
          className="px-10 bg-primary py-2 rounded-md text-white ml-2"
        >
          Search
        </button>
      </div>
      {data?.data && (
        <UserCard
        id={data?.data._id}
        name={data?.data.name}
        usename={data?.data.username}
        phone={data?.data.phone}
        userType={data?.data.userType}
        refer={data?.data.referralCode}
        refercount={data?.data.referralCount}
        balance={data?.data.balance}
        role={data?.data.role}
      />
      )
      }
      
      <Hr gap={10} />

      <TextInput
        onChange={(e) => setUserKey(e.target.value)}
        label={"Key"}
        type={"text"}
      />
      <Hr />
      <TextInput
        onChange={(e) => setUserValue(e.target.value)}
        label={"Value"}
        type={"text"}
      />

      <Hr gap={10} />
      <button
        onClick={updateUserHandler}
        className="px-10 bg-primary py-2 rounded-md text-white ml-2"
      >
        Update
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <TextInput onChange={handlenameChange} label={"Name"} type={"text"} />
        <Hr />
        <TextInput onChange={handlephoneChange} label={"Phone"} type={"text"} />
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
