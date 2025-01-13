import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const Login = () =>{
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isLoginForm, setIsLoginForm]=useState(true);
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

    const handelSignUp = async()=>{
      try{
        const res = await axios.post(BASE_URL+"/signUp",{firstName,lastName,emailId,password},{withCredentials:true});
        console.log("res",res);
        dispatch(addUser(res.data.data));
        navigate("/profile");
        
    } catch(err){
        console.log(err);
    }

    }

    return (
      <div className="flex justify-center">
        <div className="card bg-base-100 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title justify-center m-4">{isLoginForm ? "Login" : "SignUp"}</h2>
            {!isLoginForm && <> <label className="labelform-control w-full max-w-xs">
              <span className="lable-text">First Name:</span>
              <input
                type="text"
                placeholder="Type here"
                value={firstName}
                className="labelinput labelinput-bordered w-full max-w-xs p-4"
                onChange={(e)=>setFirstName(e.target.value)}
              />
            </label>
            <label className="labelform-control w-full max-w-xs">
              <span className="lable-text">Last Name:</span>
              <input
                type="text"
                placeholder="Type here"
                value={lastName}
                className="labelinput labelinput-bordered w-full max-w-xs p-4"
                onChange={(e)=>setLastName(e.target.value)}
              />
            </label> </>}
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
                type="password"
                placeholder="Type here"
                value={password}
                className="labelinput labelinput-bordered w-full max-w-xs p-4"
                onChange={(e)=>setPassword(e.target.value)}
              />
            </label>
            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-center m-4">
              <button className="btn btn-primary" onClick={isLoginForm ? handelLogin : handelSignUp}>{isLoginForm ? "Login" : "Signup"}</button>
            </div>
            <p className="m-auto cursor-pointer" onClick={()=>setIsLoginForm((value)=>!value)}>{isLoginForm ? "New user? create an account" : "Existing user? please login" } </p>
          </div>
        </div>
      </div>
    );
}

export default Login;