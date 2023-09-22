import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getAllJobsThunk, showStatsThunk } from './allJobsThunk';

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

export const getAllJobs = createAsyncThunk('/allJobs/getJobs', getAllJobsThunk);

export const showStats = createAsyncThunk('allJobs/showStats', showStatsThunk);

const allJobsSlice = createSlice({
  name: 'allJobs',
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    clearFilters: (state) => {
      return { ...state, ...initialFiltersState };
    },
    handleChange: (state, action) => {
      const { name, value } = action.payload;
      // return { ...state, [name]: value };
      state[name] = value;
      state.page = 1;
    },
    changePage: (state, action) => {
      const { pageNumber } = action.payload;
      state.page = pageNumber;
    },
    clearAllJobsState: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      // get all jobs
      .addCase(getAllJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllJobs.fulfilled, (state, action) => {
        const { jobs, totalJobs, numOfPages } = action.payload;
        state.isLoading = false;
        state.jobs = jobs;
        state.totalJobs = totalJobs;
        state.numOfPages = numOfPages;
      })
      .addCase(getAllJobs.rejected, (state, action) => {
        const { msg } = action.payload;
        state.isLoading = false;
        toast.error(msg);
      })
      // show stats
      .addCase(showStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(showStats.fulfilled, (state, action) => {
        const { defaultStats, monthlyApplications } = action.payload;
        state.isLoading = false;
        state.stats = defaultStats;
        state.monthlyApplications = monthlyApplications;
      })
      .addCase(showStats.rejected, (state, action) => {
        const { msg } = action.payload;
        state.isLoading = false;
        toast.error(msg);
      });
  },
});

export default allJobsSlice.reducer;
export const {
  showLoading,
  hideLoading,
  clearFilters,
  handleChange,
  changePage,
  clearAllJobsState,
} = allJobsSlice.actions;
