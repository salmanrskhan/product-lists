import Container from 'react-bootstrap/Container';
import { Nav, NavDropdown } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo from '../src/assets/logo.png'

function Header() {
  const userName = localStorage.getItem('user-name'); // Retrieve the user's name

  const navigate = useNavigate();

  function logout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">
          <img src={logo} alt="" />
          </Navbar.Brand>
          <Nav className="mx-auto navbar_wrapper">
            {userName ? (
              <>
                <Link to="/">Product List</Link>
                <Link to="/add">Add Product</Link>
                {/* <Link to="/update">Update Product</Link> */}
                <Link to="/search">Search Product</Link>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}
          </Nav>
          {userName ? (
            <Nav>
              <NavDropdown title={userName}>
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : null}
        </Container>
      </Navbar>
    </div>
  )
}

export default Header;