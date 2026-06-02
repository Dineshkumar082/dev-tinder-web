import axios from "axios";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("dinesh@gmail.com");
  const [password, setPassword] = useState("Closethedoor@123");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:7777/login",
        { email, password },
        { withCredentials: true },
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      console.log(err);

      setError(err?.response?.data || "Something went wrong");
    }
  };
  return (
    <div className="flex justify-center items-center my-15">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title mx-auto">Login</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Enter the email</legend>
            <input
              type="text"
              className="input"
              value={email}
              placeholder="Type here"
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Enter the password</legend>
            <input
              type="text"
              className="input"
              value={password}
              placeholder="Type here"
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary my-5" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
