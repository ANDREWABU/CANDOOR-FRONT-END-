import React from 'react';
import {Link, Switch} from "react-router-dom";
import Profile from "../../../assets/images/DashboardImgs/profile.png";
import {destroySession, toasterAlert as toastAlert} from '../../../Helpers/Functions';
import history from "../../../Utils/history";
import LogoWhite from "../../../assets/images/WizardImages/Horizontal.png";
import Msg from "../../../assets/images/WizardImages/mail.png";
import ShortLogo from "../../../assets/images/WizardImages/Logomark.png";
import LinkdIn from "../../../assets/images/WizardImages/linkdin.png";
import Search from "../../../assets/images/WizardImages/search.png";
import EmailYes from "../../../assets/images/WizardImages/EmailYes.png";
import EmailIcon from "../../../assets/images/WizardImages/email-icon.png";
import queryString from 'query-string';
import Axios from "../../../Config/Axios";
import EditPen from "../../../assets/images/WizardImages/edit-2.png";
import authService from "../../../Services/auth.service"
import Welldone from "../../../assets/images/WizardImages/WellDone.png";

class Applied extends React.Component {
   
    state = {
        
    }
   
    render() {
        return (
            <div className={`row mar-width-0 mt-80 unverifiedEmail NewStepSecond__Wrapper`}>
                <div className="col-md-12 wizardlogoimg">
                    <img src={EmailYes} alt=""/>
                </div>
                <div className="col-md-12 text-center wizardHeading">
                    <h2>You're all set!</h2>
                </div>
                <div className="col-md-12">
                    <p className="p-welldone">
                        Thank you for applying to Candoor as an Advisee!
                        <br/><br/>
                        Applications will be reviewed on a rolling basis and decisions will be sent via email.
                        If you do not hear back within 3 weeks of submitting your application, email us at hello@candoor.io and we will check on the status of your application.
                    </p>
                </div>
                <div className="col-md-12 wizardlogoimg">
                    <img src={Welldone} alt=""/>
                </div>
                {/* <p className="p-welldone">
                    Please click below if you are not redirected within 10 seconds:
                </p>

                <div className="col-md-12">
                    <button onClick={e => history.push('/advisee/dashboard')} className="btn btn-continue-">Go to Onboarding Checklist</button>

                </div> */}
            </div>
        );
    }
}

export default Applied;
