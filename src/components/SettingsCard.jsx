import { CiLocationArrow1 } from "react-icons/ci";
import TextInput from "./TextInput";
import { formatter } from "../utils/formatter";

const SettingsCard = ({parcent,setParcent,getParcent,onClick}) => {
  
  return (
    <div className="flex flex-row drop-shadow-md  bg-white rounded-xl justify-between py-5 px-10 mt-5">
      <div className="flex flex-row justify-between gap-10">
        <div>
          <h1 className=" text-primary font-bold">Referral Reward Percentage </h1>
          <h3 className=" ">{getParcent}%</h3>
        </div>
        <div>
           <h1 className=" text-primary font-bold">Change Percentage </h1>
           <TextInput value={parcent} onChange={(e)=>setParcent(e.target.value) }/>
        </div>
       
      </div>
      <button
        onClick={onClick}
       className="px-10 bg-primary py-2 h-10 rounded-md text-white ml-2"
      >
       Update
      </button>
     
    </div>
  )
}

export default SettingsCard