import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getData } from "../services/getResouces";
import { selectUserToken } from "../features/authSlice";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import { notify } from "../utils/notify";
import { updateData } from "../services/updateDataResources";
import SettingsCard from "../components/SettingsCard";

const Settings = () => {
  const [parcent, setParcent] = useState("");
  const queryClient = useQueryClient();
  const token = useSelector(selectUserToken);
  const { data, isLoading } = useQuery({
    queryKey: ["getReferralRewardPercentage"],
    queryFn: () => getData(token, "settings/referralRewardPercentage"),
  });

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
    updateMutation.mutate({
      token: token,
      endpoint: "settings/referralRewardPercentage",
      data: {
        value: parcent,
      },
    });
  };

  const getParcentdata = data?.data;
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
    </div>
  );
};

export default Settings;
