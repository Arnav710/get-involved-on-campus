import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  return (
    <div className="Home">
      <header className="Home-header">
        <h1>Get Involved @ UCSD</h1>
        <p>UC San Diego has 500+ student organizations to offer, and sometimes it can get difficult to find the ones you are interested in. This platform aims to help current Tritons and incoming student look for student organizations that align with their likings. In addition to viewing organizations, you can also upvote them and leave comments about your experience to help other people who are considering joining the organization.</p>
        <Link to="/signup"><button className='button-home'>Sign Up</button></Link>
        <Link to="/login"><button className='button-home'> Login</button></Link>
      </header>
    </div>
  );
}

export default Home;
