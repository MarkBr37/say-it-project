import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';

function NavBar(){
    return(
        <Navbar bg="dark" variant="dark" expand="md">
            <Container>
                <NavLink className="navbar-brand" to="/">Say it</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">

                <Nav className="me-auto">

                    <NavLink className='nav-link' to="/">Home</NavLink>
                    <NavLink className='nav-link' to="/about">About</NavLink>

                </Nav>
                <Nav className='flota-end'>
                    <NavLink className="nav-link" to="/signin">Signin</NavLink>
                    <NavLink className="nav-link" to="/signup">Signup</NavLink>

                 {/*  <NavDropdown title="userName" id="basic-nav-dropdown float-start">
                    <NavLink data-rr-ui-dropdown-item 
                    className='dropdown-item' to="/profile">Profile</NavLink>
                    <NavLink data-rr-ui-dropdown-item 
                    className='dropdown-item' to="/profile">Logout</NavLink>
            
                  </NavDropdown> */}
                </Nav>
              </Navbar.Collapse>
            </Container>
        </Navbar>
    )
};

export default NavBar;

/* 
    <NavLink className='nav-link' to="/">Home</NavLink>
    <NavLink className='nav-link' to="/about">About</NavLink>

    <NavLink className="nav-link float-md-end" to="/signin">Signin</NavLink>
    <NavLink className="nav-link float-md-end" to="/signup">Signup</NavLink>

    <Navbar bg="dark" variant="dark">
        <Container>
            <NavLink className="navbar-brand" to="/">Navbar</NavLink>
            <Nav className="me-auto">
              
            </Nav>
        </Container>
    </Navbar>
*/