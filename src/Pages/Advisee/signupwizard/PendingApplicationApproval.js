import React from 'react';
import EmailYes from "../../../assets/images/WizardImages/EmailYes.png";
import Welldone from "../../../assets/images/WizardImages/WellDone.png";


class PendingApplicationApproval extends React.Component {
   
   
    render() {
        return (
            <div className={`row mt-80 unverifiedEmail NewStepSecond__Wrapper`}>
                <div className="col-md-12 wizardlogoimg">
                    <img src={EmailYes} alt=""/>
                </div>
                <div className="col-md-12 text-center wizardHeading">
                    <h2>Stay tuned...</h2>
                </div>
                <div className="col-md-12">
                    <p className="p-welldone">
                        Thank you for applying to Candoor as an Advisee!
                        <br/><br/>
                        Applications will be reviewed on a rolling basis and decisions will be sent via email.<br></br>
                        If you do not hear back within 3 weeks of submitting your application, email us at hello@candoor.io and <br></br>we will check on the status of your application.
                    </p>
                </div>
                <div className="col-md-12 wizardlogoimg">
                    <img src={Welldone} alt=""/>
                </div>
            </div>
        );
    }
}

export default PendingApplicationApproval;
