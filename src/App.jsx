import Body from "./components/Body";
import Login from "./components/Login";
//import Navigation from "./components/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Connection from "./components/Connection";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Requests from "./components/Requests";
function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed/>}/>
              <Route path="/login" element={<Login />} />
              {/* <Route path="/signup" element={<SignUp />} /> */}
              <Route path="/connections" element={<Connection/>}/>
              <Route path="/profile" element={<Profile />} />
              <Route path="/requests" element={<Requests/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App
