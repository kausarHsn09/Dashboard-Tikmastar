import { getData } from "../services/getResouces";
import {  useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { selectUserToken } from "../features/authSlice"

const useCourses = () => {
   const token = useSelector(selectUserToken);
   const { data, isLoading:courseLoader } = useQuery({
    queryKey: ["courses"],
    queryFn: () => getData(token,"courses"),
  })
  
  const coursesdata = data?.data;
  return { coursesdata, courseLoader };
}

export default useCourses