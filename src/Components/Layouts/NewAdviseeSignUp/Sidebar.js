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
        return history.location.pathname === '/advisee/signupwizard/' + url ? true : false
    }
    render() {
        const pathName = history.location.pathname;

        if (pathName === '/advisee/signupwizard/createAccount') {
            createAccount = true;
        }


        if (pathName === '/advisee/signupwizard/yourBackground') {
            createAccount = true;
            background = true;
        }

        if (pathName === '/advisee/signupwizard/yourJourney') {
            createAccount = true;
            background = true;
            journey = true;
        }
        if (pathName === '/advisee/signupwizard/yourProfile') {
            createAccount = true;
            background = true;
            journey = true;
            profile = true;
        }
        if (pathName === '/advisee/signupwizard/welcome') {
            createAccount = true;
            background = true;
            journey = true;
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
                            <span className={"step-circle " + (pathName === "/advisee/signupwizard/createAccount" ? "step-circle-active" : "") + (createAccount === true ? " step-circle-Complete" : "")} onClick={e => history.push('/advisee/signupwizard/createAccount')}>
                            </span>
                        </div>
                        <h6>Step 1</h6>
                        <p>Create Account</p>
                    </div>

                    <div className="col-md-12 stepsWrapSteps ">
                        <div className="divCricle" id="step_three" >
                            <span className={"step-circle " + (pathName === "/advisee/signupwizard/yourBackground" ? "step-circle-active" : "") + (background === true ? " step-circle-Complete" : "")}
                                onClick={e => background === true ? history.push('/advisee/signupwizard/yourBackground') : ""}>
                            </span>
                        </div>
                        <h6>Step 2</h6>
                        <p>Your Background</p>
                    </div>

                    <div className="col-md-12 stepsWrapSteps ">
                        <div className="divCricle" id="step_four" >
                            <span className={"step-circle " + (pathName === "/advisee/signupwizard/yourJourney" ? "step-circle-active" : "") +
                                (journey === true ? " step-circle-Complete" : "")}
                                onClick={e => journey === true ? history.push('/advisee/signupwizard/yourJourney') : ""}>
                            </span>
                        </div>
                        <h6>Step 3</h6>
                        <p>Your Journey</p>
                    </div>


                    <div className="col-md-12 stepsWrapSteps">
                        <div className="divCricle no-line" >
                            <span className={"step-circle " + (pathName === "/advisee/signupwizard/yourProfile" ? "step-circle-active" : "")
                                + (profile === true ? " step-circle-Complete" : "")}
                                onClick={e => profile === true ? history.push('/advisee/signupwizard/yourProfile') : ""}>
                            </span>
                        </div>
                        <h6>Step 4</h6>
                        <p>Create Profile</p>
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
