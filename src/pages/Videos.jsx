import React, { useState } from "react";
import Modal from "../components/Modal";
import { RxCross2 } from "react-icons/rx";
import TextInput from "../components/TextInput";
import BooleanInput from "../components/BoleanInput";
import Hr from "../components/Hr";
import SelectField from "../components/SelectField";
import { getDataWitoutAuth } from "../services/getResouces";
import { addData } from "../services/postResources";
import { deleteData } from "../services/deleteResources";
import { updateData } from "../services/updateDataResources";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import { selectUserToken } from "../features/authSlice";
import useCourses from "../hooks/useCourses";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { notify } from "../utils/notify";

const Videos = () => {
  const userToken = useSelector(selectUserToken);
  const queryClient = useQueryClient();
  const { coursesdata } = useCourses();
  const [isModalOpen, setIsModalOpen] = useState(false);
  //formdata
  const [isFree, setIsFree] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [duration, setDuration] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [editVideoId, setEditVideoId] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ["videos"],
    queryFn: () => getDataWitoutAuth("videos"),
  });

  const createVideoMutation = useMutation({
    mutationFn: addData,
    onSuccess: async () => {
      notify("Video Created Successfully");
      queryClient.invalidateQueries(["videos"]);
    },
    onError: () => {
      notify("Error creating Videos");
    },
  });

  const updateVideoMutation = useMutation({
    mutationFn: updateData,
    onSuccess: async () => {
      notify("Video Updated Successfully");
      queryClient.invalidateQueries(["videos"]);
    },
    onError: () => {
      notify("Error updating Video");
    },
  });

  const deleteVideoMutation = useMutation({
    mutationFn: deleteData,
    onSuccess: async () => {
      notify("Video Deleted Successfully");
      queryClient.invalidateQueries(["videos"]);
    },
    onError: () => {
      notify("Error Deleted Videos");
    },
  });

  const videosdata = data?.data;
  const options = coursesdata?.map((course) => ({
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
    resetForm();
  };

  const createOrUpdateVideoHandler = () => {
    const formdata = {
      token: userToken,
      endpoint: editMode ? `videos/${editVideoId}` : "videos",
      data: {
        courseId: selectedOption,
        title,
        videoUrl,
        duration,
        isFree,
        description,
        isPreview,
      },
    };

    if (title && description && selectedOption && videoUrl) {
      if (editMode) {
        updateVideoMutation.mutate(formdata);
      } else {
        createVideoMutation.mutate(formdata);
      }
      setIsModalOpen(false);
      resetForm();
    }
  };

  const deleteDataHandler = (id) => {
    const formdata = {
      token: userToken,
      endpoint: `videos/${id}`,
    };

    if (id) {
      deleteVideoMutation.mutate(formdata);
    }
  };

  const editDataHandler = (video) => {
    setTitle(video.title);
    setDescription(video.description);
    setVideoUrl(video.videoUrl);
    setIsFree(video.isFree);
    setIsPreview(video.isPreview);
    setSelectedOption(video.courseId);
    setDuration(video.duration);
    setEditMode(true);
    setEditVideoId(video._id);
    openModal();
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setVideoUrl("");
    setIsFree(false);
    setIsPreview(false);
    setSelectedOption("");
    setDuration(0);
    setEditMode(false);
    setEditVideoId(null);
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
              <div className="flex flex-row gap-3">
                <button onClick={() => editDataHandler(item)}>Edit</button>
                <button onClick={() => deleteDataHandler(item._id)}>
                  <RxCross2 />
                </button>
              </div>
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
        <TextInput
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          label={"Title"}
          type={"text"}
        />
        <hr className="h-2" />
        <TextInput
          onChange={(e) => setVideoUrl(e.target.value)}
          value={videoUrl}
          label={"Video Url"}
          type={"Text"}
        />
        <hr className="h-2" />
        <TextInput
          onChange={(e) => setDuration(e.target.value)}
          value={duration}
          label={"Duration"}
          type={"number"}
        />
        <hr className="h-2" />
        <TextInput
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          label={"Description"}
          type={"text"}
        />
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
        <button
          onClick={createOrUpdateVideoHandler}
          className="px-10 bg-primary py-2 rounded-md text-white"
        >
          {editMode ? "Update Video" : "Create Video"}
        </button>
      </Modal>
    </div>
  );
};

export default Videos;
