import customFetch from '../../utils/customFetch';
import { logoutUser } from './userSlice';

export const registerUserThunk = async (url, user, thunkAPI) => {
  try {
    const response = await customFetch.post(url, user);
    return response.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const loginUserThunk = async (url, user, thunkAPI) => {
  try {
    const response = await customFetch.post(url, user);
    return response.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateUserThunk = async (url, user, thunkAPI) => {
  try {
    const response = await customFetch.patch(url, user, {
      headers: {
        Authorization: `Bearer ${thunkAPI.getState().userState.user.token}`,
      },
    });
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
};
