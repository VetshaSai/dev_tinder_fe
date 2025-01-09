import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useEffect } from "react";

const Requests = () =>{
  const requests = useSelector((store) => store.request);
  const dispatch = useDispatch();
  console.log("store C", requests);
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/recived", {
        withCredentials: true,
      });
      console.log("request", res);
      dispatch(addRequest(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);
  
  const reviewRequests = async(status,id)=>{
    try{
      const data = axios.post(BASE_URL+"/request/review/"+status+"/"+id,{},{withCredentials:true});
      dispatch(removeRequest(id));
    } catch(err){
      console.log(err);
    }
  }

  if(!requests || requests.length === 0) return <div>No requests are available</div>

  return (
<div className="">
  <h1 className="font-bold text-white text-center">Requests</h1>
  <div className="w-10/12 m-auto">
    {requests.map((request) => {
      const { firstName, lastName, aboutUs, photoUrl, age } = request;
      return (
        <div
          key={request._id}
          className="m-4 flex"
        >
          {/* Image Section */}
          <img
            className="w-28"
            src={photoUrl}
            alt={`${firstName} ${lastName}`}
          />

          {/* Info Section */}
          <div className="p-4 flex-col">
            <h2 className="text-2xl font-semibold">
              {`${firstName} ${lastName}`}
            </h2>
            {age && <p className="text-sm text-gray-400 mt-1">Age: {age}</p>}
            <p className="mt-2 text-sm text-gray-300">{aboutUs}</p>
          </div>
          <button className="btn btn-active btn-primary m-4" onClick={()=>reviewRequests("accepted",request._id)}>Accept</button>
          <button className="btn btn-active btn-secondary m-4" onClick={()=>{reviewRequests("ignored",request._id)}}>Reject</button>
          </div>
      );
    })}
  </div>
</div>
  );
}

export default Requests;