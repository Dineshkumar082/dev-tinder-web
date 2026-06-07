import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestsSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const Requests = useSelector((store) => store.requests);
  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        "http://localhost:7777/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      //TODO
    }
  };
  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        "http://localhost:7777/user/request/received",
        {
          withCredentials: true,
        },
      );
      console.log(res);
      dispatch(addRequests(res.data.data));
    } catch (err) {
      //TODO
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);
  if (!Requests) return null;
  if (Requests.length === 0)
    return <div className="text-3xl">No connection found</div>;
  return (
    <>
      <h2 className="text-2xl text-center my-2.5">Connection Requests</h2>
      {Requests.map((r) => {
        return (
          <ul
            key={r._id}
            className="list bg-base-200 w-2/3 mx-auto my-5 rounded-box shadow-md"
          >
            <li className="list-row">
              <div>
                <img
                  className="size-10 rounded-box"
                  src={r.fromUserId.photoUrl}
                />
              </div>
              <div>
                <div>
                  {r.fromUserId.firstName + " " + r.fromUserId.lastName}
                </div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  {r.fromUserId.about}
                </div>
              </div>
              <div className="flex">
                <button
                  className="btn btn-active btn-primary mx-5"
                  onClick={() => reviewRequest("rejected", r._id)}
                >
                  Reject
                </button>
                <button
                  className="btn btn-active btn-secondary"
                  onClick={() => reviewRequest("accepted", r._id)}
                >
                  Accept
                </button>
              </div>
            </li>
          </ul>
        );
      })}
    </>
  );
};

export default Requests;
