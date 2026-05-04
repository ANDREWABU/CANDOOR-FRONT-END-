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
        // console.log('user' , this.user);
        // setTimeout(function() {
        //     history.push('/advisor/dashboard')
        //   }, 5000);
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
                    You’ll receive an email with our community guidelines and helpful information to ensure you get the most out of your Candoor experience. Feel free to browse the Advisor directory to book your first chat!</p>
                </div>


                <div className="col-md-12">
                    <button onClick={e => history.push('/advisee/advisor-directory')} className="btn btn-continue-">Book your first Advisor Meeting!</button>

                </div>

            </div>
        );
    }
}

export default Welcome;
