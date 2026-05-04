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
    parsed = queryString.parse(history.location.search);
    email = this.parsed?.email;
    user = authService.getCurrentUser()
    state = {
        school: '',degree: '',fields_of_study: '', graduation_year: '', loading: false,
        errors:{
            school: '',degree: '',fields_of_study: '',graduation_year : '' , loading: false,
        }
    }
    componentDidMount() {
        //console.log('user' , this.user);
        setTimeout(() => {
            history.push('/signupwizard/final');
          }, "10000")
    }
    onChangeState = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value })
    }
    addEducation = () => {
        const { school, degree, fields_of_study, graduation_year } = this.state;
        let { schoolError, degreeError, fields_of_studyError, graduation_yearError} = '';

        if (!school) {
            schoolError = 'This Field is required.'
        }

        if (!degree) {
            degreeError = 'This Field is required.';
        }
        if (!fields_of_study) {
            fields_of_studyError = 'This Field is required.';
        }
        if (!graduation_year) {
            graduation_yearError = 'This Field is required.';
        }
        this.setState(prevState=>({
            errors: {
                ...prevState.errors,
                school: schoolError,
                degree: degreeError,
                fields_of_study: fields_of_studyError,
                graduation_year: graduation_yearError,
            }
        }))
        if (schoolError || degreeError || fields_of_studyError || graduation_yearError ) {
            return true;
        }
        this.setState({ loading: true });
        const data = {
            school: school,
            degree: degree,
            fields_of_study: fields_of_study,
            graduation_year: graduation_year,
            UserID: this.user?.UserID
        }
        Axios.post(`/add/education`, data).then(response => {
            console.log('asdsa', response)
            if (response.status === 200) {
                // console.log(response);
                // userAuthenicated.userAuthResponseHandler(response);
                // localStorage.setItem('RegisterEmail', response.data.user[0].email);
                // this.props.addUser(response.data.user[0])

                // setSession(response.data);
                // history.push(`/signupwizard/emailVerificationPending?email=${email}`);
                toastAlert('success', response.message)
            }
            else {
                console.log('asdsa', response)
                // if (response.data.message)
                toastAlert('error', response.message)
            }
        }).catch(error => {
            console.log(error.message, 'error data')
            if(!error.response.message)
            toastAlert('error', error.response.message)
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
                    <img src={EmailYes} alt=""/>
                </div>
                <div className="col-md-12 text-center wizardHeading">
                    <h2>You’re all set!</h2>
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
