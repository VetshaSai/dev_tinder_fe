import Body from "./Body";
import Login from "./Login";
import Navigation from "./NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./SignUp";
import ConnectionRequest from "./ConnectionRequest";

function App() {
  return (
    <>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body/>}>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/connectionRequests" element={<ConnectionRequest/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
