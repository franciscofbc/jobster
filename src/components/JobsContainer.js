import { useSelector, useDispatch } from 'react-redux';
import Wrapper from '../assets/wrappers/JobsContainer';
import Job from './Job';
import Loading from './Loading';
import { useEffect } from 'react';
import { getAllJobs } from '../features/allJobs/allJobsSlice';
import PageBtnContainer from './PageBtnContainer';

const JobsContainer = () => {
  const {
    jobs,
    isLoading,
    totalJobs,
    numOfPages,
    page,
    search,
    searchStatus,
    searchType,
    sort,
  } = useSelector((store) => store.allJobsState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllJobs());
  }, [search, searchStatus, searchType, sort, page]);

  if (isLoading) {
    return (
      <Wrapper>
        <Loading />
      </Wrapper>
    );
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>no jobs to display</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} job{totalJobs > 1 && 's'} found
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default JobsContainer;
