import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoKeySharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUserThunk } from "../../store/slice/user/user.thunk";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, buttonLoading } = useSelector((state) => state.userReducer);

  const [loginData, setLoginData] = useState({ username: "", password: "" });

  // Redirect after login
  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  // Handle input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle login
  const handleLogin = async () => {
    toast.promise(dispatch(loginUserThunk(loginData)).unwrap(), {
      loading: "Logging in...",
      success: "Login successful!",
      error: (err) => err || "Login failed ❌",
    });
  };

  return (
    <div className="flex justify-center items-center p-6 min-h-screen">
      <div className="max-w-160 w-full flex flex-col gap-5 bg-base-200 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold">Please Login..!!</h2>

        {/* Username */}
        <label className="input input-bordered flex items-center gap-2">
          <FaUser />
          <input type="text" name="username" className="grow" placeholder="Username" value={loginData.username} onChange={handleInputChange} />
        </label>

        {/* Password */}
        <label className="input input-bordered flex items-center gap-2">
          <IoKeySharp />
          <input type="password" name="password" className="grow" placeholder="Password" value={loginData.password} onChange={handleInputChange} />
        </label>

        {/* Login Button */}
        <button onClick={handleLogin} className="btn btn-primary" disabled={buttonLoading}>
          {buttonLoading ? "Logging in..." : "Login"}
        </button>

        {/* Signup */}
        <p>
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-400 underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
