import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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

const getInitialAuthState = (): AuthState => {
  try {
    const storedAuth = localStorage.getItem("auth");

    if (storedAuth) {
      const parsedAuth = JSON.parse(storedAuth);

      return {
        user: parsedAuth.user ?? null,
        loading: false,
        error: null,
        isAuthenticated: parsedAuth.isAuthenticated === true,
      };
    }
  } catch (error) {
    console.error("Failed to restore authentication", error);
  }

  return {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
  };
};

const initialState = getInitialAuthState();

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    const validEmail = "admin@test.com";

    const validPassword = "Admin@123";

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

    return rejectWithValue("Invalid email or password");
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;

      localStorage.removeItem("auth");
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload;

        state.isAuthenticated = true;

        state.error = null;

        localStorage.setItem(
          "auth",
          JSON.stringify({
            user: action.payload,
            loading: false,
            error: null,
            isAuthenticated: true,
          }),
        );
      })

      .addCase(login.rejected, (state, action) => {
        state.loading = false;

        state.isAuthenticated = false;

        state.error = (action.payload as string) || "Login failed";
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
