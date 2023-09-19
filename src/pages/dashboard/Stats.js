import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showStats } from '../../features/allJobs/allJobsSlice';
import { ChartsContainer, StatsContainer, Loading } from '../../components';

const Stats = () => {
  const dispatch = useDispatch();
  const { monthlyApplications, isLoading } = useSelector(
    (store) => store.allJobsState
  );

  useEffect(() => {
    dispatch(showStats());
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};

export default Stats;
