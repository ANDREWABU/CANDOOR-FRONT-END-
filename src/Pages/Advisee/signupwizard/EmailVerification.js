import React from "react";
import { Link, Switch } from "react-router-dom";
import Profile from "../../../assets/images/DashboardImgs/profile.png";
import {
  destroySession,
  isAuthenticated,
  toasterAlert,
} from "../../../Helpers/Functions";
import history from "../../../Utils/history";
import LogoWhite from "../../../assets/images/WizardImages/Horizontal.png";
import Msg from "../../../assets/images/WizardImages/mail.png";
import ShortLogo from "../../../assets/images/WizardImages/Logomark.png";
import LinkdIn from "../../../assets/images/WizardImages/linkdin.png";
import Search from "../../../assets/images/WizardImages/search.png";
import EmailYes from "../../../assets/images/WizardImages/EmailYes.png";
import Redirect from "../../../Utils/history";
import Axios from "../../../Config/Axios";
import userAuthenicated from "../../../Services/auth.service";

class EmailVerification extends React.Component {
  state = {
    email: "",
    password: "",
    progress: "",
    loading: false,
    errors: {
      email: "",
      password: "",
    },
  };

  onChangeState = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
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
        localStorage.setItem("RegisterEmail", response.data.user.email);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        userAuthenicated.userAuthResponseHandler(response);
        // if (response.data.user.email_verified == 1) {


          this.setState({ progress: JSON.parse(response.data.user.progress) });
          if (this.state.progress == null) {
            Redirect.push("education");
          } else if (
            this.state.progress.seven_step == 1 &&
            response.data.funnel_status == "Pending Application Review"
          ) {
            Redirect.push("final");
          } else if (response.data.funnel_status == "Onboarding") {
            history.push("/advisee/dashboard");
          } else {
            Redirect.push("education");
          }


        // } 
        
        // else {
        //   Redirect.push("/signupwizard/emailVerificationPending");
        // }
      })
      .catch((error) => {
        if (
          (error.response && error.response.status === 401) ||
          (error.response && error.response.status === 422)
        ) {
          toasterAlert("error", "Email or Password doesn't match.");
        } else {
          toasterAlert("error", "Something went wrong.");
        }
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  logout() {
    localStorage.clear();
    destroySession();
  }

  render() {
    return (
      <div className={`row mar-width-0 mt-80 NewStepSecond__Wrapper`}>
        <div className="col-md-12 wizardlogoimg">
          <img src={EmailYes} alt="" />
        </div>
        <div className="col-md-12 text-center wizardHeading">
          <h2>Apply to Candoor as an Advisee</h2>
          <h6>
            <span>Step 2:</span> Verify your email
          </h6>
        </div>
        <div className="col-md-12">
          <p>
            Thanks for verifying your email! Log in to proceed in the sign-up
            process:
          </p>
        </div>
        <form action="" className="w-100 p-0">
          <div className="row mar-width-0 form-inputs-">
            <div className="col-md-12">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={this.onChangeState}
                value={this.state.email}
                placeholder="Email address"
              />
              <span className="error">{this.state.errors.email}</span>
            </div>
            <div className="col-md-12">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={this.onChangeState}
                value={this.state.password}
                placeholder="Password"
              />
              <span className="error">{this.state.errors.password}</span>
            </div>
            <div className="col-md-12">
              <button
                className="btn btn-continue-"
                disabled={this.state.loading}
                onClick={(e) => {
                  e.preventDefault();
                  this.login();
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default EmailVerification;
