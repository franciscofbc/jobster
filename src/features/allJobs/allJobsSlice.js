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
    const { search, searchStatus, searchType, sort, page } =
      thunkAPI.getState().allJobsState;

    let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
    if (search) {
      url += `&search=${search}`;
    }

    try {
      const response = await customFetch.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({ msg: 'there was an error' });
    }
  }
);

export const showStats = createAsyncThunk(
  'allJobs/showStats',
  async (_, thunkAPI) => {
    try {
      const response = await customFetch.get('/jobs/stats');
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

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
} = allJobsSlice.actions;
