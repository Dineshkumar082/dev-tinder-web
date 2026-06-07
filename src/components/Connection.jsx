import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connection = () => {
  const dispatch = useDispatch();
  const connection = useSelector((store) => store.connection);
  const fetchConnection = async () => {
    try {
      const res = await axios.get("http://localhost:7777/user/connection", {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addConnection(res.data.data));
    } catch (err) {
      //TODO
    }
  };
  useEffect(() => {
    fetchConnection();
  }, []);
  if (!connection) return;
  if (connection.length === 0)
    return <div className="text-3xl">No connection found</div>;
  return (
    <>
      <h2 className="text-2xl text-center my-2.5">Connections</h2>
      {connection.map((c) => {
        return (
          <ul className="list bg-base-200 w-2/3 mx-auto my-5 rounded-box shadow-md">
            <li className="list-row" key={c._id}>
              <div>
                <img className="size-10 rounded-box" src={c.photoUrl} />
              </div>
              <div>
                <div>{c.firstName + " " + c.lastName}</div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  {c.about}
                </div>
              </div>
            </li>
          </ul>
        );
      })}
    </>
  );
};

export default Connection;
