import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoKeySharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUserThunk } from "../../store/slice/user/user.thunk";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, buttonLoading } = useSelector((state) => state.userReducer);

  const [signupData, setSignupData] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "male",
  });

  // Redirect after signup
  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle signup
  const handleSignup = async () => {
    if (signupData.password !== signupData.confirmPassword) {
      return toast.error("Passwords do not match ❌");
    }

    toast.promise(dispatch(registerUserThunk(signupData)).unwrap(), {
      loading: "Creating account...",
      success: "Account created!",
      error: (err) => err || "Signup failed ❌",
    });
  };

  return (
    <div className="flex justify-center items-center p-6 min-h-screen">
      <div className="max-w-160 w-full flex flex-col gap-5 bg-base-200 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold">Please Signup..!!</h2>

        {/* Full Name */}
        <label className="input input-bordered flex items-center gap-2">
          <FaUser />
          <input type="text" name="fullName" className="grow" placeholder="Full Name" value={signupData.fullName} onChange={handleInputChange} />
        </label>

        {/* Username */}
        <label className="input input-bordered flex items-center gap-2">
          <FaUser />
          <input type="text" name="username" className="grow" placeholder="Username" value={signupData.username} onChange={handleInputChange} />
        </label>

        {/* Password */}
        <label className="input input-bordered flex items-center gap-2">
          <IoKeySharp />
          <input type="password" name="password" className="grow" placeholder="Password" value={signupData.password} onChange={handleInputChange} />
        </label>

        {/* Confirm Password */}
        <label className="input input-bordered flex items-center gap-2">
          <IoKeySharp />
          <input type="password" name="confirmPassword" className="grow" placeholder="Confirm Password" value={signupData.confirmPassword} onChange={handleInputChange} />
        </label>

        {/* Gender */}
        <div className="input input-bordered flex items-center gap-5">
          <label htmlFor="male" className="flex gap-2 items-center">
            <input id="male" type="radio" name="gender" value="male" className="radio radio-primary" checked={signupData.gender === "male"} onChange={handleInputChange} />
            <span>Male</span>
          </label>

          <label htmlFor="female" className="flex gap-2 items-center">
            <input id="female" type="radio" name="gender" value="female" className="radio radio-primary" checked={signupData.gender === "female"} onChange={handleInputChange} />
            <span>Female</span>
          </label>
        </div>

        {/* Button */}
        <button onClick={handleSignup} className="btn btn-primary" disabled={buttonLoading}>
          {buttonLoading ? "Signing up..." : "Signup"}
        </button>

        {/* Login link */}
        <p>
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
