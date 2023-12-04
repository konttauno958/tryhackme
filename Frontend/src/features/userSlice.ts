import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../api/api";

export const userSignUp = createAsyncThunk(
  "user/signup",
  async (data: { username: string; email: string; password: string }) => {
    try {
      const response = await api.post("/user/signup", data)
      if (response.status === 200) {
        if (response.data.error) return response.data
        else return "success"
      }
    } catch (err) {
      console.error(err)
    }
  }
)

export const userSignIn = createAsyncThunk(
  "user/signin",
  async (data: { email: string; password: string }) => {
    try {
      const response = await api.post("/user/signin", data)
      if (response.status === 200) {
        if (response.data.error) return { error: response.data.error }
        else if (response.data.token) return response.data.token
      }
    } catch (err) {
      console.error(err)
    }
  }
)

const userSlice = createSlice({
  name: "user",
  initialState: {
    signuping: false,
    signining: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userSignUp.pending, (state) => {
        state.signuping = true
      })
      .addCase(userSignUp.fulfilled, (state) => {
        state.signuping = false
      })
      .addCase(userSignUp.rejected, (state) => {
        state.signuping = false
      })
      .addCase(userSignIn.pending, (state) => {
        state.signining = true
      })
      .addCase(userSignIn.fulfilled, (state,) => {
        state.signining = false
      })
      .addCase(userSignIn.rejected, (state) => {
        state.signining = false
      })
  },
})

export default userSlice.reducer
