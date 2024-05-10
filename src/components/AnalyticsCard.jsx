
import { PiArrowCircleRightLight } from "react-icons/pi";

const AnalyticsCard = ({ title = "Title" }) => {
  return (
    <div className="w-[400px] px-5 py-3 justify-between flex flex-row drop-shadow-md  bg-white rounded-xl">
      <div>
        <h1 className="text-xl">{title}</h1>
        <h3 className="text-[45px] text-primary font-bold">12</h3>
      </div>

      <button>
        <PiArrowCircleRightLight size={40} color="#7455F7" />
      </button>
    </div>
  );
};

export default AnalyticsCard;
