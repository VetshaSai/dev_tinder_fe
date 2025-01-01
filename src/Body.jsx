import { Outlet } from "react-router-dom";
import Navigation from "./NavBar";
import Footer from "./Footer";
const Body = () =>{
    return (
        <div>
            <Navigation/>
            <Outlet></Outlet>
            <Footer/>
        </div>
    );
}

export default Body;