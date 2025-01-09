import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({user}) => {
    console.log(user);
    const dispatch = useDispatch();
    const {firstName,lastName,aboutUs,age,skills,gender,_id} = user;
    const handelSendRequest = async (status,_id) =>{
      try{
        const res = await axios.post(BASE_URL+"/request/send/"+status+"/"+_id,{},{withCredentials:true});
        dispatch(removeFeed(_id));
      } catch(err){
        console.log(err);
      }
    }
  return (
    <div>
      <div className="card bg-base-300 w-96 shadow-xl">
        <figure>
          <img
            src={user.photoUrl}
            alt="profile"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
          {age && <p>Age: {age}</p>}
          {gender && <p>gender: {gender}</p>}
          <p>{aboutUs}</p>
          {skills && <p>{skills.join(",")}</p>}
          <div className="card-actions my-6">
            <button className="btn btn-primary" onClick={()=>{handelSendRequest("ignored",_id)}}>Ignore</button>
            <button className="btn  btn-secondary" onClick={()=>{handelSendRequest("interested",_id)}}>Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
