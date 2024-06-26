import { CiLocationArrow1 } from "react-icons/ci";
import { FaRegCopy } from "react-icons/fa";

const HistoryCard = () => {
  return (
    <div className="flex flex-row drop-shadow-md  bg-white rounded-xl justify-between py-5 px-10 mt-5">
      <div className="flex flex-row justify-between gap-10">
        <div>
          <h1 className=" text-primary font-bold">Status</h1>
          <h3 className=" ">Noting</h3>
        </div>
        <div>
          <div className="flex flex-row items-center gap-5">
            <h1 className=" text-primary font-bold ">Bkash </h1>
            <button >
              {" "}
              <FaRegCopy />
            </button>
          </div>
          <h3>Noting</h3>
        </div>
        <div>
          <h1 className=" text-primary font-bold">Enrolled</h1>
          <h3>Noting</h3>
        </div>
      </div>

      
    </div>
  )
}

export default HistoryCard