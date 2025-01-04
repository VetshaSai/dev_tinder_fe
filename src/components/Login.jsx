import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const Login = () =>{
    const [emailId, setEmailId] = useState("sai@gmail.com");
    const [password, setPassword] = useState("Saii@123");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error,setError] = useState("");

    const handelLogin=  async() =>{
        try {
          const res = await axios.post(BASE_URL+"/login", {
            emailId,
            password,
          },{
            withCredentials: true
          });
          const {Data} = res.data;
          dispatch(addUser(Data));
          navigate("/");
        } catch (err) {
          setError(err?.response?.data);
        }
    };

    return (
      <div className="flex justify-center">
        <div className="card bg-base-100 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title justify-center m-4">Login</h2>
            <label className="labelform-control w-full max-w-xs">
              <span className="lable-text">Email Id:</span>
              <input
                type="text"
                placeholder="Type here"
                value={emailId}
                className="labelinput labelinput-bordered w-full max-w-xs p-4"
                onChange={(e)=>setEmailId(e.target.value)}
              />
            </label>
            <label className="labelform-control w-full max-w-xs">
              <span className="label-text">Paasword:</span>
              <input
                type="text"
                placeholder="Type here"
                value={password}
                className="labelinput labelinput-bordered w-full max-w-xs p-4"
                onChange={(e)=>setPassword(e.target.value)}
              />
            </label>
            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-center m-4">
              <button className="btn btn-primary" onClick={handelLogin}>Login</button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Login;