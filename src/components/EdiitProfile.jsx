import { useState } from "react";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import  {addUser} from "../utils/userSlice";


const EditProfile = ({user}) =>{
    //console.log("user",user);  
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [age, setAge] = useState(user.age);
    const [aboutUs, setAboutUs] = useState(user.aboutUs);
    const [gender,setGender] = useState(user.gender);
    const [error,setError] = useState("");
    const dispatch = useDispatch();
    const [showToast,setShowToast] = useState(false);

    const saveProfile=  async() =>{
        setError("");
        try {
          const res = await axios.patch(BASE_URL+"/profile/edit",{
            firstName,
            lastName,
            photoUrl,
            aboutUs,
            age,
            gender,
          },{
            withCredentials: true
          });
          dispatch(addUser(res?.data?.data));
          setShowToast(true);
          setTimeout(() => {
            setShowToast(false)
          }, 3000);
        } catch (err) {
          setError(err.message);
        }
    };

    return (
    <>
      <div className="flex justify-evenly mx-10 my-10 ">
        <div className="card bg-base-300 w-96 h-fit shadow-xl">
          <div className="card-body">
            <h2 className="card-title justify-center m-4">Login</h2>
            <label className="labelform-control w-full max-w-xs">
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
              <span className="label-text">Last Name:</span>
              <input
                type="text"
                placeholder="Type here"
                value={lastName}
                className="labelinput labelinput-bordered w-full max-w-xs p-4"
                onChange={(e)=>setLastName(e.target.value)}
              />
            </label>
            <label className="labelform-control w-full max-w-xs">
              <span className="lable-text">photoUrl:</span>
              <input
                type="text"
                placeholder="Type here"
                value={photoUrl}
                className="labelinput labelinput-bordered w-full max-w-xs p-4"
                onChange={(e)=>setPhotoUrl(e.target.value)}
              />
            </label>
            <label className="labelform-control w-full max-w-xs">
              <span className="lable-text">age:</span>
              <input
                type="text"
                placeholder="Type here"
                value={age}
                className="labelinput labelinput-bordered w-full max-w-xs p-4"
                onChange={(e)=>setAge(e.target.value)}
              />
            </label>
            <label className="labelform-control w-full max-w-xs">
              <span className="lable-text">gender:</span>
              <input
                type="text"
                placeholder="Type here"
                value={gender}
                className="labelinput labelinput-bordered w-full max-w-xs p-4"
                onChange={(e)=>setGender(e.target.value)}
              />
            </label>
            <label className="labelform-control w-full max-w-xs">
              <span className="lable-text">aboutUs:</span>
              <input
                type="text"
                placeholder="Type here"
                value={aboutUs}
                className="labelinput labelinput-bordered w-full max-w-xs p-4"
                onChange={(e)=>setAboutUs(e.target.value)}
              />
            </label>
            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-center m-4">
              <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
            </div>
          </div>
        </div>
        <div>
            <UserCard user={{firstName,lastName,photoUrl,age,aboutUs,gender}}/>
        </div>
      </div>
      <div className="toast toast-top toast-center">
               { showToast && <div className="alert alert-success">
                    <span>Profile saved successfully.</span>
                </div>}
        </div>
    </>
    );
}

export default EditProfile;