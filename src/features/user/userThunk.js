import customFetch, {
  checkForUnauthorizedResponse,
} from '../../utils/customFetch';
import { clearAllJobsState } from '../allJobs/allJobsSlice';
import { clearValues } from '../job/jobSlice';
import { logoutUser } from './userSlice';

export const registerUserThunk = async (user, thunkAPI) => {
  try {
    const response = await customFetch.post('/auth/register', user);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const loginUserThunk = async (user, thunkAPI) => {
  try {
    const response = await customFetch.post('/auth/login', user);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateUserThunk = async (user, thunkAPI) => {
  try {
    const response = await customFetch.patch('/auth/updateUser', user);
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const clearStoreThunk = async (message, thunkAPI) => {
  try {
    // log out user
    thunkAPI.dispatch(logoutUser({ msg: message }));
    // job slice
    thunkAPI.dispatch(clearValues());
    // all jobs slice
    thunkAPI.dispatch(clearAllJobsState());
    return Promise.resolve();
  } catch (error) {
    return Promise.reject();
  }
};
