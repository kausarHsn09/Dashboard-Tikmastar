import React, { useState } from "react";
import Modal from "../components/Modal";
import { RxCross2 } from "react-icons/rx";
import { FaRegCopy } from "react-icons/fa";
import TextInput from "../components/TextInput";
import BooleanInput from "../components/BoleanInput";
import Hr from "../components/Hr";
import { getData } from "../services/getResouces";
import { addData } from "../services/postResources";
import { deleteData } from "../services/deleteResources";
import { updateData } from "../services/updateDataResources";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import { selectUserToken } from "../features/authSlice";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { notify } from "../utils/notify";
import { useParams } from "react-router-dom";

const Video = () => {
  const userToken = useSelector(selectUserToken);
  const queryClient = useQueryClient();
  const { id } = useParams();

  // State variables
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [isFree, setIsFree] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [editVideoId, setEditVideoId] = useState(null);
  console.log(videoId);
  // Fetch videos data
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["videos"],
    queryFn: () => getData(userToken, `videos/course/${id}`),
  });
  // Fetch videos data
  const { data: courseNamedata, isLoading: courseNameLoader } = useQuery({
    queryKey: ["courseName"],
    queryFn: () => getData(userToken, `courses/${id}`),
  });

  // Other functions for CRUD operations
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
      setVideoId("");
      setIsModalOpen2(false);
    },
    onError: () => {
      notify("Error Deleted Videos");
    },
  });

  const videosdata = data?.data?.videos;
  const courseName = courseNamedata?.data?.title;

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

  const closeModal2 = () => {
    setIsModalOpen2(false);
  };

  const createOrUpdateVideoHandler = () => {
    const formdata = {
      token: userToken,
      endpoint: editMode ? `videos/${editVideoId}` : "videos",
      data: {
        courseId: id,
        title,
        videoUrl,
        duration,
        isFree,
        description,
        isPreview,
        position,
      },
    };

    if (title && description && id && videoUrl) {
      if (editMode) {
        updateVideoMutation.mutate(formdata);
      } else {
        createVideoMutation.mutate(formdata);
      }
      setIsModalOpen(false);
      resetForm();
    }
  };

  const deleteDataHandler = () => {
    const formdata = {
      token: userToken,
      endpoint: `videos/${videoId}`,
    };

    if (videoId) {
      deleteVideoMutation.mutate(formdata);
    }
  };

  const editDataHandler = (video) => {
    setTitle(video.title);
    setDescription(video.description);
    setVideoUrl(video.videoUrl);
    setIsFree(video.isFree);
    setIsPreview(video.isPreview);
    setDuration(video.duration);
    setPosition(video.position);
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
    setDuration(0);
    setPosition(0);
    setEditMode(false);
    setEditVideoId(null);
  };

  const handleId = (cid) => {
    navigator.clipboard
      .writeText(cid)
      .then(() => notify("Copied " + cid))
      .catch((err) => notify("Failed to copy ", err));
  };

  if (isLoading || courseNameLoader) return <Loader />;
  return (
    <div>
      <div className="flex flex-row justify-between mt-10">
        <h2 className="text-2xl">{courseName}</h2>
        <div className="flex flex-row gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary text-white rounded-md px-10 py-2"
          >
            Create Video
          </button>
          <button
            onClick={() => setIsModalOpen2(true)}
            className="bg-primary text-white rounded-md px-10 py-2"
          >
            Delete Video
          </button>
        </div>
      </div>

      {isError ? (
        <h2 className="text-2xl">{error.message}</h2>
      ) : (
        <div className="flex flex-col gap-3 mt-10">
          {videosdata.map((item, i) => (
            <div
              key={i}
              className="bg-secondary flex flex-row px-10 py-5 rounded-lg justify-between "
            >
              <h3>{item.title}</h3>
              <h4>{item.position}</h4>
              <div className="flex flex-row gap-3">
                <button onClick={() => editDataHandler(item)}>Edit</button>
                <button onClick={() => handleId(item._id)}>
                  <FaRegCopy />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <TextInput disabled value={id} label={"CouseID"} type={"text"} />

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
        <TextInput
          onChange={(e) => setPosition(e.target.value)}
          value={position}
          label={"Position"}
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
      <Modal isOpen={isModalOpen2} onClose={closeModal2}>
        <hr className="h-2" />
        <TextInput
          onChange={(e) => setVideoId(e.target.value)}
          value={videoId}
          label={"Video ID"}
          type={"text"}
        />
        <hr className="h-2" />
        <button
          onClick={deleteDataHandler}
          className="px-10 bg-primary py-2 rounded-md text-white"
        >
          Delete
        </button>
      </Modal>
    </div>
  );
};

export default Video;
