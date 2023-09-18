import { useDispatch, useSelector } from 'react-redux';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { toast } from 'react-toastify';
import { FormRow, FormRowSelect } from '../../components';
import { clearValues, handleChangeReducer } from '../../features/job/jobSlice';

const AddJob = () => {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    isEditing,
    editJobId,
  } = useSelector((store) => store.jobState);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!position || !company || jobLocation) {
      toast.error('please fill out all fields');
      return;
    }
    return;
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChangeReducer({ name, value }));
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? 'edit job' : 'add job'}</h3>
        <div className="form-center">
          {/* position */}
          <FormRow
            type="text"
            name="position"
            value={position}
            handleChange={handleChange}
          />
          {/* company */}
          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleChange}
          />
          {/* jobLocation */}
          <FormRow
            type="text"
            name="jobLocation"
            value={jobLocation}
            labelText="job location"
            handleChange={handleChange}
          />
          {/* status */}
          <FormRowSelect
            name="status"
            value={status}
            handleChange={handleChange}
            list={statusOptions}
          />
          {/* jobType */}
          <FormRowSelect
            name="jobType"
            value={jobType}
            labelText="job type"
            handleChange={handleChange}
            list={jobTypeOptions}
          />
          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={() => dispatch(clearValues())}
            >
              clear
            </button>
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? 'please wait...' : 'submit'}
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
