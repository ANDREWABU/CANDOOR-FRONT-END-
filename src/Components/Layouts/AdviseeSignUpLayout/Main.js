// import React from 'react';
// import {Link, Switch,Route} from "react-router-dom";
// import Profile from "../../../assets/images/DashboardImgs/profile.png";
// import { destroySession } from '../../../Helpers/Functions';
// import Sidebar from "./Sidebar";
// import history from "../../../Utils/history";
// import LogoWhite from "../../../assets/images/WizardImages/Horizontal.png";
// import Msg from "../../../assets/images/WizardImages/mail.png";
// import ShortLogo from "../../../assets/images/WizardImages/Logomark.png";
// import LinkdIn from "../../../assets/images/WizardImages/linkdin.png";
// import Search from "../../../assets/images/WizardImages/search.png";
// import CreateAccount from "../../../Pages/Advisee/signupwizard/CreateAccount";
// import EmailVerification from "../../../Pages/Advisee/signupwizard/EmailVerification";
// import EmailVerificationPending from "../../../Pages/Advisee/signupwizard/EmailVerificationPending";
// import WorkExperience from "../../../Pages/Advisee/signupwizard/WorkExperience";
// import CarearGoals from "../../../Pages/Advisee/signupwizard/CarearGoals";
// import Background from "../../../Pages/Advisee/signupwizard/Background";
// import Apply from "../../../Pages/Advisee/signupwizard/Apply";
// import AdviseeProfile from "../../../Pages/Advisee/dashboard/AdviseeProfile";
// import Applied from "../../../Pages/Advisee/signupwizard/Applied";
// import final from "../../../Pages/Advisee/signupwizard/final";
// import {EmailVerifySuccess} from "../../../Pages/pageListAsync";
// import {ProtectedRoute} from "../../../Components/Layouts/AdviseeSignUpLayout/ProtectedRoute";
// import {
//     Education,
// } from './../AdviseeSignUpLayout/pageListAsync'
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
//     checkCurrentPath(url){
//         return history.location.pathname === '/signupwizard/' + url ? true : false
//     }
//     logout(){
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
//                 workExperience = true; background = true;
//         }
//         if (pathName === '/signupwizard/goals') {
//             createAccount = true; emailVerification = true; education = true;
//                 workExperience = true; background = true; goals = true
//         }
//         if (pathName === '/signupwizard/apply') {
//             createAccount = true; emailVerification = true; education = true;
//                 workExperience = true; background = true; goals = true; apply = true
//         }
//         return (
//             <div className="row mar-width-0 newMenteeWizardWrap">
//                 <Sidebar/>
//                 <div className="col-md-9 newMenteeWizardSection">
//                     <div className="row mar-width-0 wizardWidthWrap">
//                         <switch>
//                         <Route path="/signupwizard/createAccount" exact>
//                             <CreateAccount/>
//                             </Route>
//                             <Route path="/signupwizard/profile_edit" exact>
//                             <profile_edit/>
//                         </Route>
//                             <Route path="/login" exact>
//                                 <CreateAccount/>
//                             </Route>
//                             <Route path="/signupwizard/emailVerificationPending" exact>
//                                 <EmailVerificationPending/>
//                             </Route>
//                             <Route path="/signupwizard/emailVerification" exact>
//                                 <EmailVerification/>
//                             </Route>
//                             <ProtectedRoute path="/signupwizard/education" exact component={Education} />
//                             <ProtectedRoute path="/signupwizard/workExperience" exact component={WorkExperience} />
//                             <ProtectedRoute path="/signupwizard/background" exact component={Background} />
//                             <ProtectedRoute path="/signupwizard/goals" exact component={CarearGoals} />
//                             <ProtectedRoute path="/signupwizard/apply" exact component={Apply} />
//                             <ProtectedRoute path="/signupwizard/applied" exact component={Applied} />
//                             <ProtectedRoute path="/signupwizard/final" exact component={final} />

//                         </switch>

//                         <div className={`row mar-width-0 justify-content-center text-center progressWrap ${this.checkCurrentPath('applied') ? 'd-none' : ''}`}>
//                             {createAccount === true ? 
//                                 <Link to="/signupwizard/createAccount" className={`progress-span ${this.checkCurrentPath('createAccount') ? 'active-progress-span' : ''}`} ></Link>
//                             : 
//                                 <Link to="#" className={`progress-span ${this.checkCurrentPath('createAccount') ? 'active-progress-span' : ''}`} ></Link>
//                             }
//                              {emailVerification === true ? 
//                             <Link to="/signupwizard/emailVerification" className={`progress-span ${this.checkCurrentPath('emailVerificationPending') || this.checkCurrentPath('emailVerification') ? 'active-progress-span' : ''}`} ></Link>
//                             :
//                             <Link to="#" className={`progress-span ${this.checkCurrentPath('emailVerificationPending') || this.checkCurrentPath('emailVerification') ? 'active-progress-span' : ''}`} ></Link>
//                              }
//                              {education === true ? 
//                             <Link to="/signupwizard/education" className={`progress-span ${this.checkCurrentPath('education') ? 'active-progress-span' : ''}`} ></Link>
//                             :
//                             <Link to="#" className={`progress-span ${this.checkCurrentPath('education') ? 'active-progress-span' : ''}`} ></Link>
//                              }
//                              {workExperience === true ? 
//                             <Link to="/signupwizard/workExperience" className={`progress-span ${this.checkCurrentPath('workExperience') ? 'active-progress-span' : ''}`} ></Link>
//                             :
//                             <Link to="#" className={`progress-span ${this.checkCurrentPath('workExperience') ? 'active-progress-span' : ''}`} ></Link>
//                              }
//                              {background === true ? 
//                             <Link to="/signupwizard/background" className={`progress-span ${this.checkCurrentPath('background') ? 'active-progress-span' : ''}`} ></Link>
//                             :
//                             <Link to="#" className={`progress-span ${this.checkCurrentPath('background') ? 'active-progress-span' : ''}`} ></Link>
//                              }
//                              {goals === true ? 
//                              <Link to="/signupwizard/goals" className={`progress-span ${this.checkCurrentPath('goals') ? 'active-progress-span' : ''}`} ></Link>
//                             :
//                             <Link to="#" className={`progress-span ${this.checkCurrentPath('goals') ? 'active-progress-span' : ''}`} ></Link>
//                              }
//                               {apply === true ? 
//                             <Link to="/signupwizard/apply" className={`progress-span ${this.checkCurrentPath('apply') ? 'active-progress-span' : ''}`} ></Link>
//                             :
//                             <Link to="#" className={`progress-span ${this.checkCurrentPath('goals') ? 'active-progress-span' : ''}`} ></Link>
//                               }
//                         </div>

//                     </div>

//                 </div>
//             </div>
//         );
//     }
// }

// export default Main;
