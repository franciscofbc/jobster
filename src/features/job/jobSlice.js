import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getUserFromLocalStorage } from '../../utils/localStorage';
import { createJobThunk, deleteJobThunk, editJobThunk } from './jobThunk';

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

export const createJob = createAsyncThunk('job/createJob', createJobThunk);

export const deleteJob = createAsyncThunk('job/deleteJob', deleteJobThunk);

export const editJob = createAsyncThunk('job/editJob', editJobThunk);

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
    setEditJob: (state, action) => {
      return { ...state, isEditing: true, ...action.payload };
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
      })
      //delete job
      .addCase(deleteJob.fulfilled, (state, action) => {
        const { msg } = action.payload;
        toast.success(msg);
      })
      .addCase(deleteJob.rejected, (state, action) => {
        const { msg } = action.payload;
        toast.error(msg);
      })
      //edit job
      .addCase(editJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editJob.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success(`job modified`);
      })
      .addCase(editJob.rejected, (state, action) => {
        const { msg } = action.payload;
        state.isLoading = false;
        toast.error(msg);
      });
  },
});

export const { handleChangeReducer, clearValues, setEditJob } =
  jobSlice.actions;
export default jobSlice.reducer;
