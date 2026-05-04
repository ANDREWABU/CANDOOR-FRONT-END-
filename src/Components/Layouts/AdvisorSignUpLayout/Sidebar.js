// import React from 'react';
// import { Link } from "react-router-dom";
// import DLogo from "../../../assets/images/DashboardImgs/dashboard-logo.png"
// import CLipList from "../../../assets/images/DashboardImgs/clipboard-list.png";
// import Group from "../../../assets/images/DashboardImgs/Group.png";
// import Bill from "../../../assets/images/DashboardImgs/bill.png";
// import Setting from "../../../assets/images/DashboardImgs/setting.png";
// import DashB from "../../../assets/images/DashboardImgs/dashb.png";
// import CLip from "../../../assets/images/DashboardImgs/clipboard.png";
// import history from '../../../Utils/history';
// import LogoWhite from "../../../assets/images/WizardImages/Horizontal.png";
// import Msg from "../../../assets/images/WizardImages/mail.png";
// import ShortLogo from "../../../assets/images/WizardImages/Logomark.png";
// import LinkdIn from "../../../assets/images/WizardImages/linkdin.png";
// import EmailYes from "../../../assets/images/WizardImages/EmailYes.png";
// import EmailIcon from "../../../assets/images/WizardImages/email-icon.png";
// import EditPen from "../../../assets/images/WizardImages/edit-2.png";
// import Welldone from "../../../assets/images/WizardImages/WellDone.png";
// import Search from "../../../assets/images/WizardImages/search.png";
// // css
// import './main.css'

// let createAccount = false;
// let emailVerification = false;
// let education = false;
// let workExperience = false;
// let background = false;
// let goals = false;
// let apply = false;

// class Sidebar extends React.Component {
//     checkCurrentPath(url) {
//         return history.location.pathname === '/signupwizard/' + url ? true : false
//     }
//     render() {
//         const pathName = history.location.pathname;
//         console.log(pathName)
//         if (pathName === '/advisor/signupwizard/createAccount') {
//             createAccount = true;
//         }

//         if (pathName === '/advisor/signupwizard/emailVerification') {
//             createAccount = true;
//             emailVerification = true;
//         }

//         if (pathName === '/advisor/signupwizard/education') {
//             createAccount = true; 
//             emailVerification = true;
//             education = true;
//         }

//         if (pathName === '/advisor/signupwizard/workExperience') {
//             createAccount = true; 
//             emailVerification = true; 
//             education = true; 
//             workExperience = true;
//         }
//         if (pathName === '/advisor/signupwizard/background') {
//             createAccount = true; emailVerification = true; education = true;
//                 workExperience = true; background = true;
//         }
//         if (pathName === '/advisor/signupwizard/goals') {
//             createAccount = true; emailVerification = true; education = true;
//                 workExperience = true; background = true; goals = true
//         }
//         if (pathName === '/advisor/signupwizard/apply') {
//             createAccount = true; emailVerification = true; education = true;
//                 workExperience = true; background = true; goals = true; apply = true
//         }
//         return (
//             <div className="col-md-3 newMenteeWizardSidebar">
//                 <div className="row mar-width-0">
//                     <div className="col-md-12">
//                         <img src={LogoWhite} alt="" />
//                     </div>
//                 </div>
//                 <div className="row mar-width-0 stepsWrapNew">
//                     <div className="col-md-12 stepsWrapSteps">
//                         <div className="divCricle" >
//                             <span className={"step-circle " + (pathName === "/advisor/signupwizard/createAccount" ? "step-circle-active" : "") + (createAccount === true ? " step-circle-Complete" : "")} onClick={e => history.push('/advisor/signupwizard/createAccount')}>
//                             </span>
//                         </div>
//                         <h6>Step 1</h6>
//                         <p>Account Creation</p>
//                     </div>

//                     {/* <div className="col-md-12 stepsWrapSteps" >
//                         <div className="divCricle" >
//                             <span className={"step-circle " + (pathName === "/advisor/signupwizard/emailVerification" ? "step-circle-active" : "") + (emailVerification === true ? " step-circle-Complete" : "")} 
//                             onClick={e => history.push('/advisor/signupwizard/emailVerification')}>
//                             </span>
//                         </div>
//                         <h6>Step 2</h6>
//                         <p>Email Verification</p>
//                     </div> */}

//                     <div className="col-md-12 stepsWrapSteps ">
//                         <div className="divCricle" id="step_three" >
//                             <span className={"step-circle " + (pathName === "/advisor/signupwizard/education" ? "step-circle-active" : "") 
//                             + (education === true ? " step-circle-Complete" : "")} 
//                             onClick={e => education === true ? history.push('/advisor/signupwizard/education') : ""}>
//                             </span>
//                         </div>
//                         <h6>Step 2</h6>
//                         <p>Education</p>
//                     </div>

//                     <div className="col-md-12 stepsWrapSteps ">
//                         <div className="divCricle" id="step_four" >
//                             <span className={"step-circle " + (pathName === "/advisor/signupwizard/workExperience" ? "step-circle-active" : "") 
//                             + (workExperience === true ? " step-circle-Complete" : "")} 
//                             onClick={e => workExperience === true ? history.push('/advisor/signupwizard/workExperience') : ""}>
//                             </span>
//                         </div>
//                         <h6>Step 3</h6>
//                         <p>Work Experience</p>
//                     </div>

//                     <div className="col-md-12 stepsWrapSteps">
//                         <div className="divCricle" >
//                             <span className={"step-circle " + (pathName === "/advisor/signupwizard/background" ? "step-circle-active" : "") + 
//                             (background === true ? " step-circle-Complete" : "")} 
//                             onClick={e => background === true ? history.push('/advisor/signupwizard/background'):""}>
//                             </span>
//                         </div>
//                         <h6>Step 4</h6>
//                         <p>Background</p>
//                     </div>

//                     <div className="col-md-12 stepsWrapSteps">
//                         <div className="divCricle" >
//                             <span className={"step-circle " + (pathName === "/advisor/signupwizard/goals" ? "step-circle-active" : "") + 
//                             (goals === true ? " step-circle-Complete" : "")} onClick={e => goals === true ? history.push('/advisor/signupwizard/goals'): ""}>
//                             </span>
//                         </div>
//                         <h6>Step 5</h6>
//                         <p>Motivations</p>
//                     </div>

//                     <div className="col-md-12 stepsWrapSteps">
//                         <div className="divCricle no-line" >
//                             <span className={"step-circle " + (pathName === "/advisor/signupwizard/apply" ? "step-circle-active" : "") + 
//                             (apply === true ? " step-circle-Complete" : "")} onClick={e => apply === true ? history.push('/advisor/signupwizard/apply'): ""}>
//                             </span>
//                         </div>
//                         <h6>Step 6</h6>
//                         <p>Submit</p>
//                     </div>
//                 </div>
//                 <div className="row mar-width-0 stepsWrapFooter">
//                     <div className="col-md-12">
//                         <p>
//                             <img src={Msg} className="mr-1" alt="" />
//                             Questions? Email us at
//                             <a href="mailto=hello@candoor.io"> hello@candoor.io</a>
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }

// export default Sidebar;
