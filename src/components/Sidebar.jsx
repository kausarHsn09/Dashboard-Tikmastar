import { NavLink, useLocation } from "react-router-dom";
import { RiUser3Line } from "react-icons/ri";
import { CiBoxList, CiVideoOn } from "react-icons/ci";
import { PiChalkboardTeacherLight, PiVideoBold } from "react-icons/pi";
import { AiOutlineLogin } from "react-icons/ai";
import { CiMoneyBill ,CiSettings} from "react-icons/ci";
import { TbZoomMoney,TbCategory,TbScript } from "react-icons/tb";
import { HiHashtag } from "react-icons/hi";
import { FaRegClosedCaptioning } from "react-icons/fa6";
import { MdPostAdd } from "react-icons/md";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { MdOutlineContentPaste } from "react-icons/md";
import { BiObjectsHorizontalRight } from "react-icons/bi";
import { FaRegCompass } from "react-icons/fa";
import { BiRun } from "react-icons/bi";


import { useDispatch } from "react-redux";
import { setToken } from "../features/authSlice";
function Sidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { pathname } = location;
  const checkActive = (path) => pathname === path;
  const logutHandler = () => {
    localStorage.removeItem("tokenFreelancing");
    dispatch(setToken(null));
    // navigation.navigate("Login")
  };

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
              <RiUser3Line
                size={22}
                color={` ${checkActive("/users") ? "#7455F7" : "#262626"}`}
              />
              <p
                className={` ${
                  checkActive("/users") ? "text-primary" : "text-textdark"
                }`}
              >
                Users
              </p>
            </div>
          </NavLink>
          <NavLink to="/enrollments" className="py-2">
            <div className="flex flex-row items-center gap-2	">
              <CiBoxList
                size={22}
                color={` ${
                  checkActive("/enrollments") ? "#7455F7" : "#262626"
                }`}
              />
              <p
                className={` ${
                  checkActive("/enrollments") ? "text-primary" : "text-textdark"
                }`}
              >
                Enrollments
              </p>
            </div>
          </NavLink>
          <NavLink to="/challenge" className="py-2">
            <div className="flex flex-row items-center gap-2	">
              <BiRun
                size={22}
                color={` ${checkActive("/challenge") ? "#7455F7" : "#262626"}`}
              />
              <p
                className={` ${
                  checkActive("/challenge") ? "text-primary" : "text-textdark"
                }`}
              >
                Challenge
              </p>
            </div>
          </NavLink>
          <NavLink to="/courses" className="py-2">
            <div className="flex flex-row items-center gap-2	">
              <PiChalkboardTeacherLight
                size={22}
                color={` ${checkActive("/courses") ? "#7455F7" : "#262626"}`}
              />
              <p
                className={` ${
                  checkActive("/courses") ? "text-primary" : "text-textdark"
                }`}
              >
                Courses
              </p>
            </div>
          </NavLink>
          {/* <NavLink to="/videos" className="py-2">
            <div className="flex flex-row items-center gap-2	">
              <CiVideoOn size={22} color={` ${checkActive('/videos')?'#7455F7':'#262626'}`}/>
              <p className={` ${checkActive('/videos')?'text-primary':'text-textdark'}`}>Videos</p>
            </div>
          </NavLink> */}

          <NavLink to="/withdraw" className="py-2">
            <div className="flex flex-row items-center gap-2	">
              <CiMoneyBill
                size={22}
                color={` ${checkActive("/withdraw") ? "#7455F7" : "#262626"}`}
              />
              <p
                className={` ${
                  checkActive("/withdraw") ? "text-primary" : "text-textdark"
                }`}
              >
                Withdraw
              </p>
            </div>
          </NavLink>

          

          <NavLink to="/settings" className="py-2">
            <div className="flex flex-row items-center gap-2	">
              <CiSettings
                size={22}
                color={` ${checkActive("/settings") ? "#7455F7" : "#262626"}`}
              />
              <p
                className={` ${
                  checkActive("/settings") ? "text-primary" : "text-textdark"
                }`}
              >
                Settings
              </p>
            </div>
          </NavLink>

          <NavLink to="/category" className="py-2">
            <div className="flex flex-row items-center gap-2	">
              <TbCategory
                size={22}
                color={` ${checkActive("/category") ? "#7455F7" : "#262626"}`}
              />
              <p
                className={` ${
                  checkActive("/category") ? "text-primary" : "text-textdark"
                }`}
              >
                Category
              </p>
            </div>
          </NavLink>
          <NavLink to="/hashtag" className="py-2">
            <div className="flex flex-row items-center gap-2	">
              <HiHashtag
                size={22}
                color={` ${checkActive("/hashtag") ? "#7455F7" : "#262626"}`}
              />
              <p
                className={` ${
                  checkActive("/hashtag") ? "text-primary" : "text-textdark"
                }`}
              >
                Hashtag
              </p>
            </div>
          </NavLink>
          <NavLink to="/caption" className="py-2">
            <div className="flex flex-row items-center gap-2	">
              <FaRegClosedCaptioning
                size={22}
                color={` ${checkActive("/caption") ? "#7455F7" : "#262626"}`}
              />
              <p
                className={` ${
                  checkActive("/caption") ? "text-primary" : "text-textdark"
                }`}
              >
                Caption
              </p>
            </div>
          </NavLink>
     
          <NavLink to="/script" className="py-2">
            <div className="flex flex-row items-center gap-2	">
              <TbScript
                size={22}
                color={` ${checkActive("/script") ? "#7455F7" : "#262626"}`}
              />

              
              <p
                className={` ${
                  checkActive("/script") ? "text-primary" : "text-textdark"
                }`}
              >
                Script
              </p>
            </div>
          </NavLink>
          <NavLink to="/nickname" className="py-2">
            <div className="flex flex-row items-center gap-2	">
              <MdOutlineDriveFileRenameOutline
                size={22}
                color={` ${checkActive("/nickname") ? "#7455F7" : "#262626"}`}
              />
              <p
                className={` ${
                  checkActive("/nickname") ? "text-primary" : "text-textdark"
                }`}
              >
                Nickname
              </p>
            </div>
          </NavLink>
          <NavLink to="/content" className="py-2">
            <div className="flex flex-row items-center gap-2	">
              <MdOutlineContentPaste
                size={22}
                color={` ${checkActive("/content") ? "#7455F7" : "#262626"}`}
              />
              <p
                className={` ${
                  checkActive("/content") ? "text-primary" : "text-textdark"
                }`}
              >
                Content
              </p>
            </div>
          </NavLink>
          <NavLink to="/bio" className="py-2">
            <div className="flex flex-row items-center gap-2	">
              <BiObjectsHorizontalRight
                size={22}
                color={` ${checkActive("/bio") ? "#7455F7" : "#262626"}`}
              />
              <p
                className={` ${
                  checkActive("/bio") ? "text-primary" : "text-textdark"
                }`}
              >
                Bio
              </p>
            </div>
          </NavLink>
          
        </nav>
      </div>

      <div className="mb-5">
        <button
          onClick={logutHandler}
          className="flex flex-row gap-2 items-center bg-white px-10 py-2 rounded-md	"
        >
          Log out <AiOutlineLogin size={22} />
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
