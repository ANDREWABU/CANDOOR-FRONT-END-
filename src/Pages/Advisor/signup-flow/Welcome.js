import React from 'react';
import { destroySession, toasterAlert as toastAlert } from '../../../Helpers/Functions';
import history from "../../../Utils/history";
import EmailYes from "../../../assets/images/WizardImages/EmailYes.png";
import queryString from 'query-string';
import Axios from "../../../Config/Axios";
import authService from "../../../Services/auth.service"

import Welldone from "../../../assets/images/WizardImages/WellDone.png";

class Welcome extends React.Component {

    componentDidMount() {
        console.log('user' , this.user);
        setTimeout(function() {
            history.push('/advisor/dashboard')
          }, 5000);
    }



    logout() {
        localStorage.clear();
        destroySession();
    }

    logout() {
        localStorage.clear();
        destroySession();
    }

    render() {
        return (
            <div className={`row mar-width-0 mt-80 unverifiedEmail NewStepSecond__Wrapper`}>
                <div className="col-md-12 wizardlogoimg">
                    <img src={EmailYes} alt="" />
                </div>
                <div className="col-md-12 text-center wizardHeading">
                    <h2>Its Official!</h2>
                </div>

                <div className="col-md-12 wizardlogoimg">
                    <img src={Welldone} alt="" />
                </div>
                <div className="col-md-12 text-center wizardHeading">
                    <h2>Welcome to Candoor!</h2>
                </div>
                <div className="col-md-12">
                    <p className="p-welldone">
                        In a few moments, you’ll be redirected to our home page where you can edit your profile and view our Advisor Guidebook to help you get the most out of your Candoor experience. We can’t wait to see the impact you make!
                    </p>
                </div>
                <p className="p-welldone">
                    Please click below if you are not redirected within 10 seconds:
                </p>

                <div className="col-md-12">
                    <button onClick={e => history.push('/advisor/dashboard')} className="btn btn-continue-">Go to Home Page</button>

                </div>

            </div>
        );
    }
}

export default Welcome;
