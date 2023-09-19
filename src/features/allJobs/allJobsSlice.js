import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import customFetch from '../../utils/customFetch';
import { toast } from 'react-toastify';

const initialFiltersState = {
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};

const initialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

export const getAllJobs = createAsyncThunk(
  '/allJobs/getJobs',
  async (_, thunkAPI) => {
    let url = '/jobs';
    try {
      const response = await customFetch.get(url, {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().userState.user.token}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({ msg: 'there was an error' });
    }
  }
);

const allJobsSlice = createSlice({
  name: 'allJobs',
  initialState,
  extraReducers: (builder) => {
    builder
      // get all jobs
      .addCase(getAllJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllJobs.fulfilled, (state, action) => {
        const { jobs } = action.payload;
        state.isLoading = false;
        state.jobs = jobs;
      })
      .addCase(getAllJobs.rejected, (state, action) => {
        const { msg } = action.payload;
        state.isLoading = false;
        toast.error(msg);
      });
  },
});

export default allJobsSlice.reducer;
