import React from 'react';
import Loadable from '../Utils/Loadable';
import Loading from '../Utils/Loading';

export const Login = Loadable(() => import('./Auth/Login'), {
  fallback: <Loading />,
});
export const Register = Loadable(() => import('./Auth/Register'), {
  fallback: <Loading />,
});

export const ForgetPassword = Loadable(() => import('./Auth/ForgetPassword'), {
  fallback: <Loading />,
});

export const VerifyToken = Loadable(() => import('./Auth/VerifyEmailToken'), {
  fallback: <Loading />,
});

export const ResetPassword = Loadable(() => import('./Auth/ResetPassword'), {
  fallback: <Loading />,
});


export const EmailVerify = Loadable(() => import('./Auth/EmailVerify'), {
  fallback: <Loading />,
});

export const AdviseeSignUpWizard = Loadable(
  () => import('./../Components/Layouts/NewAdviseeSignUp/Main'),
  { fallback: <Loading /> }
);

export const AdvisorSignupWizard = Loadable(
  () => import('./../Components/Layouts/NewAdvisorSignUp/Main'),
  { fallback: <Loading /> }
);
export const AdviseeLayout = Loadable(
  () => import('./../Components/Layouts/AdviseeLayout/Main'),
  { fallback: <Loading /> }
);

export const AdvisorLayout = Loadable(
  () => import('./../Components/Layouts/AdvisorLayout/Main'),
  { fallback: <Loading /> }
);

// export const AdvisorProfile = Loadable(
//   () => import('./Advisor/dashboard/Advisorprofile'),
//   { fallback: <Loading /> }
// );

// Advisee Onboarding 👇
export const CompleteProfile = Loadable(
  () => import('./Advisee/onboarding/CompleteProfile'),
  { fallback: <Loading /> }
);

export const OrientationFlowStep = Loadable(
  () => import('./Advisee/onboarding/OrientationFlowStep'),
  { fallback: <Loading /> }
);

// Advisor Onboarding 👇
export const CompleteProfileAdvisor = Loadable(
  () => import('./Advisor/onboarding/CompleteProfileAdvisor'),
  { fallback: <Loading /> }
);

// export const OrientationFlowStepAdvisor = Loadable(
//   () => import('./Advisor/onboarding/OrientationFlowStepAdvisor'),
//   { fallback: <Loading /> }
// );

export const OrientationMeetingPreference = Loadable(
  () => import('./Advisor/onboarding/OrientationMeetingPreference'),
  { fallback: <Loading /> }
);

// Adivee-directory -
export const AdvisorDirectory = Loadable(
  () => import('./Advisee/advisor-directory/AdvisorDirectory'),
  { fallback: <Loading /> }
);


// // Show Advisor Profile By ID
export const ShowAdviseeProfile = Loadable(
  () => import('./Advisor/confirm-meeting/ShowAdviseeProfile'),
  {
    fallback: <Loading />,
  }
);


// // Show Advisor Profile By ID
export const ShowAdvisorProfile = Loadable(
  () => import('./Advisee/advisor-directory/ShowAdvisorProfile'),
  {
    fallback: <Loading />,
  }
);

// // Request Meeting
export const RequestMeeting = Loadable(
  () => import('./Advisee/advisor-directory/RequestMeeting'),
  {
    fallback: <Loading />,
  }
);

// // Request Meeting Successfully Scheduled
export const MeetingSuccess = Loadable(
  () => import('./Advisee/advisor-directory/MeetingSuccess'),
  {
    fallback: <Loading />,
  }
);
// ADVISEE
export const RequestAdviseeConfirmed = Loadable(
  () => import('./Advisee/confirm-meeting/RequestConfirmed'),
  {
    fallback: <Loading />,
  }
);
export const RequestAdviseeUnConfirmed = Loadable(
  () => import('./Advisee/confirm-meeting/RequestUnConfirmed'),
  {
    fallback: <Loading />,
  }
);
export const RequestAdviseetViewed = Loadable(
  () => import('./Advisee/confirm-meeting/RequestViewed'),
  {
    fallback: <Loading />,
  }
);
export const MeetingCompletedAdvisee = Loadable(
  () => import('./Advisee/confirm-meeting/MeetingCompleted'),
  {
    fallback: <Loading />,
  }
);
//Advisor
export const RequestConfirmed = Loadable(
  () => import('./Advisor/confirm-meeting/RequestConfirmed'),
  {
    fallback: <Loading />,
  }
);
export const RequestUnConfirmed = Loadable(
  () => import('./Advisor/confirm-meeting/RequestUnConfirmed'),
  {
    fallback: <Loading />,
  }
);
export const RequestViewed = Loadable(
  () => import('./Advisor/confirm-meeting/RequestViewed'),
  {
    fallback: <Loading />,
  }
);
export const MeetingCompleted = Loadable(
  () => import('./Advisor/confirm-meeting/MeetingCompleted'),
  {
    fallback: <Loading />,
  }
);
export const PastMeetingAdvisee = Loadable(
  () => import('./Advisee/past-meeting'),
  {
    fallback: <Loading />,
  }
);
export const FinalizeMeetingAdvisee = Loadable(
  () => import('./Advisee/finalize-meeting'),
  {
    fallback: <Loading />,
  }
);
export const PastMeetingAdvisor = Loadable(
  () => import('./Advisor/past-meeting'),
  {
    fallback: <Loading />,
  }
);
export const FinalizeMeetingAdvisor = Loadable(
  () => import('./Advisor/finalize-meeting'),
  {
    fallback: <Loading />,
  }
);

export const AdviseeEligibilityConfirmation = Loadable(
  () => import('./Advisee/signup-flow/ConfirmEligibility'),
  {
    fallback: <Loading />,
  }
);


//advisorFeedback
export const AdvisorFeedback = Loadable(
  () => import('./Advisor/dashboard/AdvisorFeedback.js'),
  {
    fallback: <Loading />,
  }
);
//advisee Feedback
export const AdviseeFeedback = Loadable(
  () => import('./Advisee/dashboard/AdviseeFeedback.js'),
  {
    fallback: <Loading />,
  }
);