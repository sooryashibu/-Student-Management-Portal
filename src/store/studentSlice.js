import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch students from mock API
export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await res.json();
    return data.map((item) => ({
      id: item.id,
      name: item.name,
      email: item.email,
      phone: item.phone || "",
    }));
  }
);

const studentSlice = createSlice({
  name: "students",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    addStudent: (state, action) => {
      state.list.push(action.payload);
    },
    editStudent: (state, action) => {
      const index = state.list.findIndex((s) => s.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deleteStudent: (state, action) => {
      state.list = state.list.filter((s) => s.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addStudent, editStudent, deleteStudent } = studentSlice.actions;

export default studentSlice.reducer;
