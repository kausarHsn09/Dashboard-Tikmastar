import { CiLocationArrow1 } from "react-icons/ci";
import { formatter } from "../utils/formatter";
const EnrollmentCard = ({openModal,data}) => {
  return (
     <div className="flex flex-row drop-shadow-md  bg-white rounded-xl justify-between py-5 px-10 mt-5">
        <div className="flex flex-row justify-between gap-10">
          <div>
            <h1 className="text-xl text-primary font-bold">
              UI /UX design Course
            </h1>
            <h3 className=" ">৳699</h3>
          </div>

          <div>
            <h1 className=" text-primary font-bold">Name</h1>
            <h3 className=" ">Kausar</h3>
          </div>
          <div>
            <h1 className=" text-primary font-bold">Status</h1>
            <h3 className=" ">{data.paymentStatus}</h3>
          </div>
          <div>
            <h1 className=" text-primary font-bold">Bkash</h1>
            <h3 className=" ">{data.userBkashNumber}</h3>
          </div>
          <div>
            <h1 className=" text-primary font-bold">Enrolled</h1>
            <h3 className=" ">{formatter.format(new Date(data.enrolledAt))}</h3>
          </div>
        </div>

        <button
          className="w-[50px] h-[50px] rounded-[100%] border-[1px] border-primary justify-center items-center"
          onClick={openModal}
        >
          <CiLocationArrow1 size={35} />
        </button>

     
      </div>
  )
}

export default EnrollmentCard