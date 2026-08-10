import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

interface AuthUser {
  id: number;
  email: string;
  role: string;
}

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

interface LoginCredentials {
  email: string;
  password: string;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

export const login = createAsyncThunk(
  "auth/login",
  async (
    credentials: LoginCredentials,
    { rejectWithValue }
  ) => {
    const validEmail =
      "admin@test.com";

    const validPassword =
      "Admin@123";

    if (
      credentials.email === validEmail &&
      credentials.password === validPassword
    ) {
      return {
        id: 1,
        email: validEmail,
        role: "admin",
      };
    }

    return rejectWithValue(
      "Invalid email or password"
    );
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(
        login.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        login.fulfilled,
        (state, action) => {
          state.loading = false;
          state.user = action.payload;
          state.isAuthenticated = true;
          state.error = null;
        }
      )

      .addCase(
        login.rejected,
        (state, action) => {
          state.loading = false;
          state.isAuthenticated = false;

          state.error =
            (action.payload as string) ||
            "Login failed";
        }
      );
  },
});

export const { logout } =
  authSlice.actions;

export default authSlice.reducer;