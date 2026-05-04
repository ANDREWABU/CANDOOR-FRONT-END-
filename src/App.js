// import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
// // import { createBrowserHistory } from 'history'
// import history from "./Utils/history";
// import { QueryClientProvider, QueryClient } from "react-query";
// import Dashboard from "./Components/Layouts/Dashboard";
// import Axios from "./Config/Axios";
// import ScrollToTop from "./Utils/ScrollToTop";
// import { ProtectedRoute } from "./Services/ProtectedRoute";
// import store from "./app/store";
// import { addUser } from "./app/Actions";


// import { getSession, destroySession } from "./Helpers/Functions";

// import {
//   Login,
//   Register,
//   ForgetPassword,
//   VerifyToken,
//   ResetPassword,
//   EmailVerify,
//   AdviseeSignUpWizard,
//   AdvisorSignupWizard,
//   AdviseeLayout,
//   AdvisorLayout,
//   AdvisorDirectory,
//   CompleteProfile,
//   OrientationFlowStep,
//   CompleteProfileAdvisor,
//   OrientationMeetingPreference,
//   ShowAdvisorProfile,
//   ShowAdviseeProfile,
//   RequestMeeting,
//   MeetingSuccess,
//   RequestAdviseeConfirmed,
//   RequestAdviseeUnConfirmed,
//   RequestAdviseetViewed,
//   RequestConfirmed,
//   RequestUnConfirmed,
//   RequestViewed,
//   AdvisorFeedback,
//   AdviseeFeedback,
//   MeetingCompletedAdvisee,
//   PastMeetingAdvisee,
//   FinalizeMeetingAdvisee,
//   PastMeetingAdvisor,
//   FinalizeMeetingAdvisor,
//   MeetingCompleted,
//   AdviseeEligibilityConfirmation
// } from "./Pages/pageListAsync";

// import OrientationFlowStepAdvisor from "./Pages/Advisor/onboarding/OrientationFlowStepAdvisor";
// import AdvisorProfiledata from "./Pages/Advisor/dashboard/AdvisorProfileData";
// import AdvisorProfileedit from "./Pages/Advisor/dashboard/AdvisorProfileedit";
// import AdviseeProfileedit from "./Pages/Advisee/dashboard/AdviseeProfileedit";

// import AdviseeSetting from "./Pages/Advisee/dashboard/setting";
// import AdvisorSetting from "./Pages/Advisor/dashboard/setting";
// import termOfUse from "./Pages/legal/termOfUse";
// import privacyPolicy from "./Pages/legal/privacyPolicy";
// import codeOfConduct from "./Pages/legal/codeOfConduct";
// import PendingApplicationApproval from "./Pages/Advisee/signupwizard/PendingApplicationApproval";
// import Deactivated from "./Pages/Advisee/signupwizard/Deactivated";

// // var customHistory = createBrowserHistory();

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 5 * 60 * 1000,
//     },
//   },
// });

