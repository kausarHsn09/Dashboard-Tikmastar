import AnalyticsCard from '../components/AnalyticsCard';
import {useQuery} from '@tanstack/react-query'
import { getData } from "../services/getResouces";
import { useSelector } from "react-redux";
import { selectUserToken } from "../features/authSlice";
import Loader from '../components/Loader';

const Home = () => {

  const token = useSelector(selectUserToken)

  const { data: getAnalytics, isLoading: loader } = useQuery({
    queryKey: ["analytics"],
    queryFn: () => getData(token, "dashboard/stats"),
  });
  const analytics = getAnalytics?.data
   if(loader) return <Loader />
  return (
    <div>
      <h2 className='text-2xl'>Analythics</h2>
      <div className='w-full flex justify-start items-center '>
        <div className='mt-10 grid grid-cols-2 gap-5 justify-center items-center'>
        <div className='col-span-1'>
          <AnalyticsCard title='Total Users' number={analytics.totalUsers}/>
        </div>
        <div className='col-span-1'>
          <AnalyticsCard title='Enrolled' number={analytics.totalPaidEnrollments}/>
        </div>
        <div className='col-span-1'>
          <AnalyticsCard title='Total Earning' number={analytics.totalEarnings}/>
        </div>
        <div className='col-span-1'>
          <AnalyticsCard title='Total Referral Money' number={analytics.totalReferralMoney}/>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Home