import { createSlice } from "@reduxjs/toolkit";
import { getOtherUsersThunk, getUserProfileThunk, loginUserThunk, logoutUserThunk, registerUserThunk, checkUsernameAvailabilityThunk, updateProfileThunk, changePasswordThunk, deleteAccountThunk } from "./user.thunk";

const initialState = {
  isAuthenticated: false,
  userProfile: null,
  otherUsers: [],
  selectedUser: JSON.parse(localStorage.getItem("selectedUser")),
  buttonLoading: false,
  screenLoading: true,
  usernameAvailable: null,
  usersHasMore: true,
  usersLoading: false,
  totalUsersCount: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      localStorage.setItem("selectedUser", JSON.stringify(action.payload));
      state.selectedUser = action.payload;
    },
    clearUsernameAvailability: (state) => {
      state.usernameAvailable = null;
    },
  },
  extraReducers: (builder) => {
    // login user
    builder.addCase(loginUserThunk.pending, (state) => {
      state.buttonLoading = true;
    });
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      state.userProfile = action.payload?.responseData?.user;
      state.isAuthenticated = true;
      state.buttonLoading = false;
    });
    builder.addCase(loginUserThunk.rejected, (state) => {
      state.buttonLoading = false;
    });

    // register user
    builder.addCase(registerUserThunk.pending, (state) => {
      state.buttonLoading = true;
    });
    builder.addCase(registerUserThunk.fulfilled, (state, action) => {
      state.userProfile = action.payload?.responseData?.newUser;
      state.isAuthenticated = true;
      state.buttonLoading = false;
    });
    builder.addCase(registerUserThunk.rejected, (state) => {
      state.buttonLoading = false;
    });

    // logout user
    builder.addCase(logoutUserThunk.pending, (state) => {
      state.buttonLoading = true;
    });
    builder.addCase(logoutUserThunk.fulfilled, (state) => {
      state.userProfile = null;
      state.selectedUser = null;
      state.otherUsers = [];
      state.usersHasMore = true;
      state.totalUsersCount = 0;
      state.isAuthenticated = false;
      state.buttonLoading = false;
      localStorage.clear();
    });
    builder.addCase(logoutUserThunk.rejected, (state) => {
      state.buttonLoading = false;
    });

    // get user profile
    builder.addCase(getUserProfileThunk.pending, (state) => {
      state.screenLoading = true;
    });
    builder.addCase(getUserProfileThunk.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.screenLoading = false;
      state.userProfile = action.payload?.responseData;
    });
    builder.addCase(getUserProfileThunk.rejected, (state) => {
      state.screenLoading = false;
    });

    // get other users
    builder.addCase(getOtherUsersThunk.pending, (state) => {
      state.usersLoading = true;
    });
    builder.addCase(getOtherUsersThunk.fulfilled, (state, action) => {
      const { users = [], totalCount = 0, hasMore = false } = action.payload?.responseData || {};
      // Append new users to existing list
      state.otherUsers = [...state.otherUsers, ...users];
      state.usersHasMore = hasMore;
      state.totalUsersCount = totalCount;
      state.usersLoading = false;
    });
    builder.addCase(getOtherUsersThunk.rejected, (state) => {
      state.usersLoading = false;
    });

    // check username availability
    builder.addCase(checkUsernameAvailabilityThunk.fulfilled, (state, action) => {
      state.usernameAvailable = action.payload?.responseData?.available;
    });

    // update profile
    builder.addCase(updateProfileThunk.pending, (state) => {
      state.buttonLoading = true;
    });
    builder.addCase(updateProfileThunk.fulfilled, (state, action) => {
      state.userProfile = action.payload?.responseData;
      state.buttonLoading = false;
    });
    builder.addCase(updateProfileThunk.rejected, (state) => {
      state.buttonLoading = false;
    });

    // change password
    builder.addCase(changePasswordThunk.pending, (state) => {
      state.buttonLoading = true;
    });
    builder.addCase(changePasswordThunk.fulfilled, (state) => {
      state.buttonLoading = false;
    });
    builder.addCase(changePasswordThunk.rejected, (state) => {
      state.buttonLoading = false;
    });

    // delete account
    builder.addCase(deleteAccountThunk.pending, (state) => {
      state.buttonLoading = true;
    });
    builder.addCase(deleteAccountThunk.fulfilled, (state) => {
      state.userProfile = null;
      state.selectedUser = null;
      state.otherUsers = null;
      state.isAuthenticated = false;
      state.buttonLoading = false;
      localStorage.clear();
    });
    builder.addCase(deleteAccountThunk.rejected, (state) => {
      state.buttonLoading = false;
    });
  },
});

export const { setSelectedUser, clearUsernameAvailability } = userSlice.actions;

export default userSlice.reducer;
