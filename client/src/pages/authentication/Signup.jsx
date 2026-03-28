import { FaUser } from "react-icons/fa";
import { IoKeySharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState } from "react";

const Signup = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "male",
  });

  const handleInputChange = (e) => {
    setSignupData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex justify-center items-center p-6 min-h-screen">
      <div className="max-w-160 w-full flex flex-col gap-5 bg-base-200 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold">Please Signup..!!</h2>

        <label className="input input-bordered flex items-center gap-2">
          <FaUser />
          <input type="text" name="fullName" className="grow" placeholder="Full Name" onChange={handleInputChange} />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <FaUser />
          <input type="text" name="username" className="grow" placeholder="Username" onChange={handleInputChange} />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <IoKeySharp />
          <input type="password" name="password" placeholder="Password" className="grow" onChange={handleInputChange} />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <IoKeySharp />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" className="grow" onChange={handleInputChange} />
        </label>

        <div className="input input-bordered flex items-center gap-5">
          <label htmlFor="male" className="flex gap-3 items-center">
            <input id="male" type="radio" name="gender" value="male" className="radio radio-primary" onChange={handleInputChange} />
            <span>Male</span>
          </label>
          <label htmlFor="female" className="flex gap-3 items-center">
            <input id="female" type="radio" name="gender" value="female" className="radio radio-primary" onChange={handleInputChange} />
            <span>Female</span>
          </label>
        </div>

        <button className="btn btn-primary">Signup</button>

        <p>
          Already have an account? &nbsp;
          <Link to="/login" className="text-blue-400 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
