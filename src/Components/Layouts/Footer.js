import React from 'react'
import logo from '../../../src/assets/images/logo1.png'
import {Link} from "react-router-dom";


class Footer extends React.Component{

    state = {
        isAnimationLoaded: false
    }

    componentDidMount = () =>{
    }

    render(){
        return (
            <>
                <div className="row mar-width-0 footer-wrap pt-4">
                    <div className="col-md-12 footer-wrap-inner">
                        <div className="row">
                            <div className="col-md-12">
                                <img src={logo} className="logo-browse-2" alt=""/>
                                <hr/>
                            </div>

                            <div className="col-md-3">
                                <ul>
                                    <li>
                                        <Link to="#">
                                            About us
                                        </Link>
                                        <Link to="#">
                                            Careers
                                        </Link>
                                        <Link to="#">
                                            Site map
                                        </Link>
                                        <Link to="#">
                                            Help
                                        </Link>
                                        <Link to="#">
                                            Contact us
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-3">
                                <ul>
                                    <li>
                                        <Link to="#">
                                            Compare rates
                                        </Link>
                                        <Link to="#">
                                            Latest news
                                        </Link>
                                        <Link to="#">
                                            Popular topics
                                        </Link>
                                        <Link to="#">
                                            Legal
                                        </Link>
                                        <Link to="#">
                                            Privacy policy
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-3">
                                <ul>
                                    <li>
                                        <Link to="/termOfUse">
                                            Terms of use
                                        </Link>
                                        <Link to="#">
                                            GLBA annual notice
                                        </Link>
                                        <Link to="#">
                                            Licenses
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="row mar-width-0 footer-bottom">
                    <p> Copyrights all reserved © Career Spaces 2021</p>
                </div>
            </>

        )
    }
}

export default Footer
