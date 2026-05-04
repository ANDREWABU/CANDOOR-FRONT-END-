import React from 'react';
import { Link } from "react-router-dom";
import Message from "../../../assets/images/DashboardImgs/message-circle.png";
import Users from "../../../assets/images/DashboardImgs/users.png";
import Rectangle from "../../../assets/images/DashboardImgs/Rectangle.png";
import DLogo from "../../../assets/images/DashboardImgs/dashboard-logo.png"
import logo from '../../../assets/images/AuthImages/logo-new.png'
import history from '../../../Utils/history';
import "./header.css";



class Header extends React.Component {
    state = {
        headerLayout: []
    }
    componentDidMount() {
        const pathName = history.location.pathname;
        if (pathName === '/login') {
            this.setState({
                headerLayout: this.loginLink()
            })
        } else if (pathName === '/signup') {
            this.setState({
                headerLayout: this.SignupLink()
            })
        } else if (pathName === '/signupMentor') {
            this.setState({
                headerLayout: this.mentorSignupLink()
            })
        }
    }

    loginLink() {
        return (

            <>
                <li className="nav-item dropdown user-dropdown d-inline-block">
                    <Link to="/signup" className="nav-link nav-bell-icon">
                        Signup
                    </Link>
                </li>
                <li className="nav-item dropdown user-dropdown d-inline-block">
                    <Link to="/signupMentor" className="nav-link nav-bell-icon">
                        Become a mentor?
                    </Link>
                </li>
            </>
        );
    }
    SignupLink() {
        return (
            <>
                <li className="nav-item dropdown user-dropdown d-inline-block">
                    <Link to="/login" className="nav-link nav-bell-icon">
                        Login
                    </Link>
                </li>
                <li className="nav-item dropdown user-dropdown d-inline-block">

                    <Link to="/signupMentor" className="nav-link nav-bell-icon">
                        Become a mentor?
                    </Link>
                </li>
            </>
        );
    }
    mentorSignupLink() {
        return (
            <>
                <li className="nav-item dropdown user-dropdown d-inline-block">
                    <Link to="/login" className="nav-link nav-bell-icon">
                        Login
                    </Link>
                </li>
                <li className="nav-item dropdown user-dropdown d-inline-block">

                    <Link to="/signup" className="nav-link nav-bell-icon">
                        Signup
                    </Link>
                </li>
            </>
        );
    }

    logout() {
        // destroySession();
    }
    render() {
        return (
            <header className='dashboard-toolbar auth-header'>
                <div className="row mar-width-0">
                    <div className="col-md-6 align-self-center">
                        <Link to="/" className="brand-logo">
                            <img src={logo} className="d-logo" alt="" />
                        </Link>
                    </div>
                    <div className="col-md-6 text-right p-2">
                        <ul className="ms-auto mb-0">
                            <li className="nav-item dropdown user-dropdown d-inline-block">
                                <a href="https://candoor.io/about" className="nav-link nav-bell-icon">
                                    About
                                </a>
                            </li>
                            <li className="nav-item dropdown user-dropdown d-inline-block">
                                <a  href="https://candoor.io/partner" className="nav-link nav-bell-icon">
                                    Partners
                                </a>
                            </li>

                        </ul>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;

