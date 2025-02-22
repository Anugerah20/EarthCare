import { Link, NavLink, useNavigate } from "react-router-dom"
import "../css/navbar.css"
import { Dropdown } from "bootstrap"
import logoNav from "../assets/logo-nav.png"
import { FaUser } from "react-icons/fa"
import { useContext, useEffect, useState } from "react"
import { LoginContext } from "../context/LoginProvider"
import { UserContext } from "../context/UserProvider"

export const Navbar = () => {
    const {isLogin, setIsLogin} = useContext(LoginContext)
    const {user, setUser} = useContext(UserContext)
    const navigation = useNavigate()
    // const [isLogin, setIsLogin] = useState(false)
    // const [user, setUser] = useState({
    //     fullName: "",
    //     email: "",
    //     id: "",
    // })
    useEffect(() => {
        setIsLogin(sessionStorage.getItem("MyToken") !== null);
        // setUser(JSON.parse(localStorage.getItem("user")||"{'fullname':'','email':'','id':''}"))
        // console.log(user);
        // setIsLogin(localStorage.getItem("MyToken") != "")
        setUser(JSON.parse(sessionStorage.getItem("user") || '{"fullname":"","email":"","id":""}'));
    },[]) 

    const userLogout = () => {
        setUser({
            fullName: '',
            email: '',
            id: '',
        })
        setIsLogin(false)
        sessionStorage.clear()
        navigation("/")
    }

    return (
        <>
            <header>
                <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark" data-bs-theme="dark">
                    <div className="container">
                        <NavLink className="navbar-brand text-white" to="/">
                            <img src={logoNav} className="logo-nav" alt="logo navbar" height="50" />
                            &nbsp;EarthCare
                        </NavLink>
                        <button 
                            className="navbar-toggler" 
                            type="button" 
                            data-bs-toggle="collapse" 
                            data-bs-target="#navbarTogglerDemo02"
                            aria-controls="navbarTogglerDemo02" 
                            aria-expanded="false" 
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-lg-center text-center">
                                <li className="nav-item">
                                    <NavLink className="nav-link" aria-current="page" to="/" activeclassname="active">Home</NavLink>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        Content
                                    </a>
                                    <ul className="dropdown-menu animate slideIn dropdown-menu-dark">
                                        <li>
                                            <Link className="dropdown-item" to="/event">Event</Link>
                                        </li>
                                        <li>
                                            <hr className="dropdown-divider" style={{backgroundColor: "white"}} />
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="/article">Article</Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" aria-current="page" to="/about" activeclassname="active">About</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/contact" activeclassname="active">Contact Us</NavLink>
                                </li>
                                {isLogin ? (
                                    <li className="nav-item dropdown profile-btn">
                                        <Link 
                                            className="nav-link dropdown-toggle d-flex align-items-center justify-content-center" 
                                            href="#"
                                            role="button" 
                                            data-bs-toggle="dropdown" 
                                            aria-expanded="false"
                                        >
                                            <div id="user-profile" className="rounded-pill me-2">
                                                <FaUser className="fa-solid fa-user" style={{color: "#ffffff"}} />
                                            </div>
                                            <div className="my-auto text-white" id="profileUserNavbar">
                                                {user.fullName}
                                            </div>
                                        </Link>
                                        <ul className="dropdown-menu animate slideIn dropdown-menu-dark ms-lg-5 mx-5">
                                            <li>
                                                <button 
                                                    className="dropdown-item text-white text-lg-start text-center btn-showname"
                                                    disabled
                                                >
                                                    Hai, <span className="text-wrap">{user.fullName}</span>
                                                </button>
                                            </li>
                                            <li>
                                                <hr className="dropdown-divider divider-profile" style={{backgroundColor: "white"}} />
                                            </li>
                                            <li>
                                                <div className="container container-logout">
                                                    <button 
                                                        className="btn btn-danger btn-logout text-center" 
                                                        id="logout"  
                                                        onClick={() => userLogout()}
                                                    >
                                                        Logout
                                                    </button>
                                                </div>
                                            </li>
                                        </ul>
                                    </li>
                                ) : (
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/login">
                                            <button className="btn btn-primary px-3 border-0" type="submit">Login</button>
                                        </NavLink>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}