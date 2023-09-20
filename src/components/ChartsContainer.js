import BarChartContainer from './BarChartContainer';
import AreaChartComponent from './AreaChartComponent';
import { useSelector } from 'react-redux';
import Wrapper from '../assets/wrappers/ChartsContainer';
import { useState } from 'react';

const ChartsContainer = () => {
  const { monthlyApplications: data } = useSelector(
    (store) => store.allJobsState
  );
  const [barChart, setBarChart] = useState(true);

  return (
    <Wrapper>
      <h4>monthly applications</h4>
      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? 'area chart' : 'bar chart'}
      </button>
      {barChart ? (
        <BarChartContainer data={data} />
      ) : (
        <AreaChartComponent data={data} />
      )}
    </Wrapper>
  );
};

export default ChartsContainer;
