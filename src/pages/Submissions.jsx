import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getData } from "../services/getResouces";
import { selectUserToken } from "../features/authSlice";
import Loader from "../components/Loader";
import { CiLocationArrow1 } from "react-icons/ci";
import { FaRegCopy } from "react-icons/fa";
import { notify } from "../utils/notify";
import { formatter } from "../utils/formatter";



import { useSelector } from "react-redux";

const Submissions = () => {
  const { id } = useParams();

  const token = useSelector(selectUserToken);
  const [page, setPage] = useState(1);

  const { data: getSubmission, isLoading: submissionLoader } = useQuery({
    queryKey: ["submissions", page],
    queryFn: () => getData(token, `challenges/${id}/submissions`),
  });

  // Function to copy Bkash number to clipboard
  const handleCopyBkashNumber = (link) => {
    navigator.clipboard
      .writeText(link)
      .then(() => notify("Copied " +link))
      .catch((err) => notify("Failed to copy Bkash number: ", err));
  };

  if (submissionLoader) return <Loader />;
  const data = getSubmission?.data?.docs;
  const totalPages = getSubmission?.data?.totalPages; 
  return (
    <div>
      <div className="flex flex-row justify-between mt-10">
        <h2 className="text-2xl">All the submission</h2>
      </div>

      {data.map((item, index) => (
        <div
          key={index}
          className="bg-white mt-5 drop-shadow-md rounded-md h-[100px] flex flex-row gap-10 px-10 items-center "
        >
          <div >
            <h1 className="text-primary font-bold ">Name</h1>
            <h3>{item.tikTokUsername}</h3>
          </div>
          <div>
            <h1 className="text-primary font-bold ">Link</h1>
            <button className="flex flex-row items-center gap-2" onClick={()=>handleCopyBkashNumber(item.videoLink)}>Copy <FaRegCopy/></button>
          </div>
          <div >
            <h1 className="text-primary font-bold ">phone Number</h1>
            <h3>{item.phoneNumber}</h3>
          </div>
          <div >
            <h1 className="text-primary font-bold ">Submitted At</h1>
            <h3>{formatter.format(new Date(item.submittedAt))}</h3>
          </div>
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
          onClick={() =>
            setPage((prev) => (prev < totalPages ? prev + 1 : prev))
          }
          disabled={page === totalPages}
          className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-700 disabled:bg-gray-300 rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Submissions;
