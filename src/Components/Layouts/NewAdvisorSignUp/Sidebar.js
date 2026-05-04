import React from 'react';
import history from '../../../Utils/history';
import LogoWhite from "../../../assets/images/WizardImages/Horizontal.png";
import Msg from "../../../assets/images/WizardImages/mail.png";

// css
import './main.css'

let createAccount = false;
let journey = false;
let background = false;
let profile = false;

class Sidebar extends React.Component {
    checkCurrentPath(url) {
        return history.location.pathname === '/signupwizard/' + url ? true : false
    }
    render() {
        const pathName = history.location.pathname;
        if (pathName === '/advisor/signupwizard/createAccount') {
            createAccount = true;
        }

        if (pathName === '/advisor/signupwizard/journey') {
            createAccount = true;
            journey = true;
        }

        if (pathName === '/advisor/signupwizard/background') {
            createAccount = true;
            journey = true;
            background = true;
        }

        if (pathName === '/advisor/signupwizard/profile') {
            createAccount = true;
            journey = true;
            background = true;
            profile = true;
        }

        if (pathName === '/advisor/signupwizard/welcome') {
            createAccount = true;
            journey = true;
            background = true;
            profile = true;
        }

        return (
            <div className="col-md-3 newMenteeWizardSidebar">
                <div className="row mar-width-0">
                    <div className="col-md-12">
                        <img src={LogoWhite} alt="" />
                    </div>
                </div>
                <div className="row mar-width-0 stepsWrapNew">
                    <div className="col-md-12 stepsWrapSteps">
                        <div className="divCricle" >
                            <span className={"step-circle " + (pathName === "/advisor/signupwizard/createAccount" ? "step-circle-active" : "") + (createAccount === true ? " step-circle-Complete" : "")} onClick={e => history.push('/advisor/signupwizard/createAccount')}>
                            </span>
                        </div>
                        {/* <h6>Sign Up</h6> */}
                        <p>Sign Up</p>
                    </div>
                    <div className="col-md-12 stepsWrapSteps ">
                        <div className="divCricle" id="step_three" >
                            <span className={"step-circle " + (pathName === "/advisor/signupwizard/journey" ? "step-circle-active" : "")
                                + (journey === true ? " step-circle-Complete" : "")}
                                onClick={e => journey === true ? history.push('/advisor/signupwizard/journey') : ""}>
                            </span>
                        </div>
                        {/* <h6>Step 2</h6> */}
                        <p>Your Journey</p>
                    </div>

                    <div className="col-md-12 stepsWrapSteps ">
                        <div className="divCricle" id="step_four" >
                            <span className={"step-circle " + (pathName === "/advisor/signupwizard/background" ? "step-circle-active" : "")
                                + (background === true ? " step-circle-Complete" : "")}
                                onClick={e => background === true ? history.push('/advisor/signupwizard/background') : ""}>
                            </span>
                        </div>
                        <h6></h6>
                        <p>Your Background</p>
                    </div>
                    <div className="col-md-12 stepsWrapSteps">
                        <div className="divCricle no-line" >
                            <span className={"step-circle " + (pathName === "/advisor/signupwizard/profile" ? "step-circle-active" : "") +
                                (profile === true ? " step-circle-Complete" : "")} onClick={e => profile === true ? history.push('/advisor/signupwizard/profile') : ""}>
                            </span>
                        </div>
                        <p>Your Profile</p>
                    </div>
                </div>
                <div className="row mar-width-0 stepsWrapFooter">
                    <div className="col-md-12">
                        <p>
                            <img src={Msg} className="mr-1" alt="" />
                            Questions? Email us at
                            <a href="mailto=hello@candoor.io"> hello@candoor.io</a>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Sidebar;
