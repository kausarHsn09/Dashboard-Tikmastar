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

  function formatNumber(num) {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'b';
    }
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'm';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    }
    return num.toString();
}

  const analytics = getAnalytics?.data
  console.log(analytics)
   if(loader) return <Loader />
  return (
    <div>
      <h2 className='text-2xl'>Analythics</h2>
      <div className='w-full flex justify-start items-center '>
        <div className='mt-10 grid grid-cols-2 gap-5 justify-center items-center'>
        <div className='col-span-1'>
          <AnalyticsCard title='Total Users' number={formatNumber(analytics.totalUsers)}/>
         
        </div>
        <div className='col-span-1'>
          <AnalyticsCard title='Enrolled' number={formatNumber(analytics.totalPaidEnrollments)}/>
        </div>
        <div className='col-span-1'>
          <AnalyticsCard title='Total Earning' number={"৳"+formatNumber(analytics.totalEarnings)}/>
        </div>
        <div className='col-span-1'>
          <AnalyticsCard title='Total Referral Money' number={formatNumber(analytics.totalReferralMoney)}/>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Home