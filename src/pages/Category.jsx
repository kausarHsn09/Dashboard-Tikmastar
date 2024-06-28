import  { useState } from "react";
import Modal from "../components/Modal";
import { FaRegCopy } from "react-icons/fa";
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

const Category = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [category, setCategory] = useState("");
  const queryClient = useQueryClient();
  const token = useSelector(selectUserToken);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const { data: categorydata, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getData(token, "categories"),
  });

  const mutation = useMutation({
    mutationFn: addData,
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
      notify("Category added successfully");
      setCategory("");
      closeModal();
    },
    onError: () => {
      notify("Failed to add category");
    },
  });

  const createHandler = () => {
    const data = {
      token,
      endpoint: "categories",
      data: {
        name: category,
      },
    };

    if (category) {
      mutation.mutate(data);
    }
  };

  const deletemutation = useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
      notify("Category deleted successfully");
      setCategory("");
      closeModal();
    },
    onError: () => {
      notify("Failed to add category");
    },
  });

  const deleteHandler = (id) => {
    const data = {
      token,
      endpoint: `categories/${id}`,
    };
    if (id) {
      deletemutation.mutate(data);
    }
  };

  const categoryresult = categorydata?.data;
  console.log(categoryresult)
  if (isLoading) return <Loader />;

  return (
    <div>
      <div className="flex flex-row justify-between mt-10">
        <h2 className="text-2xl">All the Category</h2>
        <div className="flex flex-row gap-3">
          <button
            onClick={openModal}
            className="bg-primary text-white rounded-md px-10 py-2"
          >
            Create Category
          </button>
        </div>
      </div>

      {categoryresult.map((item, i) => {
        return (
          <div
            key={i}
            className="bg-white mt-5 drop-shadow-md rounded-md h-[100px] flex flex-row gap-10 px-10 items-center "
          >
            <div className="w-[150px]">
              <h1 className="text-primary font-bold ">Category Name</h1>
              <h3>{item.name}</h3>
            </div>

            <button onClick={()=>deleteHandler(item._id)}>
              <FaRegCopy />
            </button>
          </div>
        );
      })}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <TextInput
          onChange={handleCategoryChange}
          label={"Category"}
          type={"text"}
        />
        <Hr />
        <button
          onClick={createHandler}
          className="px-10 bg-primary py-2 rounded-md text-white ml-2"
        >
          Create Now
        </button>
      </Modal>
    </div>
  );
};

export default Category;