// function App() {

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAuth = async () => {
//       // Add user to redux if already in session storage
//       const userDetails = getSession();
//       if (userDetails && userDetails.__userDetail) {
//         store.dispatch(addUser(userDetails.__userDetail));
//       }

//       try {
//         const response = await Axios.get(`/api/userAuth`);
//         if (response.status === 200) {
//           // Authenticated successfully
//         }
//       } catch (error) {
//         if (error.response && error.response.status === 401) {
//           console.log("response is 401");
//           // Optional: redirect if not already on login
//           if (history.location.pathname !== "/login") {
//             history.push("/login");
//           }
//         }
//         destroySession();
//       } finally {
//         console.log("In the finally block");
//         setLoading(false);
//       }
//     };

//     fetchAuth();
//   }, []);


//   return (
//     <React.Fragment>
//       <QueryClientProvider client={queryClient}>
//         <Dashboard>
//           <Router history={history}>
//             <ScrollToTop>
//               <Switch>

//                 <ProtectedRoute exact path="/" component={AdviseeLayout} />
//                 <Route exact path="/Advisee/Dashboard" component={AdviseeLayout} />
//                 <Route exact path="/Advisor/Dashboard" component={AdvisorLayout} />
//                 <Route exact path="/advisee/setting" component={AdviseeSetting} />
//                 <Route exact path="/advisee/confirm-eligibility" component={AdviseeEligibilityConfirmation} />
//                 <Route exact path="/advisor/setting" component={AdvisorSetting} />
//                 <Route exact path="/advisee/adviseeProfile" component={AdviseeProfileedit} />
//                 <Route exact path="/Advisor/AdvisorProfiledata" component={AdvisorProfiledata} />
//                 <Route exact path="/advisor/advisorProfileedit" component={AdvisorProfileedit} />
//                 <Route exact path="/login" component={Login} />
//                 <Route exact path="/termOfUse" component={termOfUse} />
//                 <Route exact path="/codeOfConduct" component={codeOfConduct} />
//                 <Route exact path="/pendingApproval" component={PendingApplicationApproval} />
//                 <Route exact path="/deactivated" component={Deactivated} />
//                 <Route exact path="/privacyPolicy" component={privacyPolicy} />
//                 <Route exact path="/advisee/signupwizard/:pageId" component={AdviseeSignUpWizard} />
//                 <Route exact path="/advisor/signupwizard/:pageId" component={AdvisorSignupWizard} />
//                 <Route exact path="/signup" component={Register} />
//                 <Route exact path="/ForgetPassword" component={ForgetPassword} />
//                 <Route exact path="/VerifyToken" component={VerifyToken} />
//                 <Route exact path="/ResetPassword" component={ResetPassword} />
//                 <Route exact path="/EmailVerify" component={EmailVerify} />

//                 <ProtectedRoute exact path="/advisee/orientation-flow-step" component={OrientationFlowStep} />
//                 <ProtectedRoute exact path="/advisee/advisor-directory" component={AdvisorDirectory} />
//                 <ProtectedRoute exact path="/advisee/meeting-success/" component={MeetingSuccess} />
//                 <ProtectedRoute exact path="/advisee/complete-profile" component={CompleteProfile} />
//                 <ProtectedRoute exact path="/advisor/complete-profile" component={CompleteProfileAdvisor} />
//                 <ProtectedRoute exact path="/advisor/meeting-preference" component={OrientationMeetingPreference} />
//                 <ProtectedRoute exact path="/advisor/orientation-flow-step" component={OrientationFlowStepAdvisor} />
//                 <ProtectedRoute exact path="/advisor/:id" component={ShowAdvisorProfile} />
//                 <ProtectedRoute exact path="/advisee/:id" component={ShowAdviseeProfile} />
//                 <ProtectedRoute exact path="/advisee/request-meeting/:id" component={RequestMeeting} />
//                 <ProtectedRoute exact path="/advisee/confirm-meeting/request-confirmed/:meetingId" component={RequestAdviseeConfirmed} />
//                 <ProtectedRoute exact path="/advisee/confirm-meeting/request-unconfirmed/:meetingId" component={RequestAdviseeUnConfirmed} />
//                 <ProtectedRoute exact path="/advisee/confirm-meeting/request-viewed/:meetingId" component={RequestAdviseetViewed} />
//                 <ProtectedRoute exact path="/advisee/confirm-meeting/meeting-completed/:meetingId" component={MeetingCompletedAdvisee} />
//                 <ProtectedRoute exact path="/advisee/past-meeting/:meetingId" component={PastMeetingAdvisee} />
//                 <ProtectedRoute exact path="/advisee/finalize-meeting/:meetingId" component={FinalizeMeetingAdvisee} />
//                 <ProtectedRoute exact path="/advisor/past-meeting/:meetingId" component={PastMeetingAdvisor} />
//                 <ProtectedRoute exact path="/advisor/finalize-meeting/:meetingId" component={FinalizeMeetingAdvisor} />
//                 <ProtectedRoute exact path="/advisor/confirm-meeting/request-confirmed/:meetingId" component={RequestConfirmed} />
//                 <ProtectedRoute exact path="/advisor/confirm-meeting/request-unconfirmed/:meetingId" component={RequestUnConfirmed} />
//                 <ProtectedRoute exact path="/advisor/confirm-meeting/request-viewed/:meetingId" component={RequestViewed} />
//                 <ProtectedRoute exact path="/advisor/confirm-meeting/meeting-completed/:meetingId" component={MeetingCompleted} />
//                 <ProtectedRoute exact path="/advisor/advisor-feedback" component={AdvisorFeedback} />
//                 <ProtectedRoute exact path="/advisee/advisee-feedback" component={AdviseeFeedback} />

//                 {/* <Route exact path="/" component={Login} />
//                 <ProtectedRoute exact path="/" component={AdviseeLayout} />
//                 <Route exact path="/Advisee/Dashboard" component={AdviseeLayout} />
//                 <Route exact path="/Advisor/Dashboard" component={AdvisorLayout} />

//                 <Route exact path="/login" component={Login} />
//                 <Route exact path="/advisee/confirm-eligibility" component={AdviseeEligibilityConfirmation} />
//                 <Route exact path="/advisee/signupwizard/:pageId" component={AdviseeSignUpWizard} />
//                 <Route exact path="/advisor/signupwizard/:pageId" component={AdvisorSignupWizard} />
//                 <Redirect to="/login" /> */}
//               </Switch>
//             </ScrollToTop>
//           </Router>
//         </Dashboard>
//       </QueryClientProvider>
//     </React.Fragment>
//   );
// }



import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

import "./assets/css/app1.css";
import "react-toastify/dist/ReactToastify.css";

import { Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Components/Layouts/Dashboard";
import ScrollToTop from "./Utils/ScrollToTop";
import history from "./Utils/history";
import { getSession } from "./Helpers/Functions";
import { ProtectedRoute } from "./Services/ProtectedRoute";
import store from "./app/store";
import { addUser, addCountries, addProfileImage } from "./app/Actions";
import ApiRequest from "./Services/ApiRequest";
import Axios from "./Config/Axios";
import { destroySession } from "./Helpers/Functions";
import { countries } from "./Helpers/Functions";
import Redirect from "./Utils/history";

import OrientationFlowStepAdvisor from "./Pages/Advisor/onboarding/OrientationFlowStepAdvisor";
import AdvisorProfiledata from "./Pages/Advisor/dashboard/AdvisorProfileData";
import AdvisorProfileedit from "./Pages/Advisor/dashboard/AdvisorProfileedit";
import AdviseeProfileedit from "./Pages/Advisee/dashboard/AdviseeProfileedit";

import AdviseeSetting from "./Pages/Advisee/dashboard/setting";
import AdvisorSetting from "./Pages/Advisor/dashboard/setting";
import termOfUse from "./Pages/legal/termOfUse";
import privacyPolicy from "./Pages/legal/privacyPolicy";
import codeOfConduct from "./Pages/legal/codeOfConduct";
import PendingApplicationApproval from "./Pages/Advisee/signupwizard/PendingApplicationApproval";
import Deactivated from "./Pages/Advisee/signupwizard/Deactivated";

import {
  Login,
  Register,
  ForgetPassword,
  VerifyToken,
  ResetPassword,
  EmailVerify,
  AdviseeSignUpWizard,
  AdvisorSignupWizard,
  AdviseeLayout,
  AdvisorLayout,
  AdvisorDirectory,
  CompleteProfile,
  OrientationFlowStep,
  CompleteProfileAdvisor,
  OrientationMeetingPreference,
  ShowAdvisorProfile,
  ShowAdviseeProfile,
  RequestMeeting,
  MeetingSuccess,
  RequestAdviseeConfirmed,
  RequestAdviseeUnConfirmed,
  RequestAdviseetViewed,
  RequestConfirmed,
  RequestUnConfirmed,
  RequestViewed,
  AdvisorFeedback,
  AdviseeFeedback,
  MeetingCompletedAdvisee,
  PastMeetingAdvisee,
  FinalizeMeetingAdvisee,
  PastMeetingAdvisor,
  FinalizeMeetingAdvisor,
  MeetingCompleted,
  AdviseeEligibilityConfirmation
} from "./Pages/pageListAsync";

import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
    },
  },
});

