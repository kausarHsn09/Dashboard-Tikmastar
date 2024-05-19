import { getDataWitoutAuth } from "../services/getResouces";
import {  useQuery } from "@tanstack/react-query";

const useCourses = () => {
   const { data, isLoading:courseLoader } = useQuery({
    queryKey: ["courses"],
    queryFn: () => getDataWitoutAuth("courses"),
  })
  
  const coursesdata = data?.data;
  return { coursesdata, courseLoader };
}

export default useCourses