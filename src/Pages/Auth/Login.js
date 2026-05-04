import React, { Component } from "react";
import logo from "../../assets/images/logo1.png";
import { Link } from "react-router-dom";
import Axios from "../../Config/Axios";
import {
  authHeaders,
  toasterAlert as toastAlert,
  setSession,
  isAuthenticated,
  getToken,
  destroySession,
} from "../../Helpers/Functions";
import Redirect from "../../Utils/history";
import GoogleLogin from "react-google-login";
import userAuthenicated from "../../Services/auth.service";
import Gpic from "../../assets/images/WizardImages/linkdin.png";
import logoBg from "../../assets/images/AuthImages/Login-bg.png";
import logoMArk from "../../assets/images/WizardImages/Logomark.png";
import Header from "../../Components/Layouts/AuthLayout/Header";
// import LinkedInPage from "../Advisor/signupwizard/LinkedInPage";
import queryString from "query-string";
import history from "../../Utils/history";

function wait(ms) {
  var start = new Date().getTime();
  var end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
}

class Login extends Component {
  parsed = queryString.parse(history.location.search);
  linkedInCode = this.parsed?.code;
  state = {
    email: "",
    password: "",
    loading: false,
    errors: {
      email: "",
      password: "",
    },
    progress: "",
  };

  componentDidMount() {
    if (this.linkedInCode) {
      this.linkedInLogin();
    }
  }

  onChangeState = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  responseGoogle = (response) => {
    if (response.accessToken !== undefined) {
      Axios.get("/callback?authToken=" + response.accessToken)
        .then((response) => {
          userAuthenicated.userAuthResponseHandler(response);
        })
        .catch((error) => {
          toastAlert("error", "Authentication Failed!");
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    }
  };

  linkedInLogin = () => {
    Axios.post(`/api/login`, { linkedin_code: this.linkedInCode })
      .then((response) => {
        localStorage.setItem("RegisterEmail", response.data.user.email);
        userAuthenicated.userAuthResponseHandler(response);

        if (response.data.user.user_roles[0] == "Advisee") {
          Redirect.push("/advisee/dashboard");
        } else if (response.data.user.user_roles[0] == "Advisor") {
          Redirect.push("/advisor/dashboard");
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          toastAlert("error", "User not authorized to login with linked in.");
        }
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  login = () => {
    const { email, password } = this.state;
    let { emailError, passwordError } = "";

    if (!email) {
      emailError = "Email is required";
    }

    if (!password) {
      passwordError = "Password is required";
    }

    this.setState({
      errors: {
        email: emailError,
        password: passwordError,
      },
    });

    if (emailError || passwordError) {
      return true;
    }

    this.setState({ loading: true });

    Axios.post(`/api/login`, { email, password })
      .then((response) => {
        console.log('got response from api [120]');
        localStorage.setItem("RegisterEmail", response.data.user.email);
        userAuthenicated.userAuthResponseHandler(response);
        console.log(response.data.user.user_roles[0])
        if (response.data.user.user_roles[0] == "Advisee") {
          this.setState({ progress: JSON.parse(response.data.user.progress) });
          Redirect.push("/advisee/dashboard");
        } else if (response.data.user.user_roles[0] == "Advisor") {
          this.setState({ progress: JSON.parse(response.data.user.progress) });

          if (response.data.funnel_status === "Activated") {
            Redirect.push("/advisor/dashboard");
          } else {
            switch (response.data.funnel_status) {
              case "Account Created":
                Redirect.push("/advisor/signupwizard/journey");
                break;
              case "Email Verified":
                Redirect.push("/advisor/signupwizard/journey");
                break;
              case "Journey Complete":
                Redirect.push("/advisor/signupwizard/background");
                break;
              case "Demographic Info Complete":
                Redirect.push("/advisor/signupwizard/profile");
                break;
              case "Onboarding":
                Redirect.push("/advisor/signupwizard/profile");
                break;
              case "Education Info Complete":
                Redirect.push("/advisor/signupwizard/journey");
                break;
              case "Career Info Complete":
                Redirect.push("/advisor/signupwizard/background");
                break;
              case "Motivations Complete":
                Redirect.push("/advisor/signupwizard/profile");
                break;
              case "Onboarding":
                Redirect.push("/advisor/signupwizard/profile");
                break;
              default:
                Redirect.push("/advisor/signupwizard/journey");
            }
          }
        }
      })

      .catch((error) => {
        //      	console.log('no api response error [169]');
        //      	console.log(error);
        //      	if (typeof error.response !== 'undefined') {error.response = array();error.response.status = 401;}
        //      This throws a console error if unset
        if (typeof error.response !== 'undefined') {
          console.log('error [175]');
          if (error.response && error.response.status === 401) {
            toastAlert("error", "Email or Password doesn't match. Please try again. [176].");
          }
        } else {
          // error is undefined
          console.log('undefined error [181]');
          toastAlert("error", "Something went wrong. Please try again. [181]");
          window.location.href = "/login";
        }
      })

      .finally(() => {
        this.setState({ loading: false });
      });
  };

  render() {
    return (
      <>
        <div className="container-fluid login-wrapper p-0">
          <Header />
          <div className="row mar-width-0 row-loginWrap">
            <div className="col-md-6 d-flex justify-content-center align-items-center pt-5">
              <div className="row mar-width-0 form-bg ">
                <div className="col-md-12 p-0 text-center mb-2">
                  <img src={logoMArk} alt="" />
                  <h2 className="font-family lo-title">Welcome Back</h2>
                  <p className="font-family lo-title-p">
                    Please enter your details to log in.
                  </p>
                </div>

                <div className="col-md-12 form-wrap p-0">
                  <form className="w-100">


                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Email</label>

                      <input
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        onChange={this.onChangeState}
                        value={this.state.email}
                        className="form-control"
                        id="exampleInputEmail1"
                      />

                      <span className="error">{this.state.errors.email}</span>
                    </div>

                    <div className="form-group">
                      <label htmlFor="passwordInput">Password</label>

                      <input
                        type="password"
                        placeholder="••••••••"
                        name="password"
                        onChange={this.onChangeState}
                        value={this.state.password}
                        className="form-control"
                        id="passwordInput"
                      />

                      <span className="error">
                        {this.state.errors.password}
                      </span>
                    </div>

                    <div className="row mar-width-0 forgot-login">
                      <div className="col-6 p-0">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />

                          <label
                            className="form-check-label"
                            htmlFor="flexCheckDefault"
                          >
                            Remember me
                          </label>
                        </div>
                      </div>

                      <div className="col-6 p-0 text-right">
                        <div className="text-end">
                          <Link to="/forgetPassword">
                            <span>Forgot password</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      disabled={this.state.loading}
                      onClick={this.login}
                      className="btn btn-primary btnLogin"
                    >
                      Log in
                    </button>
                  </form>
                </div>

                <div className="col-md-12 bottom-wrap2 p-0">
                  <span>
                    Don’t have an account? <span className="d-bb"></span> Sign
                    Up as an{" "}
                    <Link to="/advisee/confirm-eligibility" className="">
                      Advisee
                    </Link>{" "}
                    or{" "}
                    <Link to="/advisor/signupwizard/createAccount" className="">
                      Advisor
                    </Link>
                  </span>{" "}
                  &nbsp;
                </div>
              </div>
            </div>

            <div className="col-md-6 bg-right d-flex justify-content-center align-items-center">
              <div className="">
                <img src={logoBg} className="d-logo" alt="" />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Login;
