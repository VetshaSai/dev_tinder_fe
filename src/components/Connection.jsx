import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {

  const connections = useSelector((store) => store.connection);
  //const {firstName, lastName,photoUrl,aboutUs}= connections;
  const dispatch = useDispatch();
  console.log("store C", connections);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log("Connections", res.data.Data);
      dispatch(addConnection(res.data.Data));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);
  
  if(!connections) return;
  if(connections.length === 0) return <div>No connections are available</div>

  return (
<div className="container mx-auto px-4 py-8">
  <h1 className="text-center text-4xl font-bold mb-8 text-white">Connections</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
    {connections.map((connection) => {
      const { firstName, lastName, aboutUs, photoUrl, age } = connection;
      return (
        <div
          key={connection._id}
          className="flex flex-col sm:flex-row bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden"
        >
          {/* Image Section */}
          <img
            className="w-full sm:w-1/3 object-cover"
            src={photoUrl}
            alt={`${firstName} ${lastName}`}
          />

          {/* Info Section */}
          <div className="p-4 flex flex-col justify-between">
            <h2 className="text-2xl font-semibold">
              {`${firstName} ${lastName}`}
            </h2>
            {age && <p className="text-sm text-gray-400 mt-1">Age: {age}</p>}
            <p className="mt-2 text-sm text-gray-300">{aboutUs}</p>
          </div>
        </div>
      );
    })}
  </div>
</div>
  );
};

export default Connections;
