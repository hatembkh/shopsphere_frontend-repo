
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { current, logout } from '../Redux/Actions/authActions';
import { useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { Person, Gear, BoxArrowRight, ChevronDown } from 'react-bootstrap-icons';

const NavAuth = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(current())
    }, [dispatch])
    const token = localStorage.getItem('token');
    const user = useSelector(state => state.AuthReducer.user);

    const navigate = useNavigate();

    return (
        <div>
            {/* Top Announcement Bar (like END's) */}
            <div style={{
                backgroundColor: '#000',
                color: '#fff',
                fontSize: '0.8rem',
                padding: '8px 0',
                textAlign: 'center',
                borderBottom: '1px solid #222'
            }}>
                FREE SHIPPING ON ORDERS OVER $200
            </div>

            {/* Main Navbar */}
            <Navbar expand="lg" style={{
                backgroundColor: '#fff',
                borderBottom: '1px solid #eee',
                padding: '15px 0'
            }}>
                <Container >
                    <Navbar.Brand
                        as={Link}
                        to="/"
                        // className="me-5"
                        style={{ display: 'flex', alignItems: 'center', marginRight: '80px' }}>
                        <img
                            src="/logos/profile.png"
                            alt="Shop Sphere Logo"
                            style={{
                                height: '40px',           // Keeps navbar height consistent
                                transform: 'scale(1.4)',  // Scales the logo without affecting layout
                                transformOrigin: 'left center',
                                imageRendering: 'auto' 
                            }}
                        />
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto" style={{ gap: '25px' }}>
                            <Nav.Link
                                as={Link}
                                to="/"
                                style={{
                                    color: '#000',
                                    fontWeight: '500',
                                    textTransform: 'uppercase',
                                    fontSize: '0.85rem',
                                    letterSpacing: '1px'
                                }}
                            >
                                Home
                            </Nav.Link>

                            {user && token ? (
                                <>
                                    <Nav.Link
                                        as={Link}
                                        to="/ListProduct"
                                        style={{
                                            color: '#000',
                                            fontWeight: '500',
                                            textTransform: 'uppercase',
                                            fontSize: '0.85rem',
                                            letterSpacing: '1px'
                                        }}
                                    >
                                        Shop
                                    </Nav.Link>
                                    {user.role === 'admin' && (
                                        <>
                                            <Nav.Link
                                                as={Link}
                                                to="/Users"
                                                style={{
                                                    color: '#000',
                                                    fontWeight: '500',
                                                    textTransform: 'uppercase',
                                                    fontSize: '0.85rem',
                                                    letterSpacing: '1px'
                                                }}
                                            >
                                                Users
                                            </Nav.Link>
                                            <Nav.Link
                                                as={Link}
                                                to="/ListCommandes"
                                                style={{
                                                    color: '#000',
                                                    fontWeight: '500',
                                                    textTransform: 'uppercase',
                                                    fontSize: '0.85rem',
                                                    letterSpacing: '1px'
                                                }}
                                            >
                                                Orders
                                            </Nav.Link>
                                        </>
                                    )}
                                </>
                            ) : null}
                        </Nav>

                        <Nav style={{ gap: '25px', alignItems: 'center' }}>
                            {user && token ? (
                                <Dropdown align="end">
                                    <Dropdown.Toggle
                                        variant="link"
                                        id="dropdown-basic"
                                        style={{
                                            color: '#000',
                                            textDecoration: 'none',
                                            display: 'flex',
                                            alignItems: 'center',
                                            padding: '0'
                                        }}
                                    >
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px'
                                        }}>
                                            {user.image &&
                                                <img
                                                    src={`/${user.image.filename}` || '/userDefaultImage.png'}
                                                    alt="Profile"
                                                    style={{
                                                        width: '28px',
                                                        height: '28px',
                                                        borderRadius: '50%',
                                                        objectFit: 'cover'
                                                    }}
                                                />
                                            }
                                            <span style={{
                                                fontSize: '0.85rem',
                                                fontWeight: '500',
                                                textTransform: 'uppercase'
                                            }}>
                                                {user.name}
                                            </span>
                                            <ChevronDown size={12} />
                                        </div>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu style={{
                                        border: 'none',
                                        borderRadius: '0',
                                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                                        padding: '10px 0',
                                        minWidth: '200px'
                                    }}>
                                        <Dropdown.Item
                                            as={Link}
                                            to="/Profil"
                                            style={{
                                                padding: '8px 20px',
                                                fontSize: '0.85rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px'
                                            }}
                                        >
                                            <Person size={14} />
                                            My Profile
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            as={Link}
                                            to="/EditUser"
                                            style={{
                                                padding: '8px 20px',
                                                fontSize: '0.85rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px'
                                            }}
                                        >
                                            <Gear size={14} />
                                            Account Settings
                                        </Dropdown.Item>
                                        <Dropdown.Divider style={{ margin: '5px 0' }} />
                                        <Dropdown.Item
                                            onClick={() => { dispatch(logout()); navigate('/'); }}
                                            style={{
                                                padding: '8px 20px',
                                                fontSize: '0.85rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px'
                                            }}
                                        >
                                            <BoxArrowRight size={14} />
                                            Sign Out
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            ) : (
                                <>
                                    <Nav.Link
                                        as={Link}
                                        to="/Register"
                                        style={{
                                            color: '#000',
                                            fontWeight: '500',
                                            textTransform: 'uppercase',
                                            fontSize: '0.85rem',
                                            letterSpacing: '1px'
                                        }}
                                    >
                                        Register
                                    </Nav.Link>
                                    <Nav.Link
                                        as={Link}
                                        to="/Login"
                                        style={{
                                            color: '#000',
                                            fontWeight: '500',
                                            textTransform: 'uppercase',
                                            fontSize: '0.85rem',
                                            letterSpacing: '1px'
                                        }}
                                    >
                                        Login
                                    </Nav.Link>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default NavAuth;