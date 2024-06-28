import { getData } from "../services/getResouces";
import {  useQuery } from "@tanstack/react-query";

const useCategories = (token) => {
    const {data:getCategories,isLoading:categoriesloader} = useQuery({
    queryKey: ["categories"],
    queryFn: () => getData(token, "categories"),
  })
  
  const getCategoriesdata = getCategories?.data;
  return { getCategoriesdata, categoriesloader };
}

export default useCategories