import React, { Component } from 'react'
import logo from '../../assets/images/logo1.png'
import { Link } from "react-router-dom";
import Axios from '../../Config/Axios';
import { authHeaders, toasterAlert as toastAlert, setSession, isAuthenticated, getToken, toasterAlert, destroySession } from "../../Helpers/Functions";
import Redirect from "../../Utils/history";
import GoogleLogin from 'react-google-login';
import userAuthenicated from '../../Services/auth.service'
import Gpic from "../../assets/images/gPic.png";
import { connect } from "react-redux";
import addEmailVerify from "../../app/Actions"
import store from "../../app/store"
import axios from 'axios';
import ApiRequest from '../../Services/ApiRequest';
import Loading from '../../Utils/Loading';
import { ToastContainer, toast, Slide } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function mapDispatchToProps(dispatch) {
    return {
        addEmailVerify: detail => dispatch(addEmailVerify(detail))
    };
}
const mapStateToProps = state => {
    return {
        emailVerify: state.emailVerify,
        user: state.user
    };
};

class EmailVerifyPage extends Component {
    state = {
        token: null, loading: false, errors: {
            email: ''
        },
        loading: false
    };

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = getToken()
    }
    onChangeState = (event) => {
        const { name, value } = event.target;
        console.log(name, value)
        this.setState({ [name]: value })
        console.log('name', this.state.token);

    }
    login = () => {
        const { token } = this.state;
        let email = localStorage.getItem('RegisterEmail');
        console.log(email);
        let { codeError } = '';

        if (!token) {
            codeError = "This field is required";
        }

        this.setState({
            errors: {
                email: codeError,
            }
        })
        if (codeError) {
            return true;
        }
        this.setState({ loading: true });
        // let email = localStorage.getItem('forgetEmail');

        Axios.post(`/api/emailVerification`, { token, email }).then(response => {
            console.log('emailVerification ' + response);
            if (response.status === 200) {
                userAuthenicated.userAuthResponseHandler(response);
            }
            // Authenticated Service
            // console.log('getToken......' + response);
        }).catch(error => {
            console.log(error, 'error data')
            // if(!error.response.data.errors?.outcome_id )

            toastAlert('error', 'Authentication Failed!')
            //
            // return error.response
        }).finally(() => {
            this.setState({ loading: false });
        });

        // Axios.post('https://reqres.in/api/articles', {email,password} )
        //     .then(response => console.log(response));
    }
    resendCode = async() => {
        // this.setState({
        //     loading:true
        // })
        let email = localStorage.getItem('RegisterEmail');
        const response = await ApiRequest.postRequest('/email/verify/resend')
        console.log(response);
        if( response && response.status === 200){
            // this.setState({
            //     loading:false
            // })
            toasterAlert('success', response.data.message)
        }else{
            toasterAlert('error', 'Something went wrong please try again')
            setTimeout(
                ()=> destroySession(),
                3000
            );
        }
    }
    render() {
        if (this.state.loading) {
            return <Loading />
        }
        return (
            <>
                
                <div className="container-fluid login-wrapper">
                    <div className="row mar-width-0 width-wrap">
                        <div className="col-md-12 text-center pt-2">
                            <Link to="/"> <img src={logo} alt="" /></Link>
                        </div>
                        <div className="col-md-12 login-heading">
                            <p className="font-family">Make the most of your professional life</p>
                        </div>

                        <div className="row mar-width-0 form-bg">
                            <div className="col-md-12 p-0">
                                <h3 className="font-family lo-title">Confirm Your Email Address</h3>
                                <p>We have sent an email with a confirmation link to your email address. In order to complete the sign-up process, please click the confirmation link.</p><br />
                                <p>If you do not receive a confirmation email, please check your spam folder. Also, please verify that you entered a valid email address in our sign-up form.</p>

                                <span type="button" className="btn float-end" onClick={() => this.resendCode()}>Resend Email Confirmation?</span>

                            </div>
                            {/* <div className="col-md-12 form-wrap p-0">
                                <form className="w-100">
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Please Enter Your Code</label>
                                        <input type="number" name="token" onChange={this.onChangeState} className="form-control" id="exampleInputEmail1"
                                        />
                                        <span className="error">{this.state.errors.email}</span>
                                    </div>
                                    <span type="button" className="btn float-end" onClick={()=>this.resendCode()}>Resend Code?</span>
                                    <button type="button" disabled={this.state.loading} onClick={this.login} className="btn btn-primary btnLogin">Verify</button>
                                </form>
                            </div> */}
                            {/* <div className="col-md-12 or-wrap">
                                <h2 className="h2_2"><span>or</span></h2>
                            </div>
                            <div className="col-md-12">
                                <GoogleLogin
                                    clientId="340365300393-1ma31t11b7akqn61tsbpt8h0g9e134a7.apps.googleusercontent.com"
                                    render={renderProps => (
                                        <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="btn btn-primary btnGoogle"><img className="gpic" src={Gpic} alt="" /> Login with Google</button>
                                    )}
                                    buttonText="Login"
                                    buttonText="Login"
                                    onSuccess={this.responseGoogle}
                                    onFailure={this.responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                />

                            </div> */}
                            <div className="col-md-12 bottom-wrap2">
                                <span>Don't have an account yet?</span> &nbsp;
                                <Link to="/signup" className="">Sign Up</Link>

                            </div>
                        </div>



                    </div>
                </div>
            </>
        )
    }
}

const EmailVerify = connect(
    mapStateToProps,
    mapDispatchToProps
)(EmailVerifyPage);

export default EmailVerify
