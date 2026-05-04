import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import Profile from "../../../assets/images/DashboardImgs/profile.png";
import {
    destroySession,
    toasterAlert as toastAlert,
} from "../../../Helpers/Functions";
import history from "../../../Utils/history";
import LogoWhite from "../../../assets/images/WizardImages/Horizontal.png";
import Msg from "../../../assets/images/WizardImages/mail.png";
import ShortLogo from "../../../assets/images/WizardImages/Logomark.png";
import LinkdIn from "../../../assets/images/WizardImages/linkdin.png";
import Search from "../../../assets/images/WizardImages/search.png";
import Axios from "../../../Config/Axios";
import userAuthenicated from "../../../Services/auth.service";
// import LinkedInPage from "../../Advisor/signupwizard/LinkedInPage";
import Redirect from "../../../Utils/history";
import queryString from "query-string";
import ApiRequest from "../../../Services/ApiRequest";


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
        how_hear_about_us: "",
        privacyPolicyCheck: false,
        eligibilityCriteriaCheck: false,
        loading: false,
        data: {
            here_about_us: [],
        },
        errors: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            passwordConfirmation: "",
            policyCheckError: "",
            here_about_us_error: "",
            referralCode: ""
        },
    };

    componentDidMount() {
        if (this.linkedInCode) {
            this.registerLinkedIn();
        }

        this.getMainData();
    }

    getMainData = async () => {
        let response = await ApiRequest.getRequest('/api/hear_about_us_options');
        response = response.data;
        let data = this.state.data;
        data.here_about_us = response.here_about_us;
        console.log()
        this.setState(() => ({ data }));
    }

    registerLinkedIn = () => {
        const data = {
            linkedin_code: this.linkedInCode,
            type: "Advisee",
            login_type: 2,
        };

        Axios.post(`/api/register`, data)
            .then((response) => {
                if (response.status === 200) {
                    localStorage.setItem("RegisterEmail", response.data.user.email);
                    localStorage.setItem("user", JSON.stringify(response.data.user));
                    userAuthenicated.userAuthResponseHandler(response);
                    Redirect.push("/signupwizard/education");
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
            Axios.post(`/api/emailCheck`, { email })
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
                                email: 'Email already exists, try logging in',
                            },
                        }));
                    }
                });
        }
    };

    register = () => {
        const {
            firstName,
            lastName,
            email,
            password,
            passwordConfirmation,
            referralCode,
            how_hear_about_us,
            // eligibilityCriteriaCheck,
            privacyPolicyCheck,
        } = this.state;

        let {
            firstNameError,
            lastNameError,
            emailError,
            passwordError,
            passwordConfirmationError,
            policyCheckError,
            here_about_us_error
        } = "";

        if (!firstName) {
            firstNameError = "First Name is required";
        }

        if (!lastName) {
            lastNameError = "Last name is required";
        }

        if ( !privacyPolicyCheck) {
            policyCheckError = "Please accept User Agreement and Privacy Policy!";
        }

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

        if (!how_hear_about_us) {
            here_about_us_error = "How did you hear about us is required";
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
                here_about_us_error: here_about_us_error
            },
        }));

        if (
            firstNameError ||
            lastNameError ||
            emailError ||
            passwordError ||
            passwordConfirmationError ||
            policyCheckError ||
            here_about_us_error
        ) {
            return true;
        }

        if (this.state.errors.email !== "") {
            toastAlert("error", "Email already exists, try logging in");

            return true;
        }

   

        this.setState({ loading: true });

        const data = {
            firstname: firstName,
            lastname: lastName,
            email: email,
            password: password,
            password_confirmation: passwordConfirmation,
            referralCode: referralCode,
            here_about_us: how_hear_about_us,
            privacyPolicyCheck: privacyPolicyCheck,
            type: "Advisee",
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
                        `/advisee/signupwizard/yourBackground`
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

    logout() {
        localStorage.clear();
        destroySession();
    }

    render() {
        return (
            <div className={`row mar-width-0  NewStepOne__Wrapper`}>
                <div className="col-md-12 wizardlogoimg">
                    <img src={ShortLogo} alt="" />
                </div>
                <div className="col-md-12 text-center wizardHeading">
                    <h2>Become an Advisee</h2>
                    <p>
                        As an Advisee, you'll grow your network of career champions.
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
                        <div className="col-md-6">
                            <label>Referral Code (Optional)</label>
                            <input
                                type="text"
                                name="referralCode"
                                onChange={this.onChangeState}
                                value={this.state.referralCode}
                                className="form-control"
                                placeholder="Referral Code"
                            />
                            <span className="error">{this.state.errors.referralCode}</span>
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="">How did you hear about us?</label>
                            <select className="form-select form-control" aria-label="Default select" name="how_hear_about_us" onChange={this.onChangeState} value={this.state.how_hear_about_us}>
                                <option selected>Select ...</option>
                                {
                                    this.state.data.here_about_us.map((item, index) => (
                                        <option value={item}>{item}</option>
                                    ))
                                }
                            </select>
                            <span className="error">{this.state.errors.here_about_us_error}</span>
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
                                    <Link to="/termOfUse" target="_blank">
                                        User Agreement
                                    </Link>{" "}
                                    and
                                    <Link target="_blank" to="/privacyPolicy">
                                        {" "}
                                        Privacy Policy
                                    </Link>
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
                                {/* <label
                                    htmlFor="styled-checkbox-2"
                                    className="position-relative Ec-Tooltip"
                                >
                                    I affirm that I meet Candoor’s{" "}
                                    <span className="">eligibility criteria</span>
                                    <div className="tooltip-eligibile">
                                        <h6>Advisee Eligibility Criteria</h6>
                                        <p>To be eligible as a Candoor Advisee, you must:</p>
                                        <ul>
                                            <li>
                                                Identify as Black, Latinx, Native American or otherwise
                                                underserved in the tech or business world
                                            </li>
                                            <li>Have received a high school diploma or GED</li>
                                            <li>
                                                <li>
                                                    Have &#60;6 years professional working experience
                                                </li>
                                                <li>
                                                    Have the desire to pursue a tech or business career in
                                                    the US
                                                </li>
                                            </li>
                                        </ul>
                                    </div>
                                </label> */}
                            </div>
                            <span className="error">
                                {this.state.errors.policyCheckError}
                            </span>
                        </div>
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
