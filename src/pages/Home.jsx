import AnalyticsCard from '../components/AnalyticsCard';

const Home = () => {
  return (
    <div>
      <h2 className='text-2xl'>Analythics</h2>
      <div className='w-full flex justify-start items-center '>
        <div className='mt-10 grid grid-cols-2 gap-5 justify-center items-center'>
        <div className='col-span-1'>
          <AnalyticsCard title='Courses' />
        </div>
        <div className='col-span-1'>
          <AnalyticsCard title='Enroll' />
        </div>
        <div className='col-span-1'>
          <AnalyticsCard title='Users' />
        </div>
        <div className='col-span-1'>
          <AnalyticsCard title='Payment' />
        </div>
      </div>
      </div>
    </div>
  )
}

export default Home