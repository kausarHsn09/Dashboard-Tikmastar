import { CiLocationArrow1 } from "react-icons/ci";

import { formatter } from "../utils/formatter";

const TransctionsCard = ({ openModal,User="user",Ammount='ammount',Type='debit',Dates,setid,id,notes,number }) => {
  
  
  const handelar=()=>{
    setid(id)
    openModal()
  }


  return (
    <div className="flex flex-row drop-shadow-md  bg-white rounded-xl justify-between py-5 px-10 mt-5">
      <div className="flex flex-row justify-between gap-10">
        <div>
          <h1 className=" text-primary font-bold">User </h1>
          <h3 className=" ">{User}</h3>
        </div>
        <div>
          <h1 className=" text-primary font-bold ">Ammount </h1>
          <h3>{Ammount}</h3>
        </div>
        <div>
          <h1 className=" text-primary font-bold">Type</h1>
          <h3>{Type}</h3>
        </div>
        <div>
          <h1 className=" text-primary font-bold">Date</h1>
          <h3>{formatter.format(new Date(Dates))}</h3>
        </div>
        <div>
          <h1 className=" text-primary font-bold">Number</h1>
          <h3>{number}</h3>
        </div>
        {notes && (
          <div>
          <h1 className=" text-primary font-bold">NOtes</h1>
          <h3>{notes}</h3>
        </div>
        )}
        
    
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

export default TransctionsCard;
