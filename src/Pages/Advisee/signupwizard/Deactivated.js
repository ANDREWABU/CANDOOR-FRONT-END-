import React from 'react';
import EmailYes from "../../../assets/images/WizardImages/EmailYes.png";
import Welldone from "../../../assets/images/WizardImages/WellDone.png";


class Deactivated extends React.Component {
   
   
    render() {
        return (
            <div className={`row mt-80 unverifiedEmail NewStepSecond__Wrapper`}>

                <div className="col-md-12 text-center wizardHeading">
                    <h2>You account has been deactivated.</h2>
                </div>
                <div className="col-md-12">
                    <p className="p-welldone">
                        Your account has been deactivated for not following our community guidelines. 
                        <br/><br/>
                        If you feel a mistake has been made, please reachout to hello@candoor.io.<br></br>
                    </p>
                </div>
                <div className="col-md-12 wizardlogoimg">
                    <img src={Welldone} alt=""/>
                </div>
            </div>
        );
    }
}

export default Deactivated;
