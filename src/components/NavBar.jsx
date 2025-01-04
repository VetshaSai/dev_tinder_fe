import { useDispatch, useSelector } from "react-redux";
import Login from "./Login";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { useState } from "react";

const Navigation = () => {
  const user = useSelector((store)=> store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  //console.log("nav",user);
  const handelLogout = async () =>{
    try{
      const res = await axios.post(BASE_URL+"/logout",{},{
        withCredentials: true
      });
      dispatch(removeUser());
      return navigate("/login");

    } catch(err){
      console.log(err);
    }
  };
  
  return (
    <div>
      <div className="navbar bg-base-200">
        <div className="flex-1">
          <Link to ="/" className="btn btn-ghost text-xl">DevTinder</Link>
        </div>
        {user && <div className="flex-none gap-2">
          <p>{`welcome ${user.firstName}`}</p>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar mx-5"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user.photoUrl}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={handelLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>}
      </div>
    </div>
  );
};

export default Navigation;
