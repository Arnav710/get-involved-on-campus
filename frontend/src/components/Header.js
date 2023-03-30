import axios from 'axios';
import { Link } from 'react-router-dom';
import './../styles/Header.css'
import { useNavigate } from 'react-router-dom';


function Header() {

  const navigate = useNavigate();

  // Send a POST request to the logout route
  const handleLogout = () => {
    console.log("Logout call to backend")
    axios.post('http://localhost:4000/api/logout')
      .then(res => {
        // Remove the access token from localStorage
        localStorage.removeItem('accessToken');
        
        setTimeout(() => navigate('/'), 500);

        // Reload the page to log out the user
        // window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  }

  // Get the user information from localStorage
  const accessToken = localStorage.getItem("accessToken");

  // Check if the user is logged in
  if (accessToken) {
    // Get the user's name from the access token
    const decodedToken = JSON.parse(atob(accessToken.split('.')[1]));
    const username = decodedToken.username;

    // Display the greeting message
    return (
      <div className="header">
        <span className="header__username">Hi, {username}! </span>
        <button className="header__logout" onClick={handleLogout}>
          Logout
        </button>
      </div>

    );
  } else {
    return (
      <div>
        <p>Not logged in.</p>
        <Link to="/signup">Signup</Link>
      </div>
    );
  }
}

export default Header;
