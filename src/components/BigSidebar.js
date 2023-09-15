import { useSelector } from 'react-redux';
import Wrapper from '../assets/wrappers/BigSidebar';
import Logo from './Logo';
import NavLinks from './NavLinks';

const BigSidebar = () => {
  const { isSidebarOpen } = useSelector((store) => store.userState);

  return (
    <Wrapper>
      <div
        className={`sidebar-container  ${isSidebarOpen ? 'show-sidebar' : ''}`}
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;
