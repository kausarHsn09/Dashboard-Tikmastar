import { useState,useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getData, getDataWitoutAuth } from "../services/getResouces";
import { selectUserToken } from "../features/authSlice";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import { notify } from "../utils/notify";
import { updateData } from "../services/updateDataResources";
import SettingsCard from "../components/SettingsCard";
import TextInput from "../components/TextInput";
import Hr from "../components/Hr";
const Settings = () => {
  const [parcent, setParcent] = useState("");
  const [utilkey, setUtilKey] = useState("");
  const [utilIndex, setUtilIndex] = useState("");
  const [utilsID,setUtilsID] =useState('')
  const queryClient = useQueryClient();
  const token = useSelector(selectUserToken);
  const { data, isLoading,isError:referralError } = useQuery({
    queryKey: ["getReferralRewardPercentage"],
    queryFn: () => getData(token, "settings/referralRewardPercentage")
  });
  const { data: utilsdata, isLoading: utilLoader ,isError } = useQuery({
    queryKey: ["utils"],
    queryFn: () => getData(token,"utils?type=contact"),
  });

  useEffect(() => {
   
      setUtilsID(utilsdata?.data[0]?._id);
    
  }, [utilsdata?.data]);

  const utilsMutation = useMutation({
    mutationFn: updateData,
    onSuccess: () => {
      queryClient.invalidateQueries(["utils"]);
      notify("utils updated successfully");
      setParcent("");
    },
    onError: () => {
      notify("Failed to update");
    },
  });

  const handleUpdateutils = () => {
    if (!utilkey && !utilIndex) {
      notify("Please enter a Index");
      return;
    }
    utilsMutation.mutate({
      token: token,
      endpoint: `utils/${utilsID}`,
      data: {
        [utilkey]: utilIndex,
      },
    });

  };


  const updateMutation = useMutation({
    mutationFn: updateData,
    onSuccess: () => {
      queryClient.invalidateQueries(["getReferralRewardPercentage"]);
      notify("Referral reward percentage updated successfully");
      setParcent("");
    },
    onError: () => {
      notify("Failed to update referral reward percentage");
    },
  });

  const handleSubmit = () => {
    if (!parcent) {
      notify("Please enter a percentage");
      return;
    }
    updateMutation.mutate({
      token: token,
      endpoint: "settings/referralRewardPercentage",
      data: {
        value: parcent,
      },
    });
  };

  const getParcentdata = data?.data;
  const getutilsdata = utilsdata?.data;
  if (referralError || isError) return <p>Error fetching data: {referralError.message}</p>;
  if (isLoading) return <Loader />;
  return (
    <div>
      <div className="flex flex-row justify-between mt-10">
        <h2 className="text-2xl">All the Settings</h2>
      </div>

      <SettingsCard
        getParcent={getParcentdata.value}
        parcent={parcent}
        setParcent={setParcent}
        onClick={handleSubmit}
      />
      {/* Utils */}
      <div className="flex flex-row drop-shadow-md  bg-white rounded-xl justify-between py-5 px-10 mt-5">
        <div>
          {getutilsdata?.map((item, i) => (
            <div  key={i}>
            <div  className="flex flex-row gap-3">
              <h1 className=" text-primary font-bold">merchantBkash </h1>
              <h3>{item.merchantBkash}</h3>
              <h1 className=" text-primary font-bold">contactNumber </h1>
              <h3>{item.contactNumber}</h3>
              <h1 className=" text-primary font-bold">contactText </h1>
              <h3>{item.contactText}</h3>
             
             
            </div>
         <div className="flex flex-row gap-3">
           <h1 className=" text-primary font-bold">merchantLabel </h1>
              <h3>{item.merchantLabel}</h3>
              <h1 className=" text-primary font-bold">coureseInstructionUrl </h1>
              <h3>{item.coureseInstructionUrl}</h3>
              <h1 className=" text-primary font-bold">telegramLink </h1>
              <h3>{item.telegramLink}</h3>
         </div>

            </div>
          ))}
         <Hr gap={10}/>
         <div className="flex flex-row justify-between items-center">
           <div className="flex flex-row gap-5">
            <TextInput value={utilkey} label={'Key'} onChange={(e)=>setUtilKey(e.target.value)}/>
              
            <TextInput value={utilIndex} label={'Value'} onChange={(e)=>setUtilIndex(e.target.value)}/>
          </div>

          <button
        onClick={handleUpdateutils}
       className="px-10 bg-primary py-2 h-10 rounded-md text-white ml-2"
      >
       Update utils
      </button>
         </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
