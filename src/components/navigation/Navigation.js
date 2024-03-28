import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";

function Navigation() {
    return (
        <div>
            <Navbar fixed="top" bg="primary" expand="md" data-bs-theme="dark">
                <Navbar.Brand as={Link} to="/" exact>
                    <h1 className="ms-4 mb-0">MyCity</h1>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="me-4" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-4">
                        <Nav.Link as={Link} to="/reportplace">
                            Report a place
                        </Nav.Link>
                        <Nav.Link as={Link} to="/about">
                            About
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};
/* Basic Bootstrap
<nav className="navbar fixed-top navbar-expand-sm navbar-dark bg-primary">
            <div className="container-fluid">
                <a className="navbar-brand"><NavLink exact className="current" to='/'>MyCity</NavLink></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a className="nav-link"><NavLink exact className="current" to='/about'>About</NavLink></a>
                        <a className="nav-link"><NavLink exact className="current" to='/contact'>Contact</NavLink></a>
                    </div>
                </div>
            </div>
        </nav>
*/


/*
return (
        <nav className="navbar fixed-top navbar-expand-sm navbar-dark bg-primary">
            <ul>
                <li><NavLink exact className="current" to='/'>Home</NavLink></li>
                <li><NavLink exact className="current" to='/about'>About</NavLink></li>
                <li><NavLink exact className="current" to='/contact'>Contact</NavLink></li>
            </ul>
        </nav>
    );
*/

export default Navigation;


