import { FaRegCopy } from "react-icons/fa";
import { notify } from "../utils/notify";
const UserCard = ({ id, name, phone,usename,refer,refercount,userType }) => {
  const handleId = () => {
    navigator.clipboard
      .writeText(id)
      .then(() => notify("Copied " + id))
      .catch((err) => notify("Failed to copy Bkash number: ", err));
  };

  return (
    <div className="bg-white mt-5 drop-shadow-md rounded-md h-[100px] flex flex-row gap-10 px-10 items-center ">
      <div className="w-[150px]">
        <h1 className="text-primary font-bold ">Name</h1>
        <h3>{name}</h3>
      </div>
      <div>
        <h1 className=" text-primary font-bold">UserName</h1>
        <h3>{usename}</h3>
      </div>
      <div>
        <h1 className=" text-primary font-bold">User ID</h1>
        <div className="flex flex-row gap-3">
          <h3>{id}</h3>
          <button onClick={handleId}>
            <FaRegCopy />
          </button>
        </div>
      </div>
      <div>
        <h1 className=" text-primary font-bold">Phone</h1>
        <h3>{phone}</h3>
      </div>
      <div>
        <h1 className=" text-primary font-bold">Refer</h1>
        <h3>{refer}</h3>
      </div>
      <div>
        <h1 className=" text-primary font-bold">Refer count</h1>
        <h3>{refercount}</h3>
      </div>
      <div>
        <h1 className=" text-primary font-bold">User Type</h1>
        <h3>{userType}</h3>
      </div>
    </div>
  );
};

export default UserCard;
