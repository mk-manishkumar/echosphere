import { FaUser } from "react-icons/fa";
import { IoKeySharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex justify-center items-center p-6 min-h-screen">
      <div className="max-w-160 w-full flex flex-col gap-5 bg-base-200 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold">Please Login..!!</h2>

        <label className="input input-bordered flex items-center gap-2">
          <FaUser />
          <input type="text" name="username" className="grow" placeholder="Username" onChange={handleInputChange} />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <IoKeySharp />
          <input type="password" name="password" placeholder="Password" className="grow" onChange={handleInputChange} />
        </label>

        <button className="btn btn-primary">Login</button>

        <p>
          Don't have an account? &nbsp;
          <Link to="/signup" className="text-blue-400 underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
