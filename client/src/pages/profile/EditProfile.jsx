import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { IoArrowBack } from "react-icons/io5";
import { updateProfileThunk, changePasswordThunk, deleteAccountThunk, checkUsernameAvailabilityThunk } from "../../store/slice/user/user.thunk";
import { clearUsernameAvailability } from "../../store/slice/user/user.slice";

const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userProfile, buttonLoading, usernameAvailable } = useSelector((state) => state.userReducer);

  // Profile form state — initialized directly from userProfile, no useEffect needed
  const [profileForm, setProfileForm] = useState({
    fullName: userProfile?.fullName || "",
    username: userProfile?.username || "",
    gender: userProfile?.gender || "",
  });

  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Delete account state
  const [deletePassword, setDeletePassword] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Validation states
  const [profileErrors, setProfileErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState({});
  const [usernameCheckLoading, setUsernameCheckLoading] = useState(false);

  // Check username availability
  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setProfileForm((prev) => ({ ...prev, username: value }));
    setProfileErrors((prev) => ({ ...prev, username: "" }));

    // Clear previous check
    dispatch(clearUsernameAvailability());

    if (value.length >= 3 && value !== userProfile?.username) {
      setUsernameCheckLoading(true);
      const timer = setTimeout(() => {
        dispatch(checkUsernameAvailabilityThunk(value)).finally(() => {
          setUsernameCheckLoading(false);
        });
      }, 500);
      return () => clearTimeout(timer);
    }
  };

  // Validate profile form
  const validateProfileForm = () => {
    const errors = {};

    if (profileForm.fullName.trim().length < 2) {
      errors.fullName = "Full name must be at least 2 characters";
    }

    if (profileForm.fullName.trim().length > 50) {
      errors.fullName = "Full name cannot exceed 50 characters";
    }

    if (profileForm.username.trim().length < 3) {
      errors.username = "Username must be at least 3 characters";
    }

    if (profileForm.username.trim().length > 20) {
      errors.username = "Username cannot exceed 20 characters";
    }

    if (usernameAvailable === false && profileForm.username !== userProfile?.username) {
      errors.username = "Username is already taken";
    }

    if (!profileForm.gender) {
      errors.gender = "Please select a gender";
    }

    setProfileErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Validate password form
  const validatePasswordForm = () => {
    const errors = {};

    if (!passwordForm.oldPassword) {
      errors.oldPassword = "Old password is required";
    }

    if (!passwordForm.newPassword) {
      errors.newPassword = "New password is required";
    }

    if (passwordForm.newPassword.length < 6) {
      errors.newPassword = "New password must be at least 6 characters";
    }

    if (!passwordForm.confirmPassword) {
      errors.confirmPassword = "Confirm password is required";
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (passwordForm.oldPassword === passwordForm.newPassword) {
      errors.newPassword = "New password must be different";
    }

    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle profile form submit
  const handleProfileSubmit = (e) => {
    e.preventDefault();

    if (!validateProfileForm()) return;

    toast.promise(
      dispatch(
        updateProfileThunk({
          fullName: profileForm.fullName,
          username: profileForm.username,
          gender: profileForm.gender,
        }),
      ).unwrap(),
      {
        loading: "Updating profile...",
        success: "Profile updated successfully!",
        error: (err) => err || "Failed to update profile",
      },
    );
  };

  // Handle password form submit
  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    if (!validatePasswordForm()) return;

    toast
      .promise(
        dispatch(
          changePasswordThunk({
            oldPassword: passwordForm.oldPassword,
            newPassword: passwordForm.newPassword,
            confirmPassword: passwordForm.confirmPassword,
          }),
        ).unwrap(),
        {
          loading: "Changing password...",
          success: "Password changed successfully!",
          error: (err) => err || "Failed to change password",
        },
      )
      .then(() => {
        setPasswordForm({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      });
  };

  // Handle account deletion
  const handleDeleteAccount = () => {
    if (!deletePassword) {
      toast.error("Please enter your password");
      return;
    }

    toast
      .promise(dispatch(deleteAccountThunk(deletePassword)).unwrap(), {
        loading: "Deleting account...",
        success: "Account deleted successfully!",
        error: (err) => err || "Failed to delete account",
      })
      .then(() => {
        navigate("/login");
      });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-900 to-black p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-indigo-500 hover:text-indigo-400 transition-colors mb-4 cursor-pointer">
            <IoArrowBack className="text-lg" />
            Back
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Edit Profile</h1>
          <p className="text-zinc-400">Manage your account settings and security</p>
        </div>

        {/* Profile Information Section */}
        <div className="bg-zinc-900 border border-white/10 rounded-xl p-6 md:p-8 mb-6">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">Profile Information</h2>

          <form onSubmit={handleProfileSubmit} className="space-y-5">
            {/* Avatar Preview */}
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-indigo-500/30">
                <img src={userProfile?.avatar} alt="avatar" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-white mb-2">
                Full Name
              </label>
              <input id="fullName" type="text" value={profileForm.fullName} onChange={(e) => {
                  setProfileForm((prev) => ({ ...prev, fullName: e.target.value }));
                  setProfileErrors((prev) => ({ ...prev, fullName: "" }));
                }} className={`w-full px-4 py-2 bg-zinc-800 border rounded-lg text-white placeholder:text-zinc-500 outline-none transition-all ${profileErrors.fullName ? "border-red-500 ring-1 ring-red-500/20" : "border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20"}`} placeholder="John Doe" />
              {profileErrors.fullName && <p className="mt-1 text-sm text-red-400">{profileErrors.fullName}</p>}
            </div>

            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-white mb-2">
                Username
              </label>
              <div className="relative">
                <input id="username" type="text" value={profileForm.username} onChange={handleUsernameChange} className={`w-full px-4 py-2 bg-zinc-800 border rounded-lg text-white placeholder:text-zinc-500 outline-none transition-all ${profileErrors.username ? "border-red-500 ring-1 ring-red-500/20" : "border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20"}`} placeholder="johndoe" />
                {usernameCheckLoading && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <span className="spinner spinner-sm border-zinc-500 border-t-white"></span>
                  </div>
                )}
                {usernameAvailable === true && profileForm.username !== userProfile?.username && <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-400 text-lg">✓</div>}
              </div>
              {profileErrors.username && <p className="mt-1 text-sm text-red-400">{profileErrors.username}</p>}
              {usernameAvailable === true && profileForm.username !== userProfile?.username && <p className="mt-1 text-sm text-green-400">Username is available</p>}
            </div>

            {/* Gender */}
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-white mb-2">
                Gender
              </label>
              <div className="flex gap-4">
                <label htmlFor="gender-male" className="flex items-center gap-2 cursor-pointer">
                  <input id="gender-male" type="radio" name="gender" value="male" checked={profileForm.gender === "male"} onChange={(e) => {
                      setProfileForm((prev) => ({ ...prev, gender: e.target.value }));
                      setProfileErrors((prev) => ({ ...prev, gender: "" }));
                    }} className="w-4 h-4" />
                  <span className="text-white">Male</span>
                </label>
                <label htmlFor="gender-female" className="flex items-center gap-2 cursor-pointer">
                  <input id="gender-female" type="radio" name="gender" value="female" checked={profileForm.gender === "female"} onChange={(e) => {
                      setProfileForm((prev) => ({ ...prev, gender: e.target.value }));
                      setProfileErrors((prev) => ({ ...prev, gender: "" }));
                    }} className="w-4 h-4" />
                  <span className="text-white">Female</span>
                </label>
              </div>
              {profileErrors.gender && <p className="mt-1 text-sm text-red-400">{profileErrors.gender}</p>}
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={buttonLoading} className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer">
              {buttonLoading && <span className="spinner spinner-sm border-white border-t-transparent"></span>}
              {buttonLoading ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>

        {/* Change Password Section */}
        <div className="bg-zinc-900 border border-white/10 rounded-xl p-6 md:p-8 mb-6">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            Change Password
          </h2>

          <form onSubmit={handlePasswordSubmit} className="space-y-5">
            {/* Old Password */}
            <div>
              <label htmlFor="oldPassword" className="block text-sm font-medium text-white mb-2">
                Old Password
              </label>
              <input id="oldPassword" type="password" value={passwordForm.oldPassword} onChange={(e) => {
                  setPasswordForm((prev) => ({ ...prev, oldPassword: e.target.value }));
                  setPasswordErrors((prev) => ({ ...prev, oldPassword: "" }));
                }} className={`w-full px-4 py-2 bg-zinc-800 border rounded-lg text-white placeholder:text-zinc-500 outline-none transition-all ${passwordErrors.oldPassword ? "border-red-500 ring-1 ring-red-500/20" : "border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20"}`} placeholder="Enter current password" />
              {passwordErrors.oldPassword && <p className="mt-1 text-sm text-red-400">{passwordErrors.oldPassword}</p>}
            </div>

            {/* New Password */}
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-white mb-2">
                New Password
              </label>
              <input id="newPassword" type="password" value={passwordForm.newPassword} onChange={(e) => {
                  setPasswordForm((prev) => ({ ...prev, newPassword: e.target.value }));
                  setPasswordErrors((prev) => ({ ...prev, newPassword: "" }));
                }} className={`w-full px-4 py-2 bg-zinc-800 border rounded-lg text-white placeholder:text-zinc-500 outline-none transition-all ${passwordErrors.newPassword ? "border-red-500 ring-1 ring-red-500/20" : "border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20"}`} placeholder="Enter new password" />
              {passwordErrors.newPassword && <p className="mt-1 text-sm text-red-400">{passwordErrors.newPassword}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-2">
                Confirm New Password
              </label>
              <input id="confirmPassword" type="password" value={passwordForm.confirmPassword} onChange={(e) => {
                  setPasswordForm((prev) => ({ ...prev, confirmPassword: e.target.value }));
                  setPasswordErrors((prev) => ({ ...prev, confirmPassword: "" }));
                }} className={`w-full px-4 py-2 bg-zinc-800 border rounded-lg text-white placeholder:text-zinc-500 outline-none transition-all ${passwordErrors.confirmPassword ? "border-red-500 ring-1 ring-red-500/20" : "border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20"}`} placeholder="Confirm new password" />
              {passwordErrors.confirmPassword && <p className="mt-1 text-sm text-red-400">{passwordErrors.confirmPassword}</p>}
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={buttonLoading} className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer">
              {buttonLoading && <span className="spinner spinner-sm border-white border-t-transparent"></span>}
              {buttonLoading ? "Changing..." : "Change Password"}
            </button>
          </form>
        </div>

        {/* Delete Account Section */}
        <div className="bg-zinc-900 border border-red-500/20 rounded-xl p-6 md:p-8">
          <h2 className="text-xl font-semibold text-red-400 mb-3 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 text-sm font-bold">⚠</div>
            Danger Zone
          </h2>
          <p className="text-zinc-400 mb-6">Once deleted, your account and all associated data (messages, conversations) will be permanently removed and cannot be recovered.</p>

          {showDeleteConfirm ? (
            <div className="space-y-4">
              <div>
                <label htmlFor="deletePassword" className="block text-sm font-medium text-white mb-2">
                  Enter your password to confirm deletion
                </label>
                <input id="deletePassword" type="password" value={deletePassword} onChange={(e) => setDeletePassword(e.target.value)} className="w-full px-4 py-2 bg-zinc-800 border border-red-500/30 rounded-lg text-white placeholder:text-zinc-500 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/20 transition-all" placeholder="Enter password" />
              </div>
              <div className="flex gap-3">
                <button onClick={() => { setShowDeleteConfirm(false); setDeletePassword(""); }} className="flex-1 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-lg transition-all cursor-pointer">
                  Cancel
                </button>
                <button onClick={handleDeleteAccount} disabled={buttonLoading} className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer">
                  {buttonLoading && <span className="spinner spinner-sm border-white border-t-transparent"></span>}
                  {buttonLoading ? "Deleting..." : "Permanently Delete"}
                </button>
              </div>
            </div>
          ) : (
            <button onClick={() => setShowDeleteConfirm(true)} className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all">
              Delete Account
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
