import React, { useState } from "react";
import Modal from "../components/Modal";
import { FaRegCopy } from "react-icons/fa";
import SelectField from "../components/SelectField";
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
import useCategories from "../hooks/useCategories";

const Hashtag = () => {
  const queryClient =useQueryClient()
  const token = useSelector(selectUserToken);
  const { getCategoriesdata } = useCategories(token);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [hashtagText, setHashtagText] = useState("");
  const { data: getHashtag, isLoading: hashtagLoader } = useQuery({
    queryKey: ["hashtags"],
    queryFn: () => getData(token, "hashtags"),
  });

  const mutation = useMutation({
    mutationFn: addData,
    onSuccess: async () => {
      queryClient.invalidateQueries(["hashtags"]);
      notify("Hashtag Created");
      setIsModalOpen(false);
    },
    onError: () => {
      notify("Hashtag Creation Error");
    },
  })

  const createhashtagConroller  = ()=>{
    mutation.mutate({
      token,
      endpoint: "hashtags",
      data: {
        category:selectedOption,
        text: hashtagText,
      },
    });
  }

  const deletemutation = useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      queryClient.invalidateQueries(["hashtags"]);
      notify("Category deleted successfully");
     
      closeModal();
    },
    onError: () => {
      notify("Failed to add category");
    },
  });

  const deleteHandler = (id) => {
    const data = {
      token,
      endpoint: `hashtags/${id}`,
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

  const formattedOptions = getCategoriesdata?.map((category) => ({
    value: category._id,
    label: category.name,
  }));

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };
if(hashtagLoader) return <Loader/>
  return (
    <div>
      <div className="flex flex-row justify-between mt-10">
        <h2 className="text-2xl">All the Hashtag</h2>
        <div className="flex flex-row gap-3">
          <button
            onClick={openModal}
            className="bg-primary text-white rounded-md px-10 py-2"
          >
            Create Hashtag
          </button>
        </div>
      </div>

      {getHashtag?.data.map((item,index) => {
        return (
          <div key={index} className="bg-white mt-5 drop-shadow-md rounded-md h-[100px] flex flex-row gap-10 px-10 items-center ">
            <div className="w-[150px]">
              <h1 className="text-primary font-bold ">Name</h1>
              <h3>{item.text}</h3>
            </div>
            <div>
              <h1 className=" text-primary font-bold">Category</h1>
              <h3>{item.category}</h3>
            </div>
            <button onClick={()=>deleteHandler(item._id)}>
             Delete
            </button>
          </div>
        );
      })}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <SelectField
          label={"Select Category"}
          options={formattedOptions}
          value={selectedOption}
          onChange={handleOptionChange}
        />
        <Hr />
        <TextInput onChange={(e)=>setHashtagText(e.target.value)} label={"Hashtag"} />
        <Hr />
        <button onClick={createhashtagConroller} className="px-10 bg-primary py-2 rounded-md text-white ml-2">
          Create Hashtag
        </button>
      </Modal>
    </div>
  );
};

export default Hashtag;
