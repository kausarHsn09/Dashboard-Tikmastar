import { CiLocationArrow1 } from "react-icons/ci";
import { FaRegCopy } from "react-icons/fa";
import { notify } from "../utils/notify";
import { formatter } from "../utils/formatter";

const TransctionsCard = ({openModal}) => {
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

      <button
        className="w-[50px] h-[50px] rounded-[100%] justify-center items-center"
        onClick={openModal}
      >
        <CiLocationArrow1 size={35} />
      </button>
    </div>
  )
}

export default TransctionsCard