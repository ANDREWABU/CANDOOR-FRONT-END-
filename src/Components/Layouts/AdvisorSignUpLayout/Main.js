// import React from 'react';
// import { Link, Switch, Route } from "react-router-dom";
// import Profile from "../../../assets/images/DashboardImgs/profile.png";
// import { destroySession } from '../../../Helpers/Functions';
// // import Sidebar from "./Sidebar";
// import Sidebar from "../NewAdvisorSignUp/Sidebar";

// import history from "../../../Utils/history";
// import LogoWhite from "../../../assets/images/WizardImages/Horizontal.png";
// import Msg from "../../../assets/images/WizardImages/mail.png";
// import ShortLogo from "../../../assets/images/WizardImages/Logomark.png";
// import LinkdIn from "../../../assets/images/WizardImages/linkdin.png";
// import Search from "../../../assets/images/WizardImages/search.png";
// import CreateAccount from "../../../Pages/Advisor/signupwizard/CreateAccount";
// import EmailVerification from "../../../Pages/Advisor/signupwizard/EmailVerification";
// import EmailVerificationPending from "../../../Pages/Advisor/signupwizard/EmailVerificationPending";
// import WorkExperience from "../../../Pages/Advisor/signupwizard/WorkExperience";
// import CarearGoals from "../../../Pages/Advisor/signupwizard/CarearGoals";
// import Background from "../../../Pages/Advisor/signupwizard/Background";
// import Apply from "../../../Pages/Advisor/signupwizard/Apply";
// import Applied from "../../../Pages/Advisor/signupwizard/Applied";
// import { EmailVerifySuccess } from "../../../Pages/pageListAsync";
// import { ProtectedRoute } from "../NewAdvisorSignUp/ProtectedRoute";
// import {
//     Education,
// } from './pageListAsync'
// let createAccount = false;
// let emailVerification = false;
// let education = false;
// let workExperience = false;
// let background = false;
// let goals = false;
// let apply = false;
// class Main extends React.Component {
//     componentDidMount() {
//     }
//     checkCurrentPath(url) {
//         return history.location.pathname === '/advisor/signupwizard/' + url ? true : false
//     }
//     logout() {
//         localStorage.clear();
//         destroySession();
//     }
//     render() {
//         const pathName = history.location.pathname;
//         if (pathName === '/signupwizard/createAccount') {
//             createAccount = true;
//         }

//         if (pathName === '/signupwizard/emailVerification') {
//             createAccount = true;
//             emailVerification = true;
//         }

//         if (pathName === '/signupwizard/education') {
//             createAccount = true;
//             emailVerification = true;
//             education = true;
//         }

//         if (pathName === '/signupwizard/workExperience') {
//             createAccount = true;
//             emailVerification = true;
//             education = true;
//             workExperience = true;
//         }
//         if (pathName === '/signupwizard/background') {
//             createAccount = true; emailVerification = true; education = true;
//             workExperience = true; background = true;
//         }
//         if (pathName === '/signupwizard/goals') {
//             createAccount = true; emailVerification = true; education = true;
//             workExperience = true; background = true; goals = true
//         }
//         if (pathName === '/signupwizard/apply') {
//             createAccount = true; emailVerification = true; education = true;
//             workExperience = true; background = true; goals = true; apply = true
//         }
//         return (
//             <div className="row mar-width-0 newMenteeWizardWrap">
//                 <Sidebar />
//                 <div className="col-md-9 newMenteeWizardSection">
//                     <div className="row mar-width-0 wizardWidthWrap">
//                         <switch>
//                             <Route path="/advisor/signupwizard/createAccount" exact>
//                                 <CreateAccount />
//                             </Route>
//                             <Route path="/login" exact>
//                                 <CreateAccount />
//                             </Route>
//                             <Route path="/advisor/signupwizard/emailVerificationPending" exact>
//                                 <EmailVerificationPending />
//                             </Route>
//                             <Route path="/advisor/signupwizard/emailVerification" exact>
//                                 <EmailVerification />
//                             </Route>
//                             <ProtectedRoute path="/advisor/signupwizard/education" exact component={Education} />
//                             <ProtectedRoute path="/advisor/signupwizard/workExperience" exact component={WorkExperience} />
//                             <ProtectedRoute path="/advisor/signupwizard/background" exact component={Background} />
//                             <ProtectedRoute path="/advisor/signupwizard/goals" exact component={CarearGoals} />
//                             <ProtectedRoute path="/advisor/signupwizard/apply" exact component={Apply} />
//                             <ProtectedRoute path="/advisor/signupwizard/applied" exact component={Applied} />

//                         </switch>

//                         <div className={`row mar-width-0 justify-content-center text-center progressWrap ${this.checkCurrentPath('applied') ? 'd-none' : ''}`}>
//                             {createAccount === true ?
//                                 <Link to="/advisor/signupwizard/createAccount" className={`progress-span ${this.checkCurrentPath('createAccount') ? 'active-progress-span' : ''}`} ></Link>
//                                 :
//                                 <Link to="#" className={`progress-span ${this.checkCurrentPath('createAccount') ? 'active-progress-span' : ''}`} ></Link>
//                             }
//                             {emailVerification === true ?
//                                 <Link to="/advisor/signupwizard/emailVerificationcd" className={`progress-span ${this.checkCurrentPath('emailVerificationPending') || this.checkCurrentPath('emailVerification') ? 'active-progress-span' : ''}`} ></Link>
//                                 :
//                                 <Link to="#" className={`progress-span ${this.checkCurrentPath('emailVerificationPending') || this.checkCurrentPath('emailVerification') ? 'active-progress-span' : ''}`} ></Link>
//                             }
//                             {education === true ?
//                                 <Link to="/advisor/signupwizard/education" className={`progress-span ${this.checkCurrentPath('education') ? 'active-progress-span' : ''}`} ></Link>
//                                 :
//                                 <Link to="#" className={`progress-span ${this.checkCurrentPath('education') ? 'active-progress-span' : ''}`} ></Link>
//                             }
//                             {workExperience === true ?
//                                 <Link to="/advisor/signupwizard/workExperience" className={`progress-span ${this.checkCurrentPath('workExperience') ? 'active-progress-span' : ''}`} ></Link>
//                                 :
//                                 <Link to="#" className={`progress-span ${this.checkCurrentPath('workExperience') ? 'active-progress-span' : ''}`} ></Link>
//                             }
//                             {background === true ?
//                                 <Link to="/advisor/signupwizard/background" className={`progress-span ${this.checkCurrentPath('background') ? 'active-progress-span' : ''}`} ></Link>
//                                 :
//                                 <Link to="#" className={`progress-span ${this.checkCurrentPath('background') ? 'active-progress-span' : ''}`} ></Link>
//                             }
//                             {goals === true ?
//                                 <Link to="/advisor/signupwizard/goals" className={`progress-span ${this.checkCurrentPath('goals') ? 'active-progress-span' : ''}`} ></Link>
//                                 :
//                                 <Link to="#" className={`progress-span ${this.checkCurrentPath('goals') ? 'active-progress-span' : ''}`} ></Link>
//                             }
//                             {apply === true ?
//                                 <Link to="/advisor/signupwizard/apply" className={`progress-span ${this.checkCurrentPath('apply') ? 'active-progress-span' : ''}`} ></Link>
//                                 :
//                                 <Link to="#" className={`progress-span ${this.checkCurrentPath('goals') ? 'active-progress-span' : ''}`} ></Link>
//                             }

//                         </div>

//                     </div>

//                 </div>
//             </div>
//         );
//     }
// }

// export default Main;
