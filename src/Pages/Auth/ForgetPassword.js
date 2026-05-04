import React, { Component } from 'react'
import logo from '../../assets/images/logo1.png'
import { Link } from "react-router-dom";
import Axios from '../../Config/Axios';
import { authHeaders, toasterAlert as toastAlert, setSession, isAuthenticated, getToken } from "../../Helpers/Functions";
import Redirect from "../../Utils/history";
import GoogleLogin from 'react-google-login';
import userAuthenicated from '../../Services/auth.service'
import Gpic from "../../assets/images/gPic.png";
class ForgetPassword extends Component {
    state = {
        email: '', loading: false, errors: {
            email: ''
        }
    };

    componentDidMount() {
        if (isAuthenticated()) {
            window.location.href = `/`;
        }
    }
    onChangeState = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value })
    }

    OnSendCodeClicked = () => {
        const { email } = this.state;
        let { emailError } = '';

        if (!email) {
            emailError = "Email is required";
        }

        this.setState({
            errors: {
                email: emailError,
            }
        })
        if (emailError) {
            return true;
        }
        this.setState({ loading: true });
        Axios.post(`/api/forgetPassword`, { email }).
            then(response => {
                console.log(response);
                if (response.status === 200) {
                    localStorage.setItem('forgetEmail', email);
                    console.log('response.data.accessToken ' + response.data.accessToken)
                    localStorage.setItem('resetAccessToken', response.data.accessToken);
                    console.log(response.data);
                    Redirect.push('/VerifyToken');
                }
            }).catch(error => {
                toastAlert('error', error.response.data.message)
            }).finally(() => {
                this.setState({ loading: false });
            });
    }
    render() {
        return (
            <>
                <div className="container-fluid login-wrapper">
                    <div className="row mar-width-0 width-wrap">
                        <div className="col-md-12 text-center pt-2">
                            <Link to="/"> <img src={logo} alt="" /></Link>
                        </div>
                        <div className="col-md-12 login-heading">
                        </div>

                        <div className="row mar-width-0 form-bg">
                            <div className="col-md-12 p-0">
                                <h3 className="font-family lo-title">Forgot Password?</h3>
                                <p>No worries, please enter the email you used to sign up for Candoor.</p>
                            </div>
                            <div className="col-md-12 form-wrap p-0">
                                <form className="w-100">
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Please Enter Your Email</label>
                                        <input type="email" name="email" onChange={this.onChangeState} value={this.state.email} className="form-control" id="exampleInputEmail1"
                                        />
                                        <span className="error">{this.state.errors.email}</span>
                                    </div>
                                    <button type="button" disabled={this.state.loading} onClick={this.OnSendCodeClicked} className="btn btn-primary btnLogin">Send Code</button>
                                </form>
                            </div>
                            <div className="col-md-12 bottom-wrap2">
                                <span>Don't have an account yet? <br></br> Sign Up as an <Link to="/advisee/signupwizard/createAccount" className="">Advisee</Link> or an  <Link to="/advisor/signupwizard/createAccount" className="">Advisor</Link>.</span> &nbsp;
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default ForgetPassword
