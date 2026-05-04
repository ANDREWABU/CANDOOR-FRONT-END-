import React from 'react';
import { Link, Switch } from "react-router-dom";
import Profile from "../../../assets/images/DashboardImgs/profile.png";
import { destroySession, toasterAlert as toastAlert } from '../../../Helpers/Functions';
import history from "../../../Utils/history";
import Header from "../../../Components/Layouts/AdviseeLayout/Header";
import Footer from "../../../Components/Layouts/Footer";
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
import ApiRequest from "../../../Services/ApiRequest";
import heart from "../../../assets/images/heart.png";
import profilebg from "../../../assets/images/profilebg.png";
import myprofile from "../../../assets/images/myprofile.png";
import editpro from "../../../assets/images/edit-pro.png";
import map from "../../../assets/images/map.png";
import clock from "../../../assets/images/clock.png";
import aboutme from "../../../assets/images/aboutme.png";
import careericon from "../../../assets/images/career-icon.png";
import myjourney from "../../../assets/images/myjourney.png";
import myjourneylist1 from "../../../assets/images/myjourneylist1.png";
import institutionlogo from "../../../assets/images/institution-logo.png";
import myjourneylist2 from "../../../assets/images/myjourneylist2.png";
import workexperience from "../../../assets/images/work-experience.png";
import plus from "../../../assets/images/plus.png";
import fun from "../../../assets/images/fun.png";
import upload from "../../../assets/images/upload.png";
import search from "../../../assets/images/search.png";

class AdviseeProfileData extends React.Component {
    state = {
        how_hear_us: '', referralCode: '', belongs_to: [], loading: false,
        errors: {
            how_hear_us: '', referralCode: '', belongs_to: [],
        },
        data: {
            work_roles: [],
            industries: [],
            companies: [],
            timezones: [],
            user_carrer: '',
            here_about_us: []
        },


    }
    componentDidMount() {
        console.log('user', this.user);
        this.getMainData();
    }



   
    getMainData = async () => {
      let response = await ApiRequest.getRequest('api/advisor-get-profile-data');
      response = response.data;
      let data = this.state.data;
      if (response.result) {
          //   data.companies = this.selectOptions(response.result.companies);
          //   data.industries = this.selectOptions(response.result.industries);
          //  data.work_roles = this.selectOptions(response.result.work_roles);
          data.here_about_us = response.result.here_about_us;
          this.setState(() => ({ data }));
          this.setInputFieldStates(response.result.user_carrer);
      }

      // Axios.post('https://reqres.in/api/articles', {email,password} )
      //     .then(response => console.log(response));
  }
  add = async () => {
      const { how_hear_us, referralCode, belongs_to, is_prescrean_program } = this.state;
      let { how_hear_usError, referralCodeError, belongs_toError } = '';
      this.resetErrors();
      if (!how_hear_us) {
          how_hear_usError = 'This Field is required.'
      }

      if (belongs_to.length == 0) {
          belongs_toError = 'This Field is required.';
      }

      this.setState(prevState => ({
          errors: {
              ...prevState.errors,
              how_hear_us: how_hear_usError,
              belongs_to: belongs_toError,
          }
      }))
      if (how_hear_usError || belongs_toError) {
          return true;
      }
      this.setState({ loading: true });
      const data = {
          how_hear_us, referralCode, belongs_to, is_prescrean_program
      }
      let response = await ApiRequest.postRequest('/api/submit-apply-data', data);

      // if (response !== undefined && response.status === 200 && response.status !== 422) {
      //     this.changeStep();
      // } else if (response !== undefined   && response.status == 422) {
      //     toastAlert('error', response.data.errors[0]);
      // } else {
      //     toastAlert('error', "Something went wrong please try again!");
      // }
      this.setState({ loading: false });
      this.changeStep();
  }




    render() {
      return (
        <div>sdfdsb</div>
      );
    }
}

export default AdviseeProfileData;
