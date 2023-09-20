import { useDispatch, useSelector } from 'react-redux';
import Wrapper from '../assets/wrappers/SearchContainer';
import FormRow from './FormRow';
import FormRowSelect from './FormRowSelect';
import { clearFilters, handleChange } from '../features/allJobs/allJobsSlice';
import { useMemo, useState } from 'react';

const SearchContainer = () => {
  const { isLoading, search, searchStatus, searchType, sort, sortOptions } =
    useSelector((store) => store.allJobsState);
  const { statusOptions, jobTypeOptions } = useSelector(
    (store) => store.jobState
  );
  const dispatch = useDispatch();
  const [localSearch, setLocalSearch] = useState('');

  const handleSearch = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalSearch('');
    dispatch(clearFilters());
  };

  const debounce = () => {
    console.log('debounce');
    let timeoutId;
    return (e) => {
      setLocalSearch(e.target.value);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        console.log('timeout');
        const name = e.target.name;
        const value = e.target.value;
        dispatch(handleChange({ name, value }));
      }, 1000);
    };
  };

  const memoDebounce = useMemo(() => debounce(), []);

  return (
    <Wrapper>
      <form className="form">
        <h4>search</h4>
        <div className="form-center">
          {/* search type*/}
          <FormRow
            type="text"
            name="search"
            value={localSearch}
            handleChange={memoDebounce}
          />
          {/* search by status */}
          <FormRowSelect
            name="searchStatus"
            value={searchStatus}
            labelText="status"
            handleChange={handleSearch}
            list={['all', ...statusOptions]}
          />
          {/* search by type */}
          <FormRowSelect
            name="searchType"
            value={searchType}
            labelText="type"
            handleChange={handleSearch}
            list={['all', ...jobTypeOptions]}
          />
          {/* sort */}
          <FormRowSelect
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          <button
            type="submit"
            className="btn btn-block btn-danger"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default SearchContainer;
