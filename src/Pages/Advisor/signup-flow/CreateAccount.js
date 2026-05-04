import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import Profile from "../../../assets/images/DashboardImgs/profile.png";
import {
  destroySession,
  toasterAlert as toastAlert,
} from "../../../Helpers/Functions";
import history from "../../../Utils/history";
import Axios from "../../../Config/Axios";
import userAuthenicated from "../../../Services/auth.service";
import LinkedInPage from "./LinkedInPage";
import queryString from "query-string";
import Redirect from "../../../Utils/history";
import bulb from '../../../assets/images/lightbulb.png';



class CreateAccount extends React.Component {
  parsed = queryString.parse(history.location.search);
  linkedInCode = this.parsed?.code;
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    referralCode: "",
    passwordConfirmation: "",
    privacyPolicyCheck: false,
    eligibilityCriteriaCheck: false,
    loading: false,
    errors: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      referralCode: "",
      passwordConfirmation: "",
      policyCheckError: "",
    },
    referralCodes: []
  };

  componentDidMount() {
    this.getReferralCodes()
    if (this.linkedInCode) {
      this.registerLinkedIn();
    }
  }

  getReferralCodes = () => {
    Axios.get(`/api/get-referral-codes`).then(response => {
      var codes = [];
      response.data.referral_codes.forEach(element => {
        codes.push(element['code'].toLowerCase())
      });
      this.setState({ referralCodes: codes });
    })
  }

  registerLinkedIn = () => {
    const data = {
      linkedin_code: this.linkedInCode,
      type: "Advisor",
      login_type: 2,
    };

    Axios.post(`/api/register`, data)
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("RegisterEmail", response.data.user.email);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          userAuthenicated.userAuthResponseHandler(response);
          Redirect.push("/advisor/signupwizard/education");
        }
      })
      .catch((error) => {
        toastAlert("error", error);
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  onChangeState = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });

    if (name == "privacyPolicyCheck" || name == "eligibilityCriteriaCheck") {
      this.setState({ [name]: value ? true : false });
      value === "true"
        ? this.setState({ [name]: false })
        : this.setState({ [name]: true });
    } else if (name == "email") {
      let email = value;

      Axios.post(`api/emailCheck`, { email })
        .then((response) => {
          if (response && response.status === 200) {
            this.setState((prevState) => ({
              errors: {
                ...prevState.error,
                email: "",
              },
            }));
          }
        })
        .catch((error) => {
          if (error && error.response) {
            this.setState((prevState) => ({
              errors: {
                ...prevState.error,
                email: error.response.data.errors[0],
              },
            }));
          }
        });
    } else if (name == 'referralCode') {
      if (!this.state.referralCodes.includes(value.toLowerCase())) {
        let referralCodeerror = "The referral code you've entered is not valid. Please enter a valid code if you have one or leave this feild blank."
        this.setState(prevState => ({
          errors: {
            ...prevState.errors,
            referralCode: referralCodeerror
          }
        }))
      } else {
        this.setState(prevState => ({
          errors: {
            ...prevState.errors,
            referralCode: ''
          }
        }))
      }
    }
  };

  register = () => {
    const {
      firstName,
      lastName,
      email,
      password,
      passwordConfirmation,
      eligibilityCriteriaCheck,
      privacyPolicyCheck,
      referralCode,
    } = this.state;

    let {
      firstNameError,
      lastNameError,
      emailError,
      passwordError,
      passwordConfirmationError,
      policyCheckError,
      referralCodeerror,
    } = "";

    if (!firstName) {
      firstNameError = "First Name is required";
    }

    if (!lastName) {
      lastNameError = "Last name is required";
    }

    if (!eligibilityCriteriaCheck || !privacyPolicyCheck) {
      policyCheckError = "Please accept terms and conditions!";
    }

    // if (!referralCode) {
    //   referralCodeerror = "Referral Code is required";
    // }

    if (!email && !this.state.errors.email) {
      emailError = "Email is required";
      this.setState((prevState) => ({
        errors: {
          ...prevState.error,
          email: emailError,
        },
      }));
    }

    if (!password) {
      passwordError = "Password is required";
    }

    if (!passwordConfirmation) {
      passwordConfirmationError = "Password confirmation is required";
    } else if (password != passwordConfirmation) {
      passwordConfirmationError = "Password Mismatch";
    }

    this.setState((prevState) => ({
      errors: {
        ...prevState.errors,
        firstName: firstNameError,
        lastName: lastNameError,
        password: passwordError,
        passwordConfirmation: passwordConfirmationError,
        policyCheckError: policyCheckError,
        referralCode: referralCodeerror,
      },
    }));

    if (
      firstNameError ||
      lastNameError ||
      emailError ||
      passwordError ||
      passwordConfirmationError ||
      policyCheckError ||
      referralCodeerror
    ) {
      return true;
    }

    if (this.state.errors.email) {
      return true;
    }

    // if (!this.state.referralCodes.includes(referralCode)) {
    //   referralCodeerror = "The referral code you've entered is not valid. Please enter a valid code or consider joining the waiting list.";
    //   this.setState((prevState) => ({
    //     errors: {
    //       ...prevState.errors,
    //       referralCode: referralCodeerror,
    //     },
    //   }));

    //   return true;
    // }

    this.setState({ loading: true });

    const data = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
      type: "Advisor",
      referralCode: referralCode,
    };

    Axios.post(`/api/register`, data)
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("RegisterEmail", response.data.email);

          var login_data = {};
          login_data['data'] = response.data.login_response.original;
          login_data['status'] = response.status;

          userAuthenicated.userAuthResponseHandler(login_data);
          history.push(
            `/advisor/signupwizard/journey`
          );
          toastAlert("success", response.data.message);
        }
      })
      .catch((error) => {
        toastAlert("error", error);
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  render() {
    return (
      <div className={`row mar-width-0  NewStepOne__Wrapper`}>
        <div className="col-md-12 text-center wizardHeading">
          <h2>
            Become an Advisor
            <img
              src={bulb}
              className="img-fluid signup-icons"
              alt=""
            />
          </h2>
          <p>
            As an Advisor, you’ll empower the next generation of diverse leaders by leveling the playing field in access to opportunity.
          </p>
        </div>

        <form action="" className="w-100 p-0">
          <div className="row mar-width-0 form-inputs-">
            <div className="col-md-6">
              <label>First Name</label>

              <input
                type="text"
                name="firstName"
                onChange={this.onChangeState}
                value={this.state.firstName}
                className="form-control"
                placeholder="First Name"
              />

              <span className="error">{this.state.errors.firstName}</span>
            </div>

            <div className="col-md-6">
              <label>Last Name</label>

              <input
                type="text"
                name="lastName"
                onChange={this.onChangeState}
                value={this.state.lastName}
                className="form-control"
                placeholder="Last Name"
              />

              <span className="error">{this.state.errors.lastName}</span>
            </div>

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

            <div className="col-md-6">
              <label>Password</label>

              <input
                type="password"
                name="password"
                onChange={this.onChangeState}
                value={this.state.password}
                className="form-control"
                placeholder="Password"
              />

              <span className="error">{this.state.errors.password}</span>
            </div>

            <div className="col-md-6">
              <label>Confirm Password</label>

              <input
                type="password"
                name="passwordConfirmation"
                onChange={this.onChangeState}
                value={this.state.passwordConfirmation}
                className="form-control"
                placeholder="Confirm Password"
              />

              <span className="error">
                {this.state.errors.passwordConfirmation}
              </span>
            </div>

            <div className="col-md-12 ">
              <label htmlFor="">Referral Code (Optional) </label>

              <input
                type="text"
                className="form-control"
                name="referralCode"
                onChange={this.onChangeState}
                value={this.state.referralCode}
                placeholder="Start typing..."
              />

              <span className="error">{this.state.errors.referralCode}</span>
            </div>

            <div className="col-md-12">
              <div>
                <input
                  className="styled-checkbox"
                  id="styled-checkbox-1"
                  type="checkbox"
                  name="privacyPolicyCheck"
                  onChange={this.onChangeState}
                  checked={this.state.privacyPolicyCheck}
                  value={this.state.privacyPolicyCheck}
                />

                <label htmlFor="styled-checkbox-1">
                  I have read and agree to the{" "}
                  <Link to="/termOfUse">User Agreement</Link> and{" "}
                  <Link to="/privacyPolicy">Privacy Policy</Link>
                </label>
              </div>

              <div>
                <input
                  className="styled-checkbox"
                  id="styled-checkbox-2"
                  name="eligibilityCriteriaCheck"
                  onChange={this.onChangeState}
                  type="checkbox"
                  checked={this.state.eligibilityCriteriaCheck}
                  value={this.state.eligibilityCriteriaCheck}
                />

                <label
                  htmlFor="styled-checkbox-2"
                  className="position-relative Ec-Tooltip"
                >
                  I am a full-time employee (or have full-time work experience) in
                  the business or technology
                  sectors
                </label>
              </div>

              <span className="error">
                {this.state.errors.policyCheckError}
              </span>
            </div>


            {/* <div className="col-md-12">
              <LinkedInPage />
            </div> */}
            <div className="col-md-12">
              <button
                className="btn btn-continue-"
                disabled={this.state.loading}
                onClick={(e) => {
                  e.preventDefault();
                  this.register();
                }}
              >
                Continue
              </button>
            </div>

            {/* <div className="col-md-12">
              <button
                className="btn btn-join-wait-list-"
                disabled={this.state.loading}
                onClick={(e) => {
                  e.preventDefault();
                  window.open(
                    "https://gpcyeic8882.typeform.com/to/Fudisj5H",
                    "_blank" // <- This is what makes it open in a new window.
                  );
                }}
              >
                Join the Waitlist
              </button>
            </div> */}

            <div className="col-md-12 alreadyTagLine">
              <p>
                Already have an account?{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    history.push("/login");
                  }}
                >
                  {" "}
                  Log in
                </a>
              </p>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateAccount;
