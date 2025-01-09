import EditProfile from "./EdiitProfile";
import { useSelector } from "react-redux";

const Profile = ()=>{
    const user= useSelector((store)=>store.user);
    return (
        <div>
            <EditProfile user = {user}/>
        </div>
    );
}

export default Profile;