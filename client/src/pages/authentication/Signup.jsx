import { useEffect, useState } from "react";
import { FaUser, FaMars, FaVenus } from "react-icons/fa";
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

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  };

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
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-zinc-900 rounded-2xl border border-white/10 overflow-hidden shadow-xl">
        {/* Top */}
        <div className="px-8 pt-8 pb-6 border-b border-white/10">
          <div className="flex items-center justify-center mb-5">
            <h1 className="text-indigo-500 text-2xl font-bold">Echosphere</h1>
          </div>
          <h1 className="text-xl font-semibold text-white">Create your account</h1>
        </div>

        {/* Body */}
        <div className="px-8 py-6 flex flex-col gap-4">
          {/* Full Name */}
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-zinc-400 tracking-wide">Full name</span>
            <div className="flex items-center gap-3 h-10 px-3 bg-zinc-800 border border-white/10 rounded-lg focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
              <FaUser className="text-zinc-500 text-xs shrink-0" />
              <input type="text" name="fullName" placeholder="Jane Doe" value={signupData.fullName} onChange={handleInputChange} className="grow text-sm text-white placeholder:text-zinc-500 outline-none" />
            </div>
          </div>

          {/* Username */}
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-zinc-400 tracking-wide">Username</span>
            <div className="flex items-center gap-3 h-10 px-3 bg-zinc-800 border border-white/10 rounded-lg focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
              <FaUser className="text-zinc-500 text-xs shrink-0" />
              <input type="text" name="username" placeholder="janedoe" value={signupData.username} onChange={handleInputChange} className="grow text-sm text-white placeholder:text-zinc-500 outline-none" />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-zinc-400 tracking-wide">Password</span>
            <div className="flex items-center gap-3 h-10 px-3 bg-zinc-800 border border-white/10 rounded-lg focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
              <IoKeySharp className="text-zinc-500 text-sm shrink-0" />
              <input type="password" name="password" placeholder="••••••••" value={signupData.password} onChange={handleInputChange} className="grow bg-transparent text-sm text-white placeholder:text-zinc-500 outline-none" />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-zinc-400 tracking-wide">Confirm password</span>
            <div className="flex items-center gap-3 h-10 px-3 bg-zinc-800 border border-white/10 rounded-lg focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
              <IoKeySharp className="text-zinc-500 text-sm shrink-0" />
              <input type="password" name="confirmPassword" placeholder="••••••••" value={signupData.confirmPassword} onChange={handleInputChange} className="grow bg-transparent text-sm text-white placeholder:text-zinc-500 outline-none" />
            </div>
          </div>

          {/* Gender */}
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-zinc-400 tracking-wide">Gender</span>
            <div className="flex gap-3">
              {["male", "female"].map((g) => (
                <label key={g} className="flex-1 cursor-pointer">
                  <input type="radio" name="gender" value={g} checked={signupData.gender === g} onChange={handleInputChange} className="hidden" />
                  <div className={`flex items-center justify-center gap-2 h-10 rounded-lg border text-sm transition-all ${signupData.gender === g ? "border-indigo-500 text-indigo-400 bg-indigo-500/10 ring-2 ring-indigo-500/20" : "border-white/10 text-zinc-400 bg-zinc-800"}`}>
                    {g === "male" ? <FaMars className="text-xs" /> : <FaVenus className="text-xs" />}
                    {g.charAt(0).toUpperCase() + g.slice(1)}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Button */}
          <button onClick={handleSignup} disabled={buttonLoading} aria-busy={buttonLoading} aria-disabled={buttonLoading} className="w-full h-11 mt-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] disabled:bg-indigo-400 text-white text-sm font-medium flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/20 cursor-pointer">
            {buttonLoading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
            <span>{buttonLoading ? "Signing up..." : "Sign up"}</span>
          </button>

          {/* Login link */}
          <p className="text-center text-sm text-zinc-500">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-400 font-medium hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
