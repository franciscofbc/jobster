import { useDispatch, useSelector } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/SmallSidebar';
import Logo from './Logo';
import NavLinks from './NavLinks';
import { toggleSidebar } from '../features/user/userSlice';

const SmallSidebar = () => {
  const dispatch = useDispatch();
  const { isSidebarOpen } = useSelector((store) => store.userState);

  const toggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    <Wrapper>
      <div
        className={`sidebar-container ${isSidebarOpen ? 'show-sidebar' : ''}`}
      >
        <div className="content">
          <button type="button" className="close-btn" onClick={toggle}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks toggle={toggle} />
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
