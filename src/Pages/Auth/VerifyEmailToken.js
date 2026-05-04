import React, { Component } from 'react'
import logo from '../../assets/images/logo1.png'
import { Link } from "react-router-dom";
import Axios from '../../Config/Axios';
import { authHeaders, toasterAlert as toastAlert, setSession, isAuthenticated, getToken } from "../../Helpers/Functions";
import Redirect from "../../Utils/history";
import GoogleLogin from 'react-google-login';
import userAuthenicated from '../../Services/auth.service'
import Gpic from "../../assets/images/gPic.png";
class VerifyEmailToken extends Component {
    state = {
        code: null,
        loading: false,
        errors: {
            codeerror: ''
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
        const { code } = this.state;
        let { codeError } = '';

        if (!code) {
            codeError = "Code is required";
        }

        this.setState({
            errors: {
                codeerror: codeError,
            }
        })
        if (codeError) {
            return true;
        }
        this.setState({ loading: true });
        let email = localStorage.getItem('forgetEmail');
        Axios.post(`/api/codeVerification`, { code, email }).then(response => {
            console.log(response);
            if (response.status === 200) {
                Redirect.push('/ResetPassword')
            }
        }).catch(error => {
            // console.log(error, 'error data')
            toastAlert('error', error.response.data.message)
            // toastAlert('error', 'Authentication Failed!')
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
                            <p className="font-family">We've sent a verification code to <strong>{localStorage.getItem('forgetEmail')}</strong>, please enter the code to continue </p>
                        </div>
                        <div className="row mar-width-0 form-bg">
                            <div className="col-md-12 form-wrap p-0">
                                <form className="w-100">
                                    <div className="form-group">
                                        <label htmlFor="verificationCode">Verification Code</label>
                                        <input type="text" name="code" onChange={this.onChangeState} value={this.state.code} className="form-control" id="verificationCode"
                                        />
                                        <span className="error">{this.state.errors.codeerror}</span>
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

export default VerifyEmailToken
