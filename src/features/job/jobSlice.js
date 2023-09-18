import { createSlice } from '@reduxjs/toolkit';

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

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    handleChangeReducer: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    clearValues: () => {
      return initialState;
    },
  },
});

export const { handleChangeReducer, clearValues } = jobSlice.actions;
export default jobSlice.reducer;
