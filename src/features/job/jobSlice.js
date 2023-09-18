import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import customFetch from '../../utils/customFetch';
import { logoutUser } from '../user/userSlice';
import { toast } from 'react-toastify';
import { getUserFromLocalStorage } from '../../utils/localStorage';

const initialState = {
  isLoading: false,
  position: '',
  company: '',
  jobLocation: '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['interview', 'declined', 'pending'],
  status: 'pending',
  isEditing: false,
  editJobId: '',
};

export const createJob = createAsyncThunk(
  'job/createJob',
  async (job, thunkAPI) => {
    try {
      const response = await customFetch.post('/jobs', job, {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().userState.user.token}`,
        },
      });
      thunkAPI.dispatch(clearValues());
      return response.data;
    } catch (error) {
      console.log(error);
      if ((error.response.status = 401)) {
        thunkAPI.dispatch(logoutUser());
        return thunkAPI.rejectWithValue({
          msg: 'unauthorized! logging out...', //two toast, verify
        });
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    handleChangeReducer: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    clearValues: () => {
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location || '',
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // create job
      .addCase(createJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success(`job created`);
      })
      .addCase(createJob.rejected, (state, action) => {
        const { msg } = action.payload;
        state.isLoading = false;
        toast.error(msg);
      });
  },
});

export const { handleChangeReducer, clearValues } = jobSlice.actions;
export default jobSlice.reducer;
