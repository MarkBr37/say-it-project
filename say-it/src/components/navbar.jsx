import {Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import {logout} from '../services/userServices';

function NavBar({user}){
    

    return(
        <Navbar bg="dark" variant="dark" expand="md">
            <Container>
                <NavLink className="navbar-brand" to="/home">Say it</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">

                <Nav className="me-auto">

                    <NavLink className='nav-link' to="/home">Home</NavLink>
                    {user && <NavLink className='nav-link' to="/myposts">My Posts</NavLink>}
                    <NavLink className='nav-link' to="/about">About</NavLink>

                </Nav>
                <Nav className='flota-end'>
                    {!user && 
                    <>
                        <NavLink className="nav-link" to="/signin">Signin</NavLink>
                        <NavLink className="nav-link" to="/signup">Signup</NavLink>
                    </>
                    }
                    {user &&
                    <NavDropdown title={user.name} id="basic-nav-dropdown float-start">
                        <Button data-rr-ui-dropdown-item onClick={logout}
                        className='dropdown-item' >Logout</Button>
                    </NavDropdown> 
                    }
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