import { NavLink,useLocation } from 'react-router-dom';
import { RiUser3Line } from "react-icons/ri";
import { CiBoxList, CiVideoOn } from "react-icons/ci";
import { PiChalkboardTeacherLight, PiVideoBold } from "react-icons/pi";
import { AiOutlineLogin } from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { setToken } from "../features/authSlice";
function Sidebar() {

 const location = useLocation();
 const dispatch = useDispatch();
  const { pathname } = location;
  const checkActive = (path) => pathname === path;
  const logutHandler = ()=>{
    localStorage.removeItem("tokenFreelancing");
    dispatch(setToken(null))
    // navigation.navigate("Login")
  }

  return (
    <aside className="sidebar">
      <div>
        <h2>
          <NavLink className="text-2xl text-primary font-bold	" to="/">
            Dashbord
          </NavLink>
        </h2>
        <nav className="mt-10">
          <NavLink to="/users" className="py-2">
            <div className="flex flex-row items-center gap-2	">
              <RiUser3Line size={22} color={` ${checkActive('/users')?'#7455F7':'#262626'}`}/>
              <p className={` ${checkActive('/users')?'text-primary':'text-textdark'}`}>Users</p>
            </div>
          </NavLink>
          <NavLink to="/enrollments" className="py-2">
            <div className="flex flex-row items-center gap-2	">
              <CiBoxList size={22} color={` ${checkActive('/enrollments')?'#7455F7':'#262626'}`}/>
              <p className={` ${checkActive('/enrollments')?'text-primary':'text-textdark'}`}>Enrollments</p>
            </div>
          </NavLink>
          <NavLink to="/courses" className="py-2">
            <div className="flex flex-row items-center gap-2	">
              <PiChalkboardTeacherLight size={22} color={` ${checkActive('/courses')?'#7455F7':'#262626'}`}/>
              <p className={` ${checkActive('/courses')?'text-primary':'text-textdark'}`}>Courses</p>
            </div>
          </NavLink>
          {/* <NavLink to="/videos" className="py-2">
            <div className="flex flex-row items-center gap-2	">
              <CiVideoOn size={22} color={` ${checkActive('/videos')?'#7455F7':'#262626'}`}/>
              <p className={` ${checkActive('/videos')?'text-primary':'text-textdark'}`}>Videos</p>
            </div>
          </NavLink> */}
          <NavLink to="/tutorials" className="py-2">
            <div className="flex flex-row items-center gap-2	">
              <PiVideoBold size={22} color={` ${checkActive('/tutorials')?'#7455F7':'#262626'}`}/>
              <p className={` ${checkActive('/tutorials')?'text-primary':'text-textdark'}`}>Tutorials</p>
            </div>
          </NavLink>
        </nav>
      </div>

      <div className="mb-5">
        <button onClick={logutHandler} className="flex flex-row gap-2 items-center bg-white px-10 py-2 rounded-md	">
          Log out <AiOutlineLogin size={22} />
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
