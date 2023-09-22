import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { useDispatch, useSelector } from 'react-redux';
import { changePage } from '../features/allJobs/allJobsSlice';

const PageBtnContainer = () => {
  const { numOfPages, page } = useSelector((store) => store.allJobsState);
  const dispatch = useDispatch();

  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });

  const nextPage = () => {
    let pageNumber = page + 1;
    if (pageNumber > numOfPages) {
      pageNumber = 1;
    }
    dispatch(changePage({ pageNumber }));
  };

  const prevPage = () => {
    let pageNumber = page - 1;
    if (pageNumber < 1) {
      pageNumber = numOfPages;
    }
    dispatch(changePage({ pageNumber }));
  };

  return (
    <Wrapper>
      <button type="button" className="prev-btn" onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>
      {/* pagination */}
      <div className="btn-container">
        {pages.map((pageNumber) => {
          return (
            <button
              type="button"
              key={pageNumber}
              onClick={() => dispatch(changePage({ pageNumber }))}
              className={`pageBtn ${page === pageNumber ? 'active' : ''}`}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button type="button" className="next-btn" onClick={nextPage}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};
export default PageBtnContainer;
