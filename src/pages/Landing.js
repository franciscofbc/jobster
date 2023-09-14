import { Link } from 'react-router-dom';
import mainImg from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { Logo } from '../components';

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident
            nam, totam voluptatum excepturi maxime, doloribus quidem aperiam
            veritatis veniam recusandae ab odit perspiciatis obcaecati pariatur,
            perferendis fugit cumque voluptas ex.
          </p>
          <Link to="/register" className="btn btn-hero">
            login / register
          </Link>
        </div>
        <img src={mainImg} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
