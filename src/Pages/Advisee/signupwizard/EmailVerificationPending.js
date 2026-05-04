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

class EmailVerification extends React.Component {
    parsed = queryString.parse(history.location.search);
    email = this.parsed?.email;
    state = {
        loading: false
    }
    componentDidMount() {
        console.log('history' , history);
    }
    resendEmail = () => {


        this.setState({ loading: true });
        const data = {
            email: this.email,
        }
        Axios.post(`/api/email/verify/resend`, data).then(response => {
            console.log(response.data, 'save data')
            if (response.status === 200) {
                // console.log(response);
                // userAuthenicated.userAuthResponseHandler(response);
                // localStorage.setItem('RegisterEmail', response.data.user[0].email);
                // this.props.addUser(response.data.user[0])

                // setSession(response.data);
                // history.push(`/signupwizard/emailVerificationPending?email=${email}`);
                toastAlert('success', response.data.message)
            }
            else {
                // if (response.data.message)
                // toastAlert('error', response.data.message)
            }
        }).catch(error => {
            console.log(error, 'error data')
            // if(!error.response.data.errors?.outcome_id )

            toastAlert('error', error)
            //
            // return error.response
        }).finally(() => {
            this.setState({ loading: false });
        });

        // Axios.post('https://reqres.in/api/articles', {email,password} )
        //     .then(response => console.log(response));
    }
    logout(){
        localStorage.clear();
        destroySession();
    }

    logout(){
        localStorage.clear();
        destroySession();
    }
    render() {
        return (
            <div className={`row mar-width-0 mt-80 unverifiedEmail NewStepSecond__Wrapper`}>
                <div className="col-md-12 wizardlogoimg">
                    <img src={EmailIcon} alt=""/>
                </div>
                <div className="col-md-12 text-center wizardHeading">
                    <h2>Apply to Candoor as an Advisee</h2>
                    <h6><span>Step 2:</span> Verify your email</h6>
                </div>
                <div className="col-md-12">
                    <p>
                        We sent a verification email to <i>{this.email}.</i> <strong>Click the link to verify your email address and continue the sign-up process.</strong>
                        <br/><br/>
                        Note that the email may take up to 10 minutes to arrive. Check your Promotions, Spam or Other folder if it isn’t in your Primary inbox.
                        <br/><br/>
                        Still haven't received it? Click here:
                    </p>
                </div>
                <div className="col-md-12">
                    <button className="btn btn-resend-"  disabled={this.state.loading} onClick={(e) => {
                        e.preventDefault();
                        this.resendEmail();
                    }}>Resend Verification Email</button>
                </div>
            </div>
        );
    }
}

export default EmailVerification;
