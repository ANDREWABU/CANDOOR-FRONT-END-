import React, { Component } from 'react'
import logo from '../../assets/images/logo1.png'
import { Link } from "react-router-dom";
import Axios from '../../Config/Axios';
import { authHeaders, toasterAlert as toastAlert, setSession, isAuthenticated, getToken } from "../../Helpers/Functions";
import Redirect from "../../Utils/history";
import GoogleLogin from 'react-google-login';
import userAuthenicated from '../../Services/auth.service'
import Gpic from "../../assets/images/gPic.png";
class ResetPassword extends Component {
    state = {
        password: '', password_confirmation: '', loading: false, errors: {
            passwordError: '',
            passwordConfirmationError: ''
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


    ResetPassword = () => {
        const { password, password_confirmation } = this.state;
        let { passwordError, passwordConfirmationError } = '';

        if (!password) {
            passwordError = "Password is required";
        }

        if (!password_confirmation) {
            passwordConfirmationError = "Password confirmation is required";
        } else if (password != password_confirmation) {
            passwordConfirmationError = "Passwords do not match, please try again";
        }

        this.setState({
            errors: {
                passwordError: passwordError,
                passwordConfirmationError: passwordConfirmationError,
            }
        })
        if (passwordError || passwordConfirmationError) {
            return true;
        }
        this.setState({ loading: true });
        let email = localStorage.getItem('forgetEmail');
        let access_token = localStorage.getItem('resetAccessToken');
        console.log(access_token);
        Axios.post(`/api/updatePassword`, { password, password_confirmation, email, access_token }).then(response => {
            console.log(response);
            if (response.status === 200) {
                toastAlert('success', 'Your password has been successfully reset. Log in using your new password.')
                Redirect.push('/login');
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
                        <div className="row mar-width-0 form-bg">
                            <div className="col-md-12 p-0">
                                <h3 className="font-family lo-title">Reset Password</h3>
                            </div>
                            <div className="col-md-12 form-wrap p-0">
                                <form className="w-100">
                                    <div className="form-group">
                                        <label htmlFor="newpassword">Please Enter New Password</label>
                                        <input type="password" name="password" onChange={this.onChangeState} value={this.state.email} className="form-control" id="newpassword"
                                        />
                                        <span className="error">{this.state.errors.passwordError}</span>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="reenterpassword">Re-Enter New Password</label>
                                        <input type="password" name="password_confirmation" onChange={this.onChangeState} value={this.state.email} className="form-control" id="reenterpassword"
                                        />
                                        <span className="error">{this.state.errors.passwordConfirmationError}</span>
                                    </div>
                                    <button type="button" disabled={this.state.loading} onClick={this.ResetPassword} className="btn btn-primary btnLogin">Reset Password</button>
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

export default ResetPassword
