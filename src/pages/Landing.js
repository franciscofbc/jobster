import logoImg from '../assets/images/logo.svg';
import mainImg from '../assets/images/main.svg';

const Landing = () => {
  return (
    <main>
      <nav>
        <img src={logoImg} alt="jobster logo" className="logo" />
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
          <button className="btn btn-hero">login / register</button>
        </div>
        <img src={mainImg} alt="job hunt" className="img main-img" />
      </div>
    </main>
  );
};

export default Landing;
