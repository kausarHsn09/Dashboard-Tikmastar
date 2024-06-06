import { CiLocationArrow1 } from "react-icons/ci";
import { FaRegCopy } from "react-icons/fa";
import { notify } from "../utils/notify";
import { formatter } from "../utils/formatter";
const EnrollmentCard = ({ openModal, data,setEnrollementId }) => {
  // Function to copy Bkash number to clipboard
  const handleCopyBkashNumber = () => {
    navigator.clipboard
      .writeText(data.userBkashNumber)
      .then(() => notify("Copied " +data.userBkashNumber))
      .catch((err) => notify("Failed to copy Bkash number: ", err));
  };
 
  const handelar=()=>{
    setEnrollementId(data._id)
    openModal()
  }

  return (
    <div className="flex flex-row drop-shadow-md  bg-white rounded-xl justify-between py-5 px-10 mt-5">
      <div className="flex flex-row justify-between gap-10">
        <div>
          <h1 className=" text-primary font-bold">Status</h1>
          <h3 className=" ">{data.paymentStatus}</h3>
        </div>
        <div>
          <div className="flex flex-row items-center gap-5">
            <h1 className=" text-primary font-bold ">Bkash </h1>
            <button onClick={handleCopyBkashNumber}>
              {" "}
              <FaRegCopy />
            </button>
          </div>
          <h3>{data.userBkashNumber}</h3>
        </div>
        <div>
          <h1 className=" text-primary font-bold">Enrolled</h1>
          <h3>{formatter.format(new Date(data.enrolledAt))}</h3>
        </div>
      </div>

      <button
        className="w-[50px] h-[50px] rounded-[100%] justify-center items-center"
        onClick={handelar}
      >
        <CiLocationArrow1 size={35} />
      </button>
    </div>
  );
};

export default EnrollmentCard;
