import React from 'react';
import { Link, Switch, Route } from "react-router-dom";
import { destroySession } from '../../../Helpers/Functions';
import Sidebar from "./Sidebar";
import history from "../../../Utils/history";

// import CreateAccount from "../../../Pages/Advisee/signupwizard/CreateAccount";
import CreateAccount from "../../../Pages/Advisee/signup-flow/CreateAccount";
import YourBackground from "../../../Pages/Advisee/signup-flow/YourBackground";
import YourJourney from "../../../Pages/Advisee/signup-flow/YourJourney";
import YourProfile from '../../../Pages/Advisee/signup-flow/YourProfile';
import Welcome from '../../../Pages/Advisee/signup-flow/Welcome';
import { ProtectedRoute } from "./ProtectedRoute";


let createAccount = false;
let journey = false;
let background = false;
let profile = false;


class Main extends React.Component {
    componentDidMount() {
    }
    checkCurrentPath(url) {
        return history.location.pathname === '/signupwizard/' + url ? true : false
    }
    logout() {
        localStorage.clear();
        destroySession();
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
            journey = true;
            background = true;
            profile = true;
        }


        return (
            <div className="row mar-width-0 newMenteeWizardWrap">
                <Sidebar />
                <div className="col-md-9 newMenteeWizardSection">
                    <div className="row mar-width-0 wizardWidthWrap">
                        <Route path="/advisee/signupwizard/createAccount" exact>
                            <CreateAccount />
                        </Route>

                        <ProtectedRoute path="/advisee/signupwizard/yourBackground" exact component={YourBackground} />
                        <ProtectedRoute path="/advisee/signupwizard/yourJourney" exact component={YourJourney} />
                        <ProtectedRoute path="/advisee/signupwizard/yourProfile" exact component={YourProfile} />
                        <ProtectedRoute path="/advisee/signupwizard/welcome" exact component={Welcome} />

                        <div className={`row mar-width-0 justify-content-center text-center progressWrap ${this.checkCurrentPath('applied') ? 'd-none' : ''}`}>
                            {createAccount === true ?
                                <Link to="/advisee/signupwizard/createAccount" className={`progress-span ${this.checkCurrentPath('createAccount') ? 'active-progress-span' : ''}`} ></Link>
                                :
                                <Link to="#" className={`progress-span ${this.checkCurrentPath('createAccount') ? 'active-progress-span' : ''}`} ></Link>
                            }
                            {journey === true ?
                                <Link to="/advisee/signupwizard/yourJourney" className={`progress-span ${this.checkCurrentPath('journey') ? 'active-progress-span' : ''}`} ></Link>
                                :
                                <Link to="#" className={`progress-span ${this.checkCurrentPath('journey') ? 'active-progress-span' : ''}`} ></Link>
                            }
                            {background === true ?
                                <Link to="/advisee/signupwizard/yourBackground" className={`progress-span ${this.checkCurrentPath('background') ? 'active-progress-span' : ''}`} ></Link>
                                :
                                <Link to="#" className={`progress-span ${this.checkCurrentPath('background') ? 'active-progress-span' : ''}`} ></Link>
                            }
                            {profile === true ?
                                <Link to="/advisee/signupwizard/yourProfile" className={`progress-span ${this.checkCurrentPath('profile') ? 'active-progress-span' : ''}`} ></Link>
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
