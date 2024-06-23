import  { useState } from "react";
import Modal from "../components/Modal";
import TextInput from "../components/TextInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addData } from "../services/postResources";
import { deleteData } from "../services/deleteResources";
import { updateData } from "../services/updateDataResources";
import { useSelector } from "react-redux";
import { selectUserToken } from "../features/authSlice";
import Loader from "../components/Loader";
import { notify } from "../utils/notify";
import useCourses from "../hooks/useCourses";

import { Link } from "react-router-dom";
import { FaRegCopy } from "react-icons/fa";
const Courses = () => {
  const queryClient = useQueryClient();
  const userToken = useSelector(selectUserToken);
  const { courseLoader, coursesdata } = useCourses();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [courseId2, setCourseId2] = useState('');
  //formdata
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [enrollment, setEnrollment] = useState(0);
  const [stars, setStars] = useState(0);
  const [coverImg, setCoverImg] = useState("");
  const [courseId, setCourseId] = useState("");
  const [editMode, setEditMode] = useState(false);

  const createCourseMutation = useMutation({
    mutationFn: addData,
    onSuccess: async () => {
      notify("Course Created Successfully");
      queryClient.invalidateQueries(["courses"]);
    },
    onError: () => {
      notify("Error creating Course");
    },
  });

  const deleteCourseMutation = useMutation({
    mutationFn: deleteData,
    onSuccess: async () => {
      notify("Course Deleted Successfully");
      queryClient.invalidateQueries(["courses"]);
      setCourseId2('')
      setIsModalOpen2(false)
    },
    onError: () => {
      notify("Error Deleted Course");
    },
  });

  // Update Course Mutation
  const updateCourseMutation = useMutation({
    mutationFn: updateData,
    onSuccess: async () => {
      notify("Course Updated Successfully");
      queryClient.invalidateQueries(["courses"]);
    },
    onError: () => {
      notify("Error updating Course");
    },
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };
  const openModal2 = () => {
    setIsModalOpen2(true);
  };

  const closeModal2 = () => {
    setIsModalOpen2(false);
  };
  const handleId = (id) => {
    navigator.clipboard
      .writeText(id)
      .then(() => notify("Copied " + id))
      .catch((err) => notify("Failed to copy Bkash number: ", err));
  };

  const createCourseHandelar = () => {
    const formdata = {
      token: userToken,
      endpoint: "courses",
      data: {
        title: title,
        description: description,
        price: price,
        enrollmentCount: enrollment,
        stars: stars,
        coverImage: coverImg,
      },
    };

    if (title && description && price && stars && coverImg) {
      createCourseMutation.mutate(formdata);
      setIsModalOpen(false);
      resetForm();
    }
  };

  const deleteDataHandelar = () => {
    const formdata = {
      token: userToken,
      endpoint: `courses/${courseId2}`,
    };
    if (courseId2) {
      deleteCourseMutation.mutate(formdata);
    }
  };

  const updateCourseHandler = () => {
    const formdata = {
      token: userToken,
      endpoint: `courses/${courseId}`,
      data: {
        title,
        description,
        price,
        enrollmentCount: enrollment,
        stars,
        coverImage: coverImg,
      },
    };

    if (courseId) {
      updateCourseMutation.mutate(formdata);
      setIsModalOpen(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPrice(0);
    setEnrollment(0);
    setStars(0);
    setCoverImg("");
    setEditMode(false)
  };

  if (courseLoader) return <Loader />;

  return (
    <div>
      <div>
        <div className="flex flex-row justify-between mt-10">
          <h2 className="text-2xl">All the Courses</h2>
          <div className="flex flex-row gap-3">
            <button
            onClick={openModal}
            className="bg-primary text-white rounded-md px-10 py-2"
          >
            Create Course
          </button>
          <button
            onClick={openModal2}
            className="bg-primary text-white rounded-md px-10 py-2"
          >
            Delete
          </button>
          </div>
          
        </div>
        {coursesdata.map((item, index) => (
          <div
            key={index}
            className="bg-secondary flex flex-row px-10 py-5 rounded-lg justify-between  mt-4"
          >
            <h3>{item.title}</h3>
            <h4>{item.price}</h4>
            <button onClick={() => handleId(item._id)}>
              <FaRegCopy />
            </button>
             
            <Link to={`/course/video/${item._id}`}>
             Video
            </Link>

            <button
              onClick={() => {
                setTitle(item.title);
                setDescription(item.description);
                setPrice(item.price);
                setEnrollment(item.enrollmentCount);
                setStars(item.stars);
                setCoverImg(item.coverImage);
                setCourseId(item._id);
                setEditMode(true)
                openModal();
              }}
            >
              Edit Course
            </button>
          </div>
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <TextInput
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          label={"Name of Course"}
          type={"text"}
        />
        <hr className="h-2" />
        <TextInput
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          label={"Descriptions"}
          type={"text"}
        />
        <hr className="h-2" />
        <TextInput
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          label={"Price"}
          type={"number"}
        />
        <hr className="h-2" />
        <TextInput
          onChange={(e) => setEnrollment(e.target.value)}
          value={enrollment}
          label={"Enrollment Count"}
          type={"number"}
        />
        <hr className="h-2" />
        <TextInput
          onChange={(e) => setStars(e.target.value)}
          value={stars}
          label={"Stars"}
          type={"number"}
        />
        <hr className="h-2" />
        <TextInput
          onChange={(e) => setCoverImg(e.target.value)}
          value={coverImg}
          label={"Cover Image"}
          type={"text"}
        />
        <hr className="h-5" />
        <button
          onClick={editMode ? updateCourseHandler : createCourseHandelar}
          className="px-10 bg-primary py-2 rounded-md text-white"
        >
          {editMode ? "Update Course" : "Create Course"}
        </button>
      </Modal>
       <Modal isOpen={isModalOpen2} onClose={closeModal2}>
        <TextInput
          onChange={(e) => setCourseId2(e.target.value)}
          value={courseId2}
          label={"Course Id"}
          type={"text"}
        />
        <hr className="h-2" />
        <button
          onClick={() => deleteDataHandelar()}
          className="px-10 bg-primary py-2 rounded-md text-white"
        >
          Delete
        </button>
       </Modal>
    </div>
  );
};

export default Courses;