class App extends Component {
  componentDidMount() {
    Axios.get(`/api/userAuth`)
      .then((response) => {
        if (response.status === 200) {
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
           // if (!history.location.pathname.includes('/signupwizard/emailVerification')) {
          //   return Redirect.push("/login");
          // }
        }

        destroySession();
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  reduxUpdate() {
    const userDetails = getSession();
    store.dispatch(addUser(userDetails.__userDetail));
  }

  render() {
    this.reduxUpdate();
    return (
      <React.Fragment>
        <QueryClientProvider client={queryClient}>
          <Dashboard>
            <Router history={history}>
              <ScrollToTop>
                <Switch>
                  <ProtectedRoute exact path="/" component={AdviseeLayout} />
                  <Route
                    exact
                    path="/Advisee/Dashboard"
                    component={AdviseeLayout}
                  />
                  <Route
                    exact
                    path="/Advisor/Dashboard"
                    component={AdvisorLayout}
                  />
                  <Route
                    exact
                    path="/advisee/setting"
                    component={AdviseeSetting}
                  />
                  <Route
                    exact
                    path="/advisee/confirm-eligibility"
                    component={AdviseeEligibilityConfirmation}
                  />
                  <Route
                    exact
                    path="/advisor/setting"
                    component={AdvisorSetting}
                  />
                  <Route
                    exact
                    path="/advisee/adviseeProfile"
                    component={AdviseeProfileedit}
                  />
                  <Route
                    exact
                    path="/Advisor/AdvisorProfiledata"
                    component={AdvisorProfiledata}
                  />
                  <Route
                    exact
                    path="/advisor/advisorProfileedit"
                    component={AdvisorProfileedit}
                  />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/termOfUse" component={termOfUse} />
                  <Route
                    exact
                    path="/codeOfConduct"
                    component={codeOfConduct}
                  />
                  <Route
                    exact
                    path="/pendingApproval"
                    component={PendingApplicationApproval}
                  />
                  <Route
                    exact
                    path="/deactivated"
                    component={Deactivated}
                  />
                  <Route
                    exact
                    path="/privacyPolicy"
                    component={privacyPolicy}
                  />
                  <Route
                    exact
                    path="/advisee/signupwizard/:pageId"
                    component={AdviseeSignUpWizard}
                  />
                  <Route
                    exact
                    path="/advisor/signupwizard/:pageId"
                    component={AdvisorSignupWizard}
                  />
                  <Route exact path="/signup" component={Register} />
                  <Route
                    exact
                    path="/ForgetPassword"
                    component={ForgetPassword}
                  />
                  <Route exact path="/VerifyToken" component={VerifyToken} />
                  <Route
                    exact
                    path="/ResetPassword"
                    component={ResetPassword}
                  />
                  <Route exact path="/EmailVerify" component={EmailVerify} />
                  <ProtectedRoute
                    exact
                    path="/advisee/orientation-flow-step"
                    component={OrientationFlowStep}
                  />

                  <ProtectedRoute
                    exact
                    path="/advisee/advisor-directory"
                    component={AdvisorDirectory}
                  />

                  <ProtectedRoute
                    exact
                    path="/advisee/meeting-success/"
                    component={MeetingSuccess}
                  />

                  <ProtectedRoute
                    exact
                    path="/advisee/complete-profile"
                    component={CompleteProfile}
                  />

                  <ProtectedRoute
                    exact
                    path="/advisor/complete-profile"
                    component={CompleteProfileAdvisor}
                  />

                  <ProtectedRoute
                    exact
                    path="/advisor/meeting-preference"
                    component={OrientationMeetingPreference}
                  />

                  <ProtectedRoute
                    exact
                    path="/advisor/orientation-flow-step"
                    component={OrientationFlowStepAdvisor}
                  />

                  <ProtectedRoute
                    exact
                    path="/advisor/:id"
                    component={ShowAdvisorProfile}
                  />

                  <ProtectedRoute
                    exact
                    path="/advisee/:id"
                    component={ShowAdviseeProfile}
                  />

                  <ProtectedRoute
                    exact
                    path="/advisee/request-meeting/:id"
                    component={RequestMeeting}
                  />

                  <ProtectedRoute
                    exact
                    path="/advisee/confirm-meeting/request-confirmed/:meetingId"
                    component={RequestAdviseeConfirmed}
                  />

                  <ProtectedRoute
                    exact
                    path="/advisee/confirm-meeting/request-unconfirmed/:meetingId"
                    component={RequestAdviseeUnConfirmed}
                  />

                  <ProtectedRoute
                    exact
                    path="/advisee/confirm-meeting/request-viewed/:meetingId"
                    component={RequestAdviseetViewed}
                  />

                  <ProtectedRoute
                    exact
                    path="/advisee/confirm-meeting/meeting-completed/:meetingId"
                    component={MeetingCompletedAdvisee}
                  />

                  <ProtectedRoute
                    exact
                    path="/advisee/past-meeting/:meetingId"
                    component={PastMeetingAdvisee}
                  />
                  <ProtectedRoute
                    exact
                    path="/advisee/finalize-meeting/:meetingId"
                    component={FinalizeMeetingAdvisee}
                  />
                  <ProtectedRoute
                    exact
                    path="/advisor/past-meeting/:meetingId"
                    component={PastMeetingAdvisor}
                  />
                  <ProtectedRoute
                    exact
                    path="/advisor/finalize-meeting/:meetingId"
                    component={FinalizeMeetingAdvisor}
                  />

                  <ProtectedRoute
                    exact
                    path="/advisor/confirm-meeting/request-confirmed/:meetingId"
                    component={RequestConfirmed}
                  />

                  <ProtectedRoute
                    exact
                    path="/advisor/confirm-meeting/request-unconfirmed/:meetingId"
                    component={RequestUnConfirmed}
                  />
                  <ProtectedRoute
                    exact
                    path="/advisor/confirm-meeting/request-viewed/:meetingId"
                    component={RequestViewed}
                  />
                  <ProtectedRoute
                    exact
                    path="/advisor/confirm-meeting/meeting-completed/:meetingId"
                    component={MeetingCompleted}
                  />

                  <ProtectedRoute
                    exact
                    path="/advisor/advisor-feedback"
                    component={AdvisorFeedback}
                  />

                  <ProtectedRoute
                    exact
                    path="/advisee/advisee-feedback"
                    component={AdviseeFeedback}
                  />
                  {/* <Redirect to="/login" component={Login}/> */}
                </Switch>
              </ScrollToTop>
            </Router>
          </Dashboard>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </React.Fragment>
    );
  }
}

export default App;
