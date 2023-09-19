import customFetch from '../../utils/customFetch';
import { getAllJobs, hideLoading, showLoading } from '../allJobs/allJobsSlice';
import { logoutUser } from '../user/userSlice';
import { clearValues } from './jobSlice';

export const createJobThunk = async (job, thunkAPI) => {
  try {
    const response = await customFetch.post('/jobs', job);
    thunkAPI.dispatch(clearValues());
    return response.data;
  } catch (error) {
    console.log(error);
    if ((error.response.status = 401)) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue({
        msg: 'unauthorized! logging out...',
      });
    }
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteJobThunk = async (jobId, thunkAPI) => {
  thunkAPI.dispatch(showLoading());
  try {
    const response = await customFetch.delete(`/jobs/${jobId}`);
    thunkAPI.dispatch(getAllJobs());
    return response.data;
  } catch (error) {
    console.log(error);
    thunkAPI.dispatch(hideLoading());
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const editJobThunk = async ({ jobId, job }, thunkAPI) => {
  try {
    const response = await customFetch.patch(`/jobs/${jobId}`, job);
    thunkAPI.dispatch(clearValues());
    return response.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
