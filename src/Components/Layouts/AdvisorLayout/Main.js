import React from "react";
import { Link, Switch, Route } from "react-router-dom";
import Profile from "../../../assets/images/DashboardImgs/profile.png";
import { destroySession } from "../../../Helpers/Functions";
import Header from "./Header";
import history from "../../../Utils/history";
import LogoWhite from "../../../assets/images/WizardImages/Horizontal.png";
import Msg from "../../../assets/images/WizardImages/mail.png";
import ShortLogo from "../../../assets/images/WizardImages/Logomark.png";
import LinkdIn from "../../../assets/images/WizardImages/linkdin.png";
import Search from "../../../assets/images/WizardImages/search.png";
import CreateAccount from "../../../Pages/Advisee/signupwizard/CreateAccount";
import EmailVerification from "../../../Pages/Advisee/signupwizard/EmailVerification";
import EmailVerificationPending from "../../../Pages/Advisee/signupwizard/EmailVerificationPending";
import WorkExperience from "../../../Pages/Advisee/signupwizard/WorkExperience";
import CarearGoals from "../../../Pages/Advisee/signupwizard/CarearGoals";
import Background from "../../../Pages/Advisee/signupwizard/Background";
import Apply from "../../../Pages/Advisee/signupwizard/Apply";
import Applied from "../../../Pages/Advisee/signupwizard/Applied";
import { EmailVerifySuccess } from "../../../Pages/pageListAsync";
import { ProtectedRoute } from "../../../Components/Layouts/AdviseeSignUpLayout/ProtectedRoute";
import "./main.css";
import { Dashboard } from "./../AdvisorLayout/pageListAsync";

class Main extends React.Component {
  checkCurrentPath(url) {
    return history.location.pathname == "/signupwizard/" + url ? true : false;
  }

  logout() {
    localStorage.clear();
    destroySession();
  }

  render() {
    return (
      <div className="wrapper">
        <Header />
        <Route path="/Advisor/Dashboard" exact>
          <Dashboard />
        </Route>
      </div>
    );
  }
}

export default Main;
