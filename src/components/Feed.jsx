import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () =>{
    const feed = useSelector((store)=>store.feed);
    const dispatch = useDispatch();
    const getFeed= async() =>{
        if(feed) return;
        const res = await axios.get(BASE_URL+"/user/feed",{withCredentials:true});
        dispatch(addFeed(res?.data?.data));
    }

    useEffect(()=>{
        getFeed()
    },[]);

    if (!feed) return;

    if(feed.length <= 0) return <h1 className="justify-center">No more users for you as of now</h1>
    
    return(
       feed && (
       <div className="flex justify-center my-10">
            <UserCard user={feed[0]}/>
        </div>
    ));
}

export default Feed;