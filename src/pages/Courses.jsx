import React, { useState } from "react";
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
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";

const Courses = () => {
  const queryClient = useQueryClient();
  const userToken = useSelector(selectUserToken);
  const { courseLoader, coursesdata } = useCourses();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const deleteDataHandelar = (id) => {
    const formdata = {
      token: userToken,
      endpoint: `courses/${id}`,
    };
    if (id) {
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
          <button
            onClick={openModal}
            className="bg-primary text-white rounded-md px-10 py-2"
          >
            Create Course
          </button>
        </div>
        {coursesdata.map((item, index) => (
          <div
            key={index}
            className="bg-secondary flex flex-row px-10 py-5 rounded-lg justify-between  mt-4"
          >
            <h3>{item.title}</h3>
            <h4>{item.price}</h4>
            <button onClick={() => deleteDataHandelar(item._id)}>
              <RxCross2 />
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
    </div>
  );
};

export default Courses;
