import React from 'react';
import { Link, Route } from "react-router-dom";
import { destroySession } from '../../../Helpers/Functions';
import Sidebar from "../NewAdvisorSignUp/Sidebar";
import history from "../../../Utils/history";
import CreateAccount from "../../../Pages/Advisor/signup-flow/CreateAccount";
import YourJourney from "../../../Pages/Advisor/signup-flow/YourJourney";
import YourBackground from "../../../Pages/Advisor/signup-flow/YourBackground";
import YourProfile from "../../../Pages/Advisor/signup-flow/YourProfile";
import Welcome from "../../../Pages/Advisor/signup-flow/Welcome";

import { ProtectedRoute } from "./ProtectedRoute";

let createAccount = false;
let journey = false;
let background = false;
let profile = false;


class Main extends React.Component {
    componentDidMount() {
    }
    checkCurrentPath(url) {
        return history.location.pathname === '/advisor/signupwizard/' + url ? true : false
    }
    logout() {
        localStorage.clear();
        destroySession();
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
            <div className="row mar-width-0 newMenteeWizardWrap">
                <Sidebar />
                <div className="col-md-9 newMenteeWizardSection">
                    <div className="row mar-width-0 wizardWidthWrap">
                            <Route path="/advisor/signupwizard/createAccount" exact>
                                <CreateAccount />
                            </Route>
                            <ProtectedRoute path="/advisor/signupwizard/journey" exact component={YourJourney} />
                            <ProtectedRoute path="/advisor/signupwizard/background" exact component={YourBackground} />
                            <ProtectedRoute path="/advisor/signupwizard/profile" exact component={YourProfile} />
                            <ProtectedRoute path="/advisor/signupwizard/welcome" exact component={Welcome} />
                

                        <div className={`row mar-width-0 justify-content-center text-center progressWrap ${this.checkCurrentPath('applied') ? 'd-none' : ''}`}>
                            {createAccount === true ?
                                <Link to="/advisor/signupwizard/createAccount" className={`progress-span ${this.checkCurrentPath('createAccount') ? 'active-progress-span' : ''}`} ></Link>
                                :
                                <Link to="#" className={`progress-span ${this.checkCurrentPath('createAccount') ? 'active-progress-span' : ''}`} ></Link>
                            }
                            {journey === true ?
                                <Link to="/advisor/signupwizard/journey" className={`progress-span ${this.checkCurrentPath('journey') ? 'active-progress-span' : ''}`} ></Link>
                                :
                                <Link to="#" className={`progress-span ${this.checkCurrentPath('journey') ? 'active-progress-span' : ''}`} ></Link>
                            }
                            {background === true ?
                                <Link to="/advisor/signupwizard/background" className={`progress-span ${this.checkCurrentPath('background') ? 'active-progress-span' : ''}`} ></Link>
                                :
                                <Link to="#" className={`progress-span ${this.checkCurrentPath('background') ? 'active-progress-span' : ''}`} ></Link>
                            }
                            {profile === true ?
                                <Link to="/advisor/signupwizard/profile" className={`progress-span ${this.checkCurrentPath('profile') ? 'active-progress-span' : ''}`} ></Link>
                                :
                                <Link to="#" className={`progress-span ${this.checkCurrentPath('profile') ? 'active-progress-span' : ''}`} ></Link>
                            }
                            
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default Main;
